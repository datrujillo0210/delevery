const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const {config} = require('../config/config')
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const serviceAccountKey = require('../serviceAccountKey.json')


const storage = new Storage({
    projectId: "delivey-app-trujistudios",
    keyFilename: "serviceAccountKey.json"
});

const bucket = storage.bucket("gs://delivey-app-trujistudios.appspot.com/");
// const bucket = storage.bucket("gs://delivey-app-trujistudios.appspot.com");
// gs://delivey-app-trujistudios.appspot.com/profile
/**
 * Subir el archivo a Firebase Storage
 * @param {File} file objeto que sera almacenado en Firebase Storage
 */
module.exports = (file, pathImage, deletePathImage) => {
    return new Promise((resolve, reject) => {
        // ... código para eliminar el archivo existente ...

        if (pathImage) {
            if (pathImage != null || pathImage != undefined) {
                let fileUpload = bucket.file(`${pathImage}`);
                let stream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: 'image/png',
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        }
                    },
                    resumable: false
                });

                stream.on('error', (error) => {
                    console.log('Error al subir archivo a firebase', error);
                    reject('Something is wrong! Unable to upload at the moment.');
                });

                stream.on('finish', () => {
                    // The public URL can be used to directly access the file via HTTP.
                    const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                    console.log('URL DE CLOUD STORAGE ', url);
                    resolve(url);
                });

                stream.end(file.buffer);
            }
        }
    });
}







