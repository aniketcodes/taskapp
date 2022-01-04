const express = require( "express" )
const router = express.Router()
const userController = require( "../controllers/userController" );

router.post( '/create', userController.createUser );
router.get( "/all", userController.viewAllUsers );
router.get( "/:id", userController.viewUser );

module.exports = router