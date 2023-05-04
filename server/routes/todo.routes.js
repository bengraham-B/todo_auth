require("dotenv").config()
const express = require('express')
const router = express.Router()

const { 
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    getURL} = require('../controllers/todo.controller.js')

//*GET all todo
router.get("/", getAllTodos)

//* CREATE a todo
router.post("/", createTodo)

//TODO UPDATE a todo
router.put("/update", updateTodo)

//! DELETE a todo - Uses the URL to pass data to the backend, id is a query.
router.delete("/:id", deleteTodo)

//~ URL -> Testing using the url for passing data to the backend.
router.get("/test", getURL)

module.exports = router
