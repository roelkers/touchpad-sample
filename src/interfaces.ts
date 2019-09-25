export interface ISoundField {
    classes: string
}

export interface IAuthContext {
    isLoggedIn: boolean,
    setLoggedIn: (val: boolean) => void
}