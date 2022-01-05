const jwt = require( "jsonwebtoken" );
const UserModel = require( "../models/user" );

const auth = async function ( req, res, next ) {
  try {
    let token = req.header( "Authorization" ).split( "Bearer " )[ 1 ]
    let decoded = jwt.verify( token, 'aniket1304' )
    let user = await UserModel.findOne( { _id: decoded._id, 'tokens.token': token } )

    if ( !user ) {
      throw new Error()
    }
    req.token = token;
    req.user = user
    next()
  } catch ( error ) {
    res.status( 400 ).send( { error: "Authentication failed" } )
  }
}
module.exports = auth;