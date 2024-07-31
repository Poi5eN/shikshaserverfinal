const multer = require('multer')
const storage = multer.memoryStorage()

const singleUpload = multer({storage}).single('image')
const uploads = multer({storage}).any()

module.exports = {singleUpload, uploads}


// const multer = require('multer');
// const path = require('path');

// // Disk storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory for storing files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Adding timestamp to the file name
//   }
// });

// const upload = multer({ storage });

// // Middleware to handle single file uploads
// const singleUpload = upload.single('image');

// // Middleware to handle multiple files uploads
// const uploads = upload.any();

// module.exports = { singleUpload, uploads };
