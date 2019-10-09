import React from 'react'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
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

import useUpload from './useUpload'
import useFilelist from './useFilelist';
import useDelete from './useDelete'

const SampleManager = () => {

    const {
        file,
        status,
        uploading,
        onSubmit,
        onChange,
        uploadError
    } = useUpload()

    let files = useFilelist()
    const handleDelete = useDelete()
        return (
            <Container maxWidth='sm'>
            <Box mt={10}>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <FormGroup>
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
                    {uploading && <CircularProgress />}
                    {status === 'UPLOADED_ERROR' && <Snackbar open><SnackbarContent><ErrorIcon />{uploadError}</SnackbarContent></Snackbar>}
                    {status === 'FILES_UPLOADED' && <Snackbar open><SnackbarContent><InfoIcon />{uploadError}</SnackbarContent></Snackbar>}
                </Box>
                <Box mt={4}>
                    <Typography variant='h4'>Manage Files</Typography>
                    <List>
                        {files.map((file) => 
                        <React.Fragment>
                            <ListItem key={file}>
                                <ListItemIcon>
                                    <AlbumIcon />
                                </ListItemIcon>
                                <ListItemText primary={file}/>
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