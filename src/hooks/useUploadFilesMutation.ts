import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios, isAxiosError } from '../common/axios'
import { uniqueToast } from '../common/toast'

export function useUploadFilesMutation() {
  const queryClient = useQueryClient()

  const result = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      await axios.post<App.LoadResponce>('/load', formData)
    },
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['/me'] }),
        queryClient.invalidateQueries({ queryKey: ['/dir'] }),
      ])
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
