import React, { useState, useEffect } from 'react'
import { ISoundfieldSettingsProps } from '../interfaces'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import useFilelist from '../hooks/useFilelist'
import AudioGraph from './AudioGraph'

const SoundFieldSettings = (props: ISoundfieldSettingsProps) => {
    const { folders, setSampleUrl, storage, setEffect } = props
    const [sampleName, setSampleName] = useState<string>('')
    const [selectedFolder, setFolder] = useState('')
    const { files, downloading, dispatchGetFiles } = useFilelist()

    useEffect(() => {
        if(sampleName !== '') {
            const storageRef = storage.ref()
            storageRef.child(sampleName).getDownloadURL()
            .then((url: string) => setSampleUrl(url))
            .catch((err: Error) => console.log(err))
        }
    },[sampleName, setSampleUrl, storage])


    useEffect(() => {
        dispatchGetFiles(selectedFolder)()
    }, [selectedFolder])


    return (
    <Box justifyContent='center' display='flex' flexDirection='column'>
        <Typography variant='h4'>Settings</Typography>
        <NativeSelect
            value={selectedFolder}
            onChange={(event: any) => {
                setFolder(event.target.value)
            }}
        >
            {folders.map((folder) => <option key={folder} value={folder}>{folder}</option>)}
        </NativeSelect>
        <NativeSelect
            value={sampleName}
            onChange={(event: any) => {
                setSampleName(event.target.value)
            }}
        >
            {files.map((file) => <option key={file} value={file}>{file}</option>)}
        </NativeSelect>
        <Box mt='5'>
            <AudioGraph setEffect={setEffect}/>
        </Box>    
    </Box>)

}

export default SoundFieldSettings