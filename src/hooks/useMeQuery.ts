import { useQuery } from '@tanstack/react-query'
import { axios } from '../common/axios'

export function useMeQuery() {
  const result = useQuery(
    ['/me'],
    async () => {
      const { data } = await axios.get<App.MeResponce>('/me')
      return data
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  return {
    ...result,
    email: result?.data?.email ?? '',
    usedSpace: result?.data?.usedSpace ?? 0,
    storageSize: result?.data?.storageSize ?? 0,
  }
}
