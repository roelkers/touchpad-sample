import { History, LocationState } from 'history'

export interface ITouchpadProps {
    configModeOn: boolean
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

