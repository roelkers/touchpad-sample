const UPLOAD_ROUTE = 'http://localhost:5000/touchpad-sample/us-central1/app'

const client = {

    uploadFile: (formData: any) => {
        return fetch(`${UPLOAD_ROUTE}/upload`, {
            method: 'POST',
            body: formData
        })    
    },

    getFiles: function(): Promise<{ files: [string] }> {
        return fetch(`${UPLOAD_ROUTE}/files`, {
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
        return fetch(`${UPLOAD_ROUTE}/file/${fileName}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
                }
            })
            .catch((err) => console.log(err))
    }
}

export default client