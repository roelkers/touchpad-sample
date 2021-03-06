import { History, LocationState } from 'history'

export interface IAppProps {
    storage: any,
    audioContext: AudioContext
}

export interface ITouchpadProps {
    configModeOn: boolean,
    folders: string[],
    storage: any,
    audioContext: AudioContext
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
    folders: string[],
}

export interface ISoundfieldSettingsProps {
    folders: string[],
    setSampleUrl: (name: string) => void,
    storage: any,
    setAudioGraph: (nodes: IGraphNode[]) => void,
    audioGraph: IGraphNode[]
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
    folder: string,
    status: string,
    uploadError: string,
    downloading: Boolean
}

export type IDownloadAction = 
 | { type: 'load', folder: string}
 | { type: 'files-downloaded', files: string[]}
 | { type: 'set-download-error', error: string }

 export interface IDownloadFoldersState {
    folders : string[],
    status: string,
    uploadError: string,
    downloadingFolders: Boolean
}

export type IDownloadFoldersAction = 
 | { type: 'load'}
 | { type: 'folders-downloaded', folders: string[]}
 | { type: 'set-download-error', error: string }

 export interface IGraphNode {
     label: string,
     icon: string,
     type: string,
     name: string
 }

 export interface IAudioGraphProps {
    setAudioGraph: (nodes: IGraphNode[]) => void
    audioGraph: IGraphNode[]
 }

 export interface MyStepIconProps {
     nodes: IGraphNode[]
 }

 export type effectType = 
    'filter' | 'delay'