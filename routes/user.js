const express = require( "express" )
const router = express.Router()
const userController = require( "../controllers/userController" );
const auth = require( "../middleware/auth" );
router.post( '/create', userController.createUser );
router.get( "/me", auth, userController.viewMe );
router.patch( "/me", userController.updateUser );
router.delete( "/me", auth, userController.deleteUser );
router.post( '/login', userController.login );
router.get( "/logout", auth, userController.logout );

module.exports = router