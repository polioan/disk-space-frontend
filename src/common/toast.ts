import { toast, type Id } from 'react-toastify'
export * from 'react-toastify'

const uniqueToasts = new Map<string, Id>()

export function uniqueToast(key: string, content: string) {
  const toastId = uniqueToasts.get(key)
  if (typeof toastId !== 'undefined') {
    toast.dismiss(toastId)
  }
  uniqueToasts.set(key, toast(content))
}

export function dismissAndClear() {
  uniqueToasts.clear()
  toast.dismiss()
}
