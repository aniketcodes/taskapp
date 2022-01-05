const express = require( "express" )
const router = express.Router()
const userController = require( "../controllers/userController" );
const auth = require( "../middleware/auth" );
router.post( '/create', userController.createUser );
router.get( "/me",auth, userController.viewMe );
router.get( "/:id", userController.viewUser );
router.post( '/login', userController.login );

module.exports = router