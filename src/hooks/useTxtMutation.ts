import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios, isAxiosError } from '../common/axios'
import { uniqueToast } from '../common/toast'

export function useTxtMutation() {
  const queryClient = useQueryClient()

  const result = useMutation({
    mutationFn: async (input: { fileName: string; content: string }) => {
      const { data } = await axios.post<App.TxtResponce>('/txt', input)
      return data
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
