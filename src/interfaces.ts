import { History, LocationState } from 'history'

export interface ITouchpadProps {
    configModeOn: boolean,
    files: string[],
    storage: any
}

export interface ISoundFieldIntrinsicProps {
    classes: string
}

export interface IAuthContext {
    isLoggedIn: boolean,
    setLoggedIn: (val: boolean) => void
}

export interface ISidebarProps {
    sidebarOpen: boolean,
    setSidebarOpen: (open: boolean) => void
}

export interface IAuthProps {
    history : History<LocationState>
}
 
export interface IToolbarProps {
    setConfigModeOn: (on: boolean) => void,
    configModeOn: boolean
}

export interface ISampleManagerProps {
    files: string[],
    dispatchGetFiles: () => void,
    downloadingFiles: Boolean
}

export interface ISoundfieldSettingsProps {
    files: string[],
    setSampleUrl: (name: string) => void,
    storage: any
}

export interface IUploadState {
    file : any,
    uploading: boolean,
    status: string,
    uploadError: string
}

export type IUploadAction = 
 | { type: 'load', file: any}
 | { type: 'submit' }
 | { type: 'file-uploaded'}
 | { type: 'set-upload-error', error: string }

 export interface IDownloadState {
    files : string[],
    status: string,
    uploadError: string,
    downloading: Boolean
}

export type IDownloadAction = 
 | { type: 'load'}
 | { type: 'files-downloaded', files: string[]}
 | { type: 'set-download-error', error: string }
