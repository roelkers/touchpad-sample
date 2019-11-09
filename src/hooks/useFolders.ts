import client from '../client'
import { useEffect, useReducer } from 'react'
import { IDownloadFoldersState, IDownloadFoldersAction } from '../interfaces'

// Constants
const INIT = 'INIT'
const FOLDERS_DOWNLOADED = 'FILES_DOWNLOADED'
const DOWNLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
    folders: [],
    downloadingFolders: false,
    status: INIT,
    uploadError: ''
  }

const reducer = (state: IDownloadFoldersState, action: IDownloadFoldersAction) => {
    switch (action.type) {
        case 'load':
          return { ...state, downloadingFolders: true, status: INIT }
        case 'folders-downloaded':
          return { ...state, downloadingFolders: false, status: FOLDERS_DOWNLOADED, folders: action.folders }
        case 'set-download-error':
          return { ...state, downloadingFolders: false, uploadError: action.error, status: DOWNLOAD_ERROR }
        default:
          return state
      }
    }

const useFolders = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const dispatchGetFolders = () => dispatch({ type: 'load'})

    useEffect(() => {
      if (state.status === INIT) {
        client.getFolders()
        .then((data) => {
          console.log("data", data)
          dispatch({ type: 'folders-downloaded', folders: data.folders })
        })
        .catch((error) => {
            dispatch({ type: 'set-download-error', error })
        })
      }
    }, [state])
    
    return {
      ...state,
      dispatchGetFolders
    }
}

export default useFolders