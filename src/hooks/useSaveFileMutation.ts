import { useMutation } from '@tanstack/react-query'
import { axios, isAxiosError } from '../common/axios'
import { uniqueToast } from '../common/toast'
import { saveFileFromBlob } from '../helpers'

export function useSaveFileMutation() {
  const result = useMutation({
    mutationFn: async (fileName: string) => {
      const { data } = await axios.get<App.GetFileResponce>('/getfile', {
        responseType: 'blob',
        params: { fileName },
      })
      saveFileFromBlob(data, fileName)
      return data
    },
    onError: e => {
      if (isAxiosError(e)) {
        uniqueToast(e.response.data.message, e.response.data.message)
      }
    },
    retry: 2,
  })

  return result
}
