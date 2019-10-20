import client from './client'
//import { useEffect, useState } from 'react'

const useDelete = (dispatchGetFiles: () => void) => {
    const handleDelete = (fileName: string) => {
            client.deleteFile(fileName)
            .then((res: any) => {
                dispatchGetFiles()
            })
    }
    return handleDelete
}

export default useDelete