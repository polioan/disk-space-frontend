import axios, {
  isAxiosError as isAxiosErrorInternal,
  type AxiosError,
  type AxiosResponse,
} from 'axios'
import { useFilesStore } from '../stores'
export * from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    'token'
  )}`

  const { path } = useFilesStore.getState()
  const userPath = path.slice(1)

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
    config.data.append('userPath', JSON.stringify(userPath))
    return config
  }

  if (config.method === 'post') {
    config.data = { ...config.data, userPath }
  } else if (
    (['get', 'delete'] as (string | undefined)[]).includes(config.method)
  ) {
    config.params = { ...config.params, userPath }
  }

  return config
})

instance.interceptors.response.use(
  config => config,
  e => {
    if (
      isAxiosErrorInternal(e) &&
      e.response?.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      window.localStorage.removeItem('token')
      window.location.pathname = '/login'
    }
    return Promise.reject(e)
  }
)

interface CustomAxiosError extends AxiosError<App.ServerErrorData, unknown> {
  response: AxiosResponse<App.ServerErrorData, unknown>
}

export function isAxiosError(payload: any): payload is CustomAxiosError {
  return (
    isAxiosErrorInternal(payload) &&
    payload?.response?.data?.message != undefined
  )
}

export { instance as axios }
