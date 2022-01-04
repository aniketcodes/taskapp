const mongoose = require( "mongoose" );

const userSchema = new mongoose.Schema( {
  name: {
    type: String
  },
  age: {
    type: Number,
    validate( value ) {
      if ( value < 0 ) {
        throw new Error( 'Age must be a positive number' );
      }
    }
  }
} );

module.exports = mongoose.model( 'User', userSchema );