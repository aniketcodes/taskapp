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
  },
  viewAllTasks: async function ( req, res ) {
    try {
      let tasks = await TaskModel.find();
      return res.send( tasks );
    } catch (error) {
            return res.status( 400 ).send( error );

    }
  },
  viewTask: async function ( req, res ) {
    try {
      let taskId = req.params.id;
      let task = await TaskModel.findOne( { _id: taskId } );
      if ( task ) {
        return res.send( task );
      }
      return res.status( 422 ).send( {
        message: "no task found"
      })
      
    } catch (error) {
      return res.status( 400 ).send( error );

    }
    
  },
  deleteTaskAndCount: async function ( req, res ) {
    try {
      let taskId = req.params.id;
      await TaskModel.deleteOne( { _id: taskId } );
      let count = await TaskModel.countDocuments({completed:false});
      return res.send( { count} );
      
    } catch ( error ) {
      console.log( "Error in delteing task ---->", error );
      return res.status( 400 ).send( error );

    }
  }
}