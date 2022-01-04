const mongoose = require( "mongoose" );
const validator = require( "validator" );

const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
    validate( value ) {
      if ( !validator.isEmail( value ) ) {
        throw new Error( "Invalid email" );
      }
    }
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