const UserModel = require( "../models/user" );

module.exports = {
  createUser: async function ( req, res ) {
    try {
      let { name, email, age, password } = req.body;
      let result = await UserModel.create( { name, email, age, password } );
      return res.send( result );
    } catch ( error ) {
      console.log("error in creating user ----->",error)
      return res.status( 400 ).send( error );
    }
  }
}