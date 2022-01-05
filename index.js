const dotenv = require( "dotenv" );
dotenv.config();
const express = require( "express" );
const app = express();
const PORT = process.env.PORT;
const db = require( "./config/mongoose" );
app.use( express.urlencoded( { limit: '50mb', extended: true } ) )
app.use( express.json( { limit: '50mb' } ) );

app.use( "/", require( "./routes" ) );



//LISTEN Route
app.listen( PORT, ( err ) => {
  if ( err ) {
    return console.log( `Error in running at port ${ PORT }` );
  } 
  console.log(`Serving at port ${PORT}`);
})