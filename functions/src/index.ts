const functions = require('firebase-functions')
import * as express from 'express'
const fileParser = require('express-multipart-file-parser')
const config = require('../config')
const  { Storage } = require('@google-cloud/storage')
const cors = require('cors')
//const firebase = require('firebase')

const app = express()

const serviceAccount = require(`../config/${config.fireBasePrivateKeyPath}`);

const storage = new Storage({
    credentials: serviceAccount,
  });

const bucket = storage.bucket(config.firebaseStorageBucketURL);

const corsMiddleware = cors({origin: true})

app.use(fileParser)

// URL /upload
app.post("/upload", (req: any, res) => {
    const files : any  = req.files;
    const folder = req.body.folder
    console.log(req.folder)
    if(!files) {
      res.status(500);
      res.json('file not found');
      return;
    }
    const fileUpload = bucket.file(`${folder}${files[0].originalname}`);

  // Get File from request Form data.
  fileUpload.save(new Buffer(files[0].buffer)).then(  
      (result : any) => {
        res.status(200);
        res.json({ error: 'file uploaded successfully'});
      },
      (error: any) => {
        res.status(500);
        console.log(error);
        res.json({error: error});
      }
    );
  })

app.get("/files", async (req, res) => {
  const result = await bucket.getFiles()
  const files = result[0]
  const fileNames = files.map((file: any) => file.name)
  console.log(fileNames)
  res.json({files: fileNames})
})

app.get("/folders", (req, res) => {
   bucket.getFiles({
    autoPaginate: false,
    delimiter: '/', 
  }, function(err:any, files:any, nextQuery:any, apiResponse:any) {
    res.json({folders: apiResponse.prefixes})
  })
})

app.get("/folders/:prefix/files", async (req, res) => {
  const { prefix } = req.params
  const result = await bucket.getFiles({
    autoPaginate: false,
    delimiter: '/',
    prefix: `${prefix}/`
   })
   const files = result[0]
   const fileNames = files.map((file: any) => file.name)
   console.log(fileNames)
   res.json({files: fileNames})
})


app.delete("/files/:id", async (req, res) => {
  const { id } = req.params

  const file = bucket.file(id)
  console.log(file)
  await file.delete().catch(() => 
    res.status(400).send('could not delete file'))
  res.send('file deleted')
})

exports.app = functions.https.onRequest((req: any,res: any) => {
  return corsMiddleware(req, res, () => {
    app(req,res)
  })
})