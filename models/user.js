const mongoose = require( "mongoose" );
const validator = require( "validator" );
const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const TaskModel = require( "./task" );
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
  },
  tokens: [
    {
      token: {
        type: String,
        required:true
      }
    }
  ]
}, {
  timestamps:true
} );

userSchema.virtual('tasks', {
  ref: "Task",
  localField: '_id',
  foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign( { _id: this._id.toString() }, "aniket1304" );

  this.tokens = this.tokens.concat( { token } );
  await this.save();

  return token;


}

userSchema.pre( "save", async function ( next ) {
  if ( this.isModified( 'password' ) ) {
    this.password = await bcrypt.hash( this.password, 8 );
    next();
  }
} )


userSchema.pre( "remove", async function ( next ) {
  await TaskModel.deleteMany( { owner: this._id } );
  next();
})

module.exports = mongoose.model( 'User', userSchema );