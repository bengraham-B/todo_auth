const express = require('express')
const mongoose = require('mongoose')

//^ Importing Schema 
const TODO_SCHEMA = require("../model/todo.model.js")


//* GET all todos (MongoDB) 
const getAllTodos = async (req, res) => {
    const todosGet = await TODO_SCHEMA.find({})
    res.status(200).json({todosGet})
}

//* POST a todo (MongoDB)
const createTodo = async (req, res) => {
    try {
        const postTodo = await TODO_SCHEMA.create({
            details: req.query.details
        })
        console.log("<- TODO CREATED ->")
        res.status(200).json(postTodo)

    }catch(err){
        res.status(400).json({err})
    }
}


//* DELETE a todo (MongoDB)
const deleteTodo = async (req, res) => {
    const {id} = req.params
    const todo = await TODO_SCHEMA.findOneAndDelete({_id: id}) //^ Using the TODO's id to find and delete it.    
    res.status(200).json({id})
}

//TODO UPDATE a todo (MongoDB) cant pass the info down to the DB, try again on the front end.
//^ This will take the url of the todo the user would like to update, and replace the current details with the updateDetails(passed into the url)
const updateTodo = async (req, res) => {
    console.log(req.query.id, req.query.newDetails)
    const id = req.query.id //^ Getting the id from the url
    const updateDetails = req.query.newDetails //^ Getting the update information from the url

    const updatedTodo = await TODO_SCHEMA.find({_id: id}).updateOne({details: updateDetails})

    
    res.status(200).json({id, updateDetails})
}

//~ Trying something with URL
const getURL = (req, res) => {
    const name = req.query.name
    const age = req.query.age

    res.status(200).json({name: name, age: age})

}

module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    getURL
}

/*
 * Resources Used:
 * (1) https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client : assited with the issue of "Cannot set headers after they are sent to the client in JS"
 */


// https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client
