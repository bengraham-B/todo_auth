require("dotenv").config()
const express = require('express')
const mongoose = require("mongoose")

const dateString = require('./date.js') //^ file i made which shows date and time, easier to keep track of requsts to the server being mage

const app = express()

app.use(express.json())  //? Info regarding using this middileware : https://stackoverflow.com/questions/62455716/typeerror-cannot-destructure-property-userid-of-req-body-as-it-is-undefined


//* Importing the Todo routes
const todoRoutes = require('./routes/todo.routes.js')

//* Importing the AUTH routes
const userRoutes = require('./routes/userRoutes')

//^ Using Date log where the CRUD method was last used.
app.use((req, res, next) => {
    console.log(req.path, req.method, dateString())
    next()
})

//* Routes - Basic Routes are working.
app.use('/api/todos', todoRoutes)

//* Routes - AUTH Routes are working.
app.use('/api/user', userRoutes)


//* Connecting to MongoDB.
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DATABASE_NAME //* Connecting to the CAR_INV_DB database
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running at: http://localhost:${process.env.PORT}`, dateString()) //^ dateString shows date and time for when the app connected to the DB
        })
        console.log("Connected to MongoDB", `DATABASE: ${process.env.DATABASE_NAME}`, dateString())
    })
    .catch((error) =>{
        console.log(error)
    })



