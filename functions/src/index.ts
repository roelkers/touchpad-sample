const functions = require('firebase-functions')
import * as express from 'express'
const fileParser = require('express-multipart-file-parser')
const config = require('../config')
const admin = require("firebase-admin");

const app = express()

const serviceAccount = require(`../config/${config.fireBasePrivateKeyPath}`);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.firebaseStorageBucketURL
  });

const bucket = admin.storage().bucket();
// add admin to ther request params to get into controller zone

app.use(fileParser)

// URL /upload
app.post("/upload", (req, res) => {
    const files : any  = req.files;
    console.log(req.files)
    console.log(req.file)
    if(!files) {
      res.status(500);
      res.json('file not found');
      return;
    }
    let fileUpload = bucket.file(files[0].originalname);

  // Get File from request Form data.
  fileUpload.save(new Buffer(files[0].buffer)).then(  
      (result : any) => {
        res.status(200);
        res.json('file uploaded successfully');
      },
      (error: any) => {
        res.status(500);
        console.log(error);
        res.json({error: error});
      }
    );
  })

exports.app = functions.https.onRequest(app)