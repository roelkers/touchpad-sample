import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import AlbumIcon from '@material-ui/icons/Album';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import { ISampleManagerProps } from '../interfaces'
import NativeSelect from '@material-ui/core/NativeSelect';

import useUpload from '../hooks/useUpload'
import useDelete from '../hooks/useDelete'
import useFilelist from '../hooks/useFilelist'

const SampleManager = (props: ISampleManagerProps) => {

    const [uploadFolder, setUploadFolder] = useState('')
    const [downloadFolder, setDownloadFolder] = useState('')
    const { files, downloading, dispatchGetFiles } = useFilelist()

    const {
        status,
        uploading,
        onSubmit,
        onChange,
        uploadError
    } = useUpload(dispatchGetFiles(downloadFolder), downloadFolder)

    useEffect(() => {
        dispatchGetFiles(downloadFolder)()
    }, [downloadFolder])

    const handleDelete = useDelete(dispatchGetFiles(downloadFolder))

    return (
        <Container maxWidth='sm'>
            <Box mt={10}>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                id="folder"
                                label="Upload to Folder"
                                value={uploadFolder}
                                onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setUploadFolder(event.currentTarget.value)}
                                margin="normal"
                            />
                            <input
                                type='file'
                                id='uploadfile'
                                name='uploadfile'
                                onChange={onChange}
                            />
                            <Box mt={2}>
                                <label htmlFor="uploadFile">
                                    <Button type='submit' variant='contained'>Upload File</Button>
                                </label>
                            </Box>
                        </FormGroup>
                    </FormControl>
                </form>
            </Box>
            <Box mt={2}>
                {uploading && <Box><CircularProgress color='secondary' /><Typography variant='body1'>Uploading...</Typography></Box>}
                {downloading && <Box><CircularProgress /><Typography variant='body1'>Fetching Files...</Typography></Box>}
                {status === 'UPLOADED_ERROR' && <Snackbar open><SnackbarContent><ErrorIcon />{uploadError}</SnackbarContent></Snackbar>}
                {status === 'FILES_UPLOADED' && <Snackbar open><SnackbarContent><InfoIcon />{uploadError}</SnackbarContent></Snackbar>}
            </Box>
            <Box mt={4}>
                <Typography variant='h4'>Manage Files</Typography>
                <NativeSelect
                    value={downloadFolder}
                    onChange={(event: any) => {
                        setDownloadFolder(event.target.value)
                    }}
                >
                {props.folders.map((f) => <option key={f} value={f}>{f}</option>)}
                </NativeSelect>
                    <List>
                        {files.map((file) =>
                            <React.Fragment key={file}>
                                <ListItem >
                                    <ListItemIcon>
                                        <AlbumIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={file} />
                                    <Button onClick={() => handleDelete(file)}>
                                        <ListItemIcon>
                                            <DeleteIcon />
                                        </ListItemIcon>
                                    </Button>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )}
                    </List>
                </Box>
            </Container>
            )
    }
    
export default SampleManager