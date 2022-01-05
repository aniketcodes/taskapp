const TaskModel = require( "../models/task" );

module.exports = {
  createTask: async function ( req, res ) {
    try {
      let { description, completed } = req.body;
      let owner = req.user._id;
      let result = await TaskModel.create( { description, completed ,owner} );
      return res.send( result );
      
    } catch ( error ) {
      console.log( "error in createTask", error );
      return res.status( 400 ).send( error );
    }
  },
  viewAllTasks: async function ( req, res ) {
    try {
      let owner = req.user._id
      let completed = req.query.completed == "true" ? true : false
      let limit = parseInt( req.query.limit) || 10
      let skip = parseInt( req.query.skip) || 0;
      let tasks = await TaskModel.find( { owner ,completed},null,{limit,skip}).populate( 'owner', 'name email' ).exec();
      return res.send( tasks );
    } catch ( error ) {
      console.log( 'error', error );
        return res.status( 400 ).send( error );

    }
  },
  viewTask: async function ( req, res ) {
    try {
      let taskId = req.params.id;
      let owner = req.user._id;
      let task = await TaskModel.findOne( { _id: taskId ,owner} );
      if ( task ) {
        return res.send( task );
      }
      return res.status( 422 ).send( {
        message: "no task found"
      })
      
    } catch ( error ) {
      console.log( 'error', error );
      return res.status( 400 ).send( error );

    }
    
  },
  deleteTaskAndCount: async function ( req, res ) {
    try {
      let taskId = req.params.id;
      let owner = req.user._id;
       await TaskModel.deleteOne( { _id: taskId,owner } );
      let count = await TaskModel.countDocuments({completed:false});
      return res.send( { count} );
      
    } catch ( error ) {
      console.log( "Error in delteing task ---->", error );
      return res.status( 400 ).send( error );

    }
  },
  updateTask: async function ( req, res ) {
    try {
      let taskId = req.params.id;
      let owner = req.user._id;
      let { description,completed } = req.body
      let result = await UserModel.findOneAndUpdate( { _id: taskId,owner}, { description,completed }, { new: true, runValidators: true } )
      if ( !result ) {
        return res.status( 404 ).send()
      }
      return res.send( result )
    } catch ( error ) {
      return res.status( 400 ).send( error )

    }
  }
}