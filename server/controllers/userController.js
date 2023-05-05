//* iMPORTING THE uSER MODEL
const User = require('../model/userModel')
const jwt = require('jsonwebtoken') //^ Requiring the JWT libary

//^ Functio to create JWT tokens
const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, {expiresIn: '3d'}) //^ Importing the secret from .env and the user will remain logged in for three days before the token expires.
}

//^ Login User
const loginUser = async (req, res) => {
    res.json({msg:"Login User"})
}

//^ Signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    //^try to signup the user

    try {
        const user = await User.signup(email, password) //^ Using static signup method from userModel.js

        //^ Create Token after the user has been saved to the DB
        const token = createToken(user._id) //^ Passing in the mongoDB assigned id as a prop, payload on the token

        res.status(201).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}

module.exports = { signupUser, loginUser }