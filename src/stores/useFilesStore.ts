import { create } from 'zustand'

interface FilesStore {
  path: string[]
  goToPathFromIndex: (pathIdx: number) => void
  joinWithPath: (pathName: string) => void
}

export const useFilesStore = create<FilesStore>((set, get) => ({
  path: ['/'],
  goToPathFromIndex: idx => {
    const { path: oldPath } = get()
    set({ path: oldPath.slice(0, idx + 1) })
  },
  joinWithPath: pathName => {
    const { path: oldPath } = get()
    set({ path: [...oldPath, pathName] })
  },
}))
