const express = require("express")

//^ Requiring Controller function
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router() //^using express Router to make routes

//^ Login Route
router.post('/login', loginUser)

//^ Signup Route
router.post('/signup', signupUser)

module.exports = router