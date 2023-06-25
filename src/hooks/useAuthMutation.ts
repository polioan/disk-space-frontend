import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { axios, isAxiosError } from '../common/axios'
import { uniqueToast, toast } from '../common/toast'

export function useAuthMutation({
  isRegistration,
}: {
  isRegistration?: boolean | undefined
}) {
  const navigate = useNavigate()

  const result = useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      const url = isRegistration ? '/registration' : '/login'
      const { data } = await axios.post<App.AuthResponce>(url, input)
      return data
    },
    onSuccess: ({ token }) => {
      window.localStorage.setItem('token', token)
      toast.dismiss()
      navigate('/')
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
