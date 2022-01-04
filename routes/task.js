const express = require( "express" )
const router = express.Router()
const taskController = require( "../controllers/taskController" );

router.post( "/create", taskController.createTask );
router.get( "/all", taskController.viewAllTasks );
router.get( "/:id", taskController.viewTask );

module.exports = router