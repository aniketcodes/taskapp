const express = require( "express" );
const app = express();
const PORT = 8000;
const db = require( "./config/mongoose" );





//LISTEN Route
app.listen( PORT, ( err ) => {
  if ( err ) {
    return console.log( `Error in running at port ${ PORT }` );
  }
  console.log(`Serving at port ${PORT}`);
})