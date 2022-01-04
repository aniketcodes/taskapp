const TaskModel = require( "../models/task" );

module.exports = {
  createTask: async function ( req, res ) {
    try {
      let { description, completed } = req.body;
      let result = await TaskModel.create( { description, completed } );
      return res.send( result );
      
    } catch ( error ) {
      console.log( "error in createTask", error );
      return res.status( 400 ).send( error );
    }
  }
}