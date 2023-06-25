import {
  QueryClient,
  QueryClientProvider as InternalQueryClientProvider,
} from '@tanstack/react-query'

export const queryClient = new QueryClient({})

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <InternalQueryClientProvider client={queryClient}>
      {children}
    </InternalQueryClientProvider>
  )
}

export * from '@tanstack/react-query'
