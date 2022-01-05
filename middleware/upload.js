const multer = require( "multer" );

const upload = multer( {
  limits: {
    fileSize:10000000
  },
  fileFilter:  function ( req, file, cb ) {
    if ( !file.originalname.match(/\.(jpg|jpeg|png)$/) ) {
      return cb( new Error( "Please upload only image" ) );
    }
    cb( undefined, true );
  }
} 
)

module.exports = upload.single('upload');