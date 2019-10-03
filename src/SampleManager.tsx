import React, { useContext } from 'react'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import useUpload from './useUpload'

const SampleManager = () => {

    const {
        file,
        status,
        uploading,
        onSubmit,
        onChange,
        uploadError
    } = useUpload()

        return (
            <Container maxWidth='xs'>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <FormControlLabel>Upload new sample</FormControlLabel>
                        <FormGroup>
                            <Input
                                type='file'
                                id='uploadfile'
                                name='uploadfile'
                                onChange={onChange}
                            />
                            <Button type='submit'>Upload File</Button>
                        </FormGroup>
                    </FormControl>
                </form>
                {uploadError}
                <CircularProgress />

            </Container>
        )
}

export default SampleManager