const decimals = 2
const dm = decimals < 0 ? 0 : decimals
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export function formatBytes(bytes: number | string) {
  bytes = +bytes
  if (!bytes) return '0 Bytes'

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
