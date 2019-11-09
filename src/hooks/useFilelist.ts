import client from '../client'
import { useEffect, useReducer } from 'react'
import { IDownloadState, IDownloadAction } from '../interfaces'

// Constants
const INIT = 'INIT'
const FILES_DOWNLOADED = 'FILES_UPLOADED'
const DOWNLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
    files: [],
    folder: '',
    downloading: false,
    status: INIT,
    uploadError: ''
  }

const reducer = (state: IDownloadState, action: IDownloadAction) => {
    switch (action.type) {
        case 'load':
          return { ...state, downloading: true, status: INIT, folder: action.folder }
        case 'files-downloaded':
          return { ...state, downloading: false, status: FILES_DOWNLOADED, files: action.files }
        case 'set-download-error':
          return { ...state, downloading: false, uploadError: action.error, status: DOWNLOAD_ERROR }
        default:
          return state
      }
    }

const useFilelist = (prefix = '') => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const dispatchGetFiles = (prefix: string) => () => dispatch({ type: 'load', folder: prefix})

    useEffect(() => {
      if (state.status === INIT && state.folder !== '') {
        console.log(state.folder)
        client.getFiles(state.folder)
        .then((filelist) => {
          dispatch({ type: 'files-downloaded', files: filelist.files })
        })
        .catch((error) => {
            dispatch({ type: 'set-download-error', error })
        })
      }
    }, [state])
    
    return {
      ...state,
      dispatchGetFiles
    }
}

export default useFilelist