import client from './client'
import { useEffect, useState } from 'react'

const useFilelist = () => {

    const [files, setFiles] = useState<string[]>([])

    useEffect(() => {
        console.log("getting files")
        client.getFiles()
        .then((filelist) => {

            setFiles(filelist.files)
        })
    },[])
    return files
}

export default useFilelist