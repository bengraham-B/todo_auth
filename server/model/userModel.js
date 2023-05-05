//^ Creating a svhema which will be used to store the user info when they are authenticated as well as check if they are registered when they login
const mongoose = require("mongoose")
const bcrypt = require('bcrypt') //^ Used to hash the passwords
const validator = require('validator')
const dateString = require('goose-funcs-2')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }
})

//^ Creating a static signup method
userSchema.statics.signup = async function(email, password){
    //~ Validation of email and password
    if(!email || !password){
        //^ If their is no email or password
        throw Error(" All fields must be filled")
    }

    //~ Check if email is valid
    if(!validator.isEmail(email)){ //~ Looks of if email is not valid
        //~ returns true if valid email and false if not valid
        throw Error("Email is not valid")
    }

    //~ Checks if password is strong enough 
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }


    //! Check if email is already in the DB
    const exists = await this.findOne({ email }) //^ 'this.' refers to the model, in this case UserSchema.
    if(exists){
        throw Error("Email already in use")
    }

    //^ Generating Salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) //^ Bcrypt hasing the user's password and adding salt

    //* Storing user in db with email and password
    const user = await this.create({ email, password: hash}) //^ passing in the hash as the password, which is the new hashed value

    console.log(dateString())

    return user

}

module.exports = mongoose.model('User', userSchema) //^ Information will be saved to Users within the database, in the TODOS_DB