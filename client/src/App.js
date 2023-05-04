import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//& Importing SASS style sheets
import "./styles/styles.css"

//^ Importing Components
import Header from './components/Header/Header'
import AddTodo from './components/AddTodo/AddTodo'
import TodoElement from './components/TodoElement/TodoElement'

export default function App() {

	const refreshCount_Redux = useSelector((state) => state.todo.refreshCount)

	//^ Importing the array from REDUX.

	const [response, setResponse] = useState()

	const dispatch = useDispatch()

	//^ Fetching todos from the API
	useEffect(() => {
		fetch("/api/todos")
		.then(res => res.json())
		.then((data) => {
		setResponse(data)
		console.log(data.todosGet)
		console.log(data.todosGet[0])

	  })

	},[refreshCount_Redux])
  	return (
    	<div id="App">

			<div className="header-container">
				<Header/>
			</div>

			<div className="add-todo-container">
				<AddTodo/>
			</div>

			<div className="todo-element-container">
				{response?.todosGet && response.todosGet.map((todo) => (
					<TodoElement details={todo.details} created={todo.created} _id={todo._id}/>
					
				))}

			</div>

		</div>
  	)
}
