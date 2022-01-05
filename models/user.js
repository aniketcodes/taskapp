const mongoose = require( "mongoose" );
const validator = require( "validator" );
const bcrypt = require( "bcryptjs" );
const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim: true,
    lowercase:true,
    validate( value ) {
      if ( !validator.isEmail( value ) ) {
        throw new Error( "Invalid email" );
      }
    }
  },
  age: {
    type: Number,
    default:0,
    validate( value ) {
      if ( value < 0 ) {
        throw new Error( 'Age must be a positive number' );
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    required:true
  }
} );

userSchema.pre( "save", async function ( next ) {
  if ( this.isModified( 'password' ) ) {
    this.password = await bcrypt.hash( this.password, 8 );
    next();
  }
})

module.exports = mongoose.model( 'User', userSchema );