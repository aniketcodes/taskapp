const UserModel = require( "../models/user" );
const bcrypt = require( "bcryptjs" );
module.exports = {
  createUser: async function ( req, res ) {
    try {
      let { name, email, age, password } = req.body;
      let user = await UserModel.create( { name, email, age, password } );
      let token = await user.generateAuthToken()
      return res.send( { user, token } )
    } catch ( error ) {
      console.log("error in creating user ----->",error)
      return res.status( 400 ).send( error );
    }
  },
  viewMe: async function ( req, res ) {
    try {
      return res.send( req.user )
    } catch ( error ) {
      return res.status( 400 ).send( error )

    }
  },
  viewUser: async function ( req, res ) {
    try {
      let userId = req.params.id;
      let user =await  UserModel.findOne( { _id: userId }, { password: 0 } );
      if ( user ) {
        return res.send( user );
      }
      return res.status( 422 ).send( { message: "no user found" } );

      
    } catch ( error ) {
      return res.status( 400 ).send( error )
    }
  },
  updateUser: async function ( req, res ) {
    try {
      let userId = req.user._id;
      let { name, email, age, password } = req.body;
      let result = await UserModel.findByIdAndUpdate( userId, { name, email, age, password }, { fields: { password: 0 }, new: true, runValidators: true } );
      if ( !result ) {
        return res.status( 404 ).send();
      }
      return res.send( result );
    } catch (error) {
      return res.status( 400 ).send( error )

    }
  },
  login: async function ( req, res ) {
    try {
      let { email, password } = req.body
      
      let user = await UserModel.findOne( { email } )
      if ( !user ) {
        return res.status( 404 ).send()
      }

      if ( !await bcrypt.compare( password, user.password ) ) {
        return res.status( 401 ).send( {
          message: "Unable to login. Check your credentials"
        } )
      }
      let token = await user.generateAuthToken()

      return res.send({user, token})
      
    } catch ( error ) {
      console.log( "error in login", error );
      return res.status( 400 ).send( error )

    }
  },
  logout: async function ( req, res ) {
    try {
      req.user.tokens = req.user.tokens.filter( ( token ) => {
        return token.token != req.token;
      })
      
      await req.user.save();
      res.send( { message: "Logged out" } );
      
    } catch (error) {
      return res.status( 400 ).send( error )

    }
  },
  deleteUser: async function ( req, res ) {
    try {
      let result = await UserModel.findByIdAndDelete( req.user.id );
      if ( !result ) {
        return res.send( {
          message:"No user found"
        })
      }
      return res.send( {
        message:"Deleted successfully"
      })
      
    } catch (error) {
      return res.status( 400 ).send( error )

    }
  },
  upload: async function ( req, res ) {
    try {
      req.user.avatar = req.file.buffer
      await req.user.save();
      return res.send( { message: "uploaded avatar" } );
    } catch (error) {
      return res.status( 400 ).send( error )

    }
  },
  deleteAvatar: async function ( req, res ) {
    try {
      req.user.avatar = undefined;
      await req.user.save();
      return res.send( {
        message:"avatar deleted"
      })
    } catch (error) {
      return res.status( 400 ).send( error )

    }
  }
}