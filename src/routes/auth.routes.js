const { Router } = require('express')
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */

authRouter.post('/register', authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access public
 */
authRouter.post('/login', authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description Logout a user by clear token from user cookie and add to blacklist
 * @access public
 */
authRouter.get('/logout', authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user details
 * @access private
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController)


module.exports = authRouter  