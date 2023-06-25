import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios, isAxiosError } from '../common/axios'
import { uniqueToast } from '../common/toast'

export function useNewDirMutation() {
  const queryClient = useQueryClient()

  const result = useMutation({
    mutationFn: async (newPath: string) => {
      await axios.post<App.NewDirResponce>('/newdir', { newPath })
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['/dir'] })
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
