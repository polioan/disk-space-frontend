import { Button } from '../../ui'
import { openFileDialog } from '../../helpers'
import { useUploadFilesMutation } from '../../hooks'

export const UploadFilesButton: React.FC = () => {
  const { mutate, isLoading } = useUploadFilesMutation()

  async function handleOnUploadClick() {
    const files = await openFileDialog()
    if (files) {
      mutate(files)
    }
  }

  return (
    <Button onClick={handleOnUploadClick} isLoading={isLoading}>
      Загрузить
    </Button>
  )
}
