import client from './client'
//import { useEffect, useState } from 'react'

const useDelete = () => {
    const handleDelete = (fileName: string) => {
            client.deleteFile(fileName)
            .then((res: any) => {
                console.log(res)
            })
    }
    return handleDelete
}

export default useDelete