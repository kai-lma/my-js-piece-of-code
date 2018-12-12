// Setting server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const IP = require('ip').address();
const PORT = 8080;

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
    return;
  }
  console.info('🌎 ==> Server is on %s:%s', IP, PORT);
});

// Setting logger
// const expressLogging = require('express-logging')
// const logger = require('logops')
// app.use(expressLogging(logger))

// Setting static file folder
const ecstatic = require('ecstatic');
app.use(ecstatic({ root: __dirname + '/public' }));

// Setting upload
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public');
  },
  filename: function(req, file, cb) {
    const dotIndex = file.originalname.lastIndexOf('.');
    const tail = file.originalname.substr(dotIndex, file.originalname.length - dotIndex);
    const orgName = file.originalname.substr(0, dotIndex);
    const reName = orgName + '-' + Date.now() + tail;
    cb(null, reName);
  },
});
const upload = multer({ storage });
app.post('/upload', upload.single('fileupload'), function(req, res, next) {
  res.redirect('/');
  console.log('😍 New file uploaded: ' + req.file.filename);
});
app.get('/upload', function(req, res) {
  res.sendFile(__dirname + '/upload.html');
});
