import cl from './FileItem.module.scss'
import { motion as m } from 'framer-motion'
import { FolderIcon, PlainFileIcon } from '../../icons'
import { useFilesStore } from '../../stores'
import { ContextMenu } from '../ContextMenu'
import { Button, Spinner } from '../../ui'
import { useDeleteFileMutation, useSaveFileMutation } from '../../hooks'
import { useHotkeys, type Options } from 'react-hotkeys-hook'

interface FileItemProps {
  file: App.FileInfo
  idx: number
}

function chooseIcon(file: App.FileInfo) {
  if (!file.isFile) {
    return <FolderIcon />
  }
  return <PlainFileIcon />
}

export const FileItem: React.FC<FileItemProps> = ({ file, idx }) => {
  const icon = chooseIcon(file)

  const joinWithPath = useFilesStore(store => store.joinWithPath)

  const saveFileMutation = useSaveFileMutation()

  const deleteFileMutation = useDeleteFileMutation()

  const hotKeyOptions: Options = {
    preventDefault: true,
    ignoreEventWhen: e => {
      if (saveFileMutation.isLoading || deleteFileMutation.isLoading) {
        return true
      }
      if (!file.isFile && e.key === 's') {
        e.preventDefault()
        return true
      }
      if (document.activeElement === null) {
        return true
      }
      if (!('title' in document.activeElement)) {
        return true
      }
      if (document.activeElement.title !== file.name) {
        return true
      }
      return false
    },
  }

  useHotkeys('ctrl+s', () => saveFileMutation.mutate(file.name), hotKeyOptions)

  useHotkeys(
    'delete',
    () => deleteFileMutation.mutate(file.name),
    hotKeyOptions
  )

  function handleOnClick() {
    if (!file.isFile) {
      joinWithPath(file.name)
    }
  }

  return (
    <ContextMenu
      busy={saveFileMutation.isLoading}
      triggerElement={
        <m.button
          className={cl.item_container}
          aria-label={(file.isFile ? 'Файл - ' : 'Папка - ') + file.name}
          title={file.name}
          initial={{ transform: 'scale(0.2)' }}
          animate={{ transform: 'scale(1)' }}
          transition={{ duration: 0.1 + 0.01 * idx }}
          onClick={handleOnClick}
        >
          <div className={cl.item}>
            {saveFileMutation.isLoading ? <Spinner withBox /> : icon}
            <div className={cl.text} translate='no'>
              {file.name}
            </div>
          </div>
        </m.button>
      }
      items={[
        {
          element: (
            <Button onClick={() => deleteFileMutation.mutate(file.name)}>
              Удалить
            </Button>
          ),
          key: '1',
        },
        {
          element: (
            <Button onClick={() => saveFileMutation.mutate(file.name)}>
              Сохранить
            </Button>
          ),
          key: '2',
          hidden: !file.isFile,
        },
      ]}
    />
  )
}
