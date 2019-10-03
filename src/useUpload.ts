import { useCallback, useEffect, useReducer, useRef } from 'react'
import { IUploadState, IUploadAction } from './interfaces'

// Constants
const UPLOAD_ROUTE = 'http://localhost:5000/touchpad-sample/us-central1/app/upload'
const LOADED = 'LOADED'
const INIT = 'INIT'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
    file: {},
    uploading: false,
    status: 'idle',
    uploadError: ''
  }

const uploadFile = (file : any) => {
    return fetch(UPLOAD_ROUTE, {
        method: 'PUT',
        body: file.file
    })    
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
        return { ...state, uploadError: action.error, status: UPLOAD_ERROR }
      default:
        return state
    }
  }

const useUpload = () => {
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
        const file = e.target.file
        if (file) {
          const src = window.URL.createObjectURL(file)
          dispatch({ type: 'load', file: {file, src} })
        }
      }

    // Processes the next pending thumbnail when ready
    useEffect(() => {
        if (state.uploading === false && state.status === INIT) {
 
            uploadFile(state.file)
            .then(() => {
                dispatch({ type: 'file-uploaded' })
            })
            .catch((error) => {
                console.error(error)
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