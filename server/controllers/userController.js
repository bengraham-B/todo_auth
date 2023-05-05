//* iMPORTING THE uSER MODEL
const User = require('../model/userModel')

//Login User
const loginUser = async (req, res) => {
    res.json({msg:"Login User"})
}

//Signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    //^try to signup the user

    try {
        const user = await User.signup(email, password) //^ Using static signup method from userModel.js
        res.status(201).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}

module.exports = { signupUser, loginUser }