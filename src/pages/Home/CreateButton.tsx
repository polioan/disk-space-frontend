import cl from './CreateButton.module.scss'
import { useRef, useState } from 'react'
import { useNewDirMutation, useTxtMutation } from '../../hooks'
import { uniqueToast } from '../../common/toast'
import { Dialog, Popup } from '../../components'
import { Button, Input, TextArea } from '../../ui'

export const CreateButton: React.FC = () => {
  const [createDirDialogIsOpen, setCreateDirDialogIsOpen] = useState(false)
  const [txtDialogIsOpen, setTxtDialogIsOpen] = useState(false)

  const newDirInputRef = useRef<HTMLInputElement>(null)
  const txtInputRef = useRef<HTMLInputElement>(null)
  const txtTextAreaRef = useRef<HTMLTextAreaElement>(null)

  const newDirMutation = useNewDirMutation()
  const txtMutation = useTxtMutation()

  async function createDirOnSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newDirInputRef.current?.value) {
      await newDirMutation.mutateAsync(newDirInputRef.current?.value)
    }
    setCreateDirDialogIsOpen(false)
  }

  async function txtOnSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (txtInputRef.current?.value && txtTextAreaRef.current?.value) {
      await txtMutation.mutateAsync({
        fileName: txtInputRef.current?.value,
        content: txtTextAreaRef.current?.value,
      })
    }
    setTxtDialogIsOpen(false)
  }

  function handleDirNameInvalid(e: React.InvalidEvent<HTMLInputElement>) {
    e.preventDefault()
    uniqueToast('new-dir-invalid', 'Введите название!')
  }

  function handleTxtNameInvalid(e: React.InvalidEvent<HTMLInputElement>) {
    e.preventDefault()
    uniqueToast('txt-name-invalid', 'Введите название!')
  }

  function handleTxtContentInvalid(e: React.InvalidEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    uniqueToast('txt-content-invalid', 'Введите контент!')
  }

  return (
    <>
      <Popup
        className={cl.popup}
        triggerElement={<Button>Создать</Button>}
        items={[
          {
            render: ({ active }) => (
              <Button
                focused={active}
                onClick={() => setCreateDirDialogIsOpen(true)}
              >
                Новая папка
              </Button>
            ),
            key: '1',
          },
          {
            render: ({ active }) => (
              <Button focused={active} onClick={() => setTxtDialogIsOpen(true)}>
                Новый текстовый документ
              </Button>
            ),
            key: '2',
          },
        ]}
      />
      <Dialog
        open={createDirDialogIsOpen}
        onClose={() => setCreateDirDialogIsOpen(false)}
        title='Введите название папки'
      >
        <form
          method='POST'
          className={cl.dialog_form}
          onSubmit={createDirOnSubmit}
        >
          <Input
            ref={newDirInputRef}
            required
            type='text'
            autoComplete={null}
            placeholder='Название папки'
            onInvalid={handleDirNameInvalid}
          />
          <Button type='submit' isLoading={newDirMutation.isLoading}>
            Сохранить
          </Button>
        </form>
      </Dialog>
      <Dialog
        open={txtDialogIsOpen}
        onClose={() => setTxtDialogIsOpen(false)}
        title='Новый текстовый документ'
      >
        <form method='POST' className={cl.dialog_form} onSubmit={txtOnSubmit}>
          <Input
            ref={txtInputRef}
            required
            type='text'
            autoComplete={null}
            placeholder='Название файла'
            onInvalid={handleTxtNameInvalid}
          />
          <TextArea
            required
            placeholder='Контент'
            ref={txtTextAreaRef}
            onInvalid={handleTxtContentInvalid}
          />
          <Button type='submit' isLoading={txtMutation.isLoading}>
            Сохранить
          </Button>
        </form>
      </Dialog>
    </>
  )
}
