const express = require( "express" )
const router = express.Router()
const taskController = require( "../controllers/taskController" );
const auth = require( "../middleware/auth" );

router.post( "/create", auth,taskController.createTask );
router.get( "/all", taskController.viewAllTasks );
router.get( "/:id", taskController.viewTask );
router.get( "/delete/:id", taskController.deleteTaskAndCount );
module.exports = router