import React, { useState, useEffect } from 'react'
import { ISoundfieldSettingsProps } from '../interfaces'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';

const SoundFieldSettings = (props: ISoundfieldSettingsProps) => {
    const [samplePath, setSamplePath] = useState<string>('')
    const { files, setSampleUrl, storage } = props

    useEffect(() => {
        if(samplePath !== '') {
            console.log(samplePath)
            const storageRef = storage.ref()
            
            storageRef.child(samplePath).getDownloadURL()
            .then((url: string) => setSampleUrl(url))
            .catch((err: Error) => console.log(err))
        }
    },[samplePath, setSampleUrl, storage])

    return (
    <Box justifyContent='center' display='flex' flexDirection='column'>
        <Typography variant='h4'>Settings</Typography>
        <NativeSelect
            value={samplePath}
            onChange={(event: any) => {
                console.log(event.target.value)
                setSamplePath(event.target.value)
            }}
        >
            {files.map((file) => <option value={file}>{file}</option>)}
        </NativeSelect>
    </Box>)

}

export default SoundFieldSettings