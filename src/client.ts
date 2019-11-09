const UPLOAD_ROUTE = process.env.REACT_APP_BACKEND_URL
console.log(UPLOAD_ROUTE)
const client = {

    uploadFile: (formData: any) => {
        return fetch(`${UPLOAD_ROUTE}/upload`, {
            method: 'POST',
            body: formData
        })
    },

    getFiles: function (folder: string): Promise<{ files: [string] }> {
        return fetch(`${UPLOAD_ROUTE}/folders/${folder}files`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .catch((err) => console.log(err))
    },

    getFolders: function (): Promise<{ folders: [string] }> {
        return fetch(`${UPLOAD_ROUTE}/folders`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .catch((err) => console.log(err))
    },

    deleteFile: (fileName: string) => {
        return fetch(`${UPLOAD_ROUTE}/files/${fileName}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            console.log(response)
        })
            .catch((err) => console.log(err))
    }
}

export default client