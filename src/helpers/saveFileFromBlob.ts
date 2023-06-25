export function saveFileFromBlob(data: Blob, fileName: string) {
  const href = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = href
  link.download = fileName
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(href)
}
