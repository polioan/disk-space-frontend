interface OpenFileDialogOptions {
  multiple?: boolean | undefined
}

export function openFileDialog({
  multiple = true,
}: OpenFileDialogOptions = {}) {
  return new Promise<File[] | null>(resolve => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = multiple

    input.addEventListener(
      'change',
      e => {
        const files = Array.from((e.target as HTMLInputElement)?.files ?? [])
        if (!files.length) {
          resolve(null)
        }
        resolve(files)
      },
      { once: true }
    )

    input.click()
  })
}
