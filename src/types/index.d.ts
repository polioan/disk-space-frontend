namespace App {
  interface AuthResponce {
    token: string
  }

  interface MeResponce {
    email: string
    usedSpace: number
    storageSize: number
  }

  interface LoadResponce {
    usedSpace: number
  }

  interface DeleteResponce {
    usedSpace: number
  }

  type GetFileResponce = Blob

  interface ServerErrorData {
    message: string
  }

  interface FileInfo {
    name: string
    isFile: boolean
  }

  interface FilesInfo {
    files: FileInfo[]
    count: number
  }

  type NewDirResponce = void

  interface TxtResponce {
    usedSpace: number
  }
}
