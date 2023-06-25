import { useQuery } from '@tanstack/react-query'
import { axios, isAxiosError } from '../common/axios'
import { uniqueToast } from '../common/toast'
import { useFilesStore } from '../stores'

export function useFilesQuery() {
  const path = useFilesStore(store => store.path)

  const result = useQuery(
    ['/dir', ...path],
    async () => {
      const { data } = await axios.get<App.FilesInfo>('/dir')
      return data
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
      keepPreviousData: true,
      onError: e => {
        if (isAxiosError(e)) {
          uniqueToast(e.response.data.message, e.response.data.message)
        }
      },
    }
  )

  return {
    ...result,
    files: result?.data?.files ?? [],
    count: result?.data?.count ?? 0,
    isFetchingOrLoading: result.isFetching || result.isLoading,
  }
}
