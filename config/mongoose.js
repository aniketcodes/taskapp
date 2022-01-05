const mongoose = require( "mongoose" );
mongoose.connect( process.env.LOCAL_DB, { useUnifiedTopology: true }, { useNewUrlParser: true } )

const db = mongoose.connection
db.on( 'error', console.error.bind( console, "Error in connecting to db" ) )
db.once( 'open', () => {
  console.log( "Successfully connected to DB TASKAPP" )
} )

module.exports = db