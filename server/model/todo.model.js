require("dotenv").config()
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const date = new Date()
let dateString //^ Declering the variable which will be used within the if block below to set the dat and time the todo was created.

if( date.getMonth() + 1 === 4){
    dateString = `${date.getDate()} April ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
} else if (date.getMonth() + 1 === 5){
    dateString = `${date.getDate()} May ${date.getFullYear()}`
}

console.log(dateString)

//* Creating the Schema for the TODOS
const TodoSchema = new Schema({
    details: {
        type: String, 
        required: true
    },
    completed: {
        type: Boolean, 
        default: false
    }, //^ Setting the default to false for all todos as when the user adds them, the todo has not yet been completed.
    created: {
        type: String,
        default: dateString
    }
}, { timestamps: true }) //?((1)geeksforgeeks.org)

//^ "TODO_SCHEMA" -> Used capital letters and an underscore oppsed to camel casing as I want this vairable to stand out.
module.exports = mongoose.model("todos_collection", TodoSchema)

/*
 * Resources Used:
 * (1) https://www.geeksforgeeks.org/mongoose-timestamps/ : Information regarding timestamps in mongoose
 */
