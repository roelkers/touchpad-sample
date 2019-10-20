import { useCallback, useEffect, useReducer } from 'react'
import { IUploadState, IUploadAction } from './interfaces'
import client from './client'

// Constants
const LOADED = 'LOADED'
const INIT = 'INIT'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
    file: null,
    uploading: false,
    status: 'idle',
    uploadError: ''
  }

const uploadFile = (file : any) => {

    const formData = new FormData()
    formData.append('files', file.files[0])
    return client.uploadFile(formData)
}

const reducer = (state: IUploadState, action: IUploadAction) => {
    switch (action.type) {
      case 'load':
        return { ...state, file: action.file, status: LOADED }
      case 'submit':
        return { ...state, uploading: true, status: INIT }
      case 'file-uploaded':
        return { ...state, uploading: false, status: FILES_UPLOADED }
      case 'set-upload-error':
        return { ...state, uploading: false, uploadError: action.error, status: UPLOAD_ERROR }
      default:
        return state
    }
  }

const useUpload = (dispatchGetFiles: () => void) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const onSubmit = useCallback(
        (e) => {
          e.preventDefault()
          if (state.file) {
            dispatch({ type: 'submit' })
          } else {
            window.alert("You don't have any file loaded.")
          }
        },
        [state.file],
      )
    
      const onChange = (e : any) => {
        const files = e.target.files

        if (files) {
          const arrFiles = Array.from(e.target.files)
          const src = window.URL.createObjectURL(arrFiles[0])
          dispatch({ type: 'load', file: {files, src} })
        }
      }
    
    useEffect(() => {
        if (state.uploading === true && state.status === INIT) {
            uploadFile(state.file)
            .then(() => {
                dispatch({ type: 'file-uploaded' })
                dispatchGetFiles()
            })
            .catch((error) => {
                dispatch({ type: 'set-upload-error', error })
            })
        }
    }, [state])

    return {
        ...state,
        onSubmit,
        onChange
    }
}

export default useUpload