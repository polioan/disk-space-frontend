import cl from './FilesContainer.module.scss'
import { FileItem } from '../../components'
import { useFilesQuery } from '../../hooks'
import { Spinner } from '../../ui'

export const FilesContainer: React.FC = () => {
  const { files, isFetchingOrLoading } = useFilesQuery()

  if (isFetchingOrLoading) {
    return <Spinner className={cl.spinner} withBox />
  }

  return (
    <div className={cl.files_container}>
      {files.map((file, idx) => (
        <FileItem key={`${file.name}${idx}`} file={file} idx={idx} />
      ))}
    </div>
  )
}
