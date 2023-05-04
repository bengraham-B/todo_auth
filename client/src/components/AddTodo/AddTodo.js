import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { refresh } from '../../store/todo'



export default function AddTodo() {

	const dispatch = useDispatch()

	//^ Setting State variables
	const [addTodo, setAddTodo] = useState()

	
	const handleAddTodo = async (req, res) => {
		dispatch(refresh())
		const postTodo = await fetch(`/api/todos?details=${addTodo}`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			}
			
		})
		dispatch(refresh())

		setAddTodo("") //^Clearing the input after the user has added a todo.
		res.status(200).json(postTodo)




	}
	return (
		<div id="AddTodo">
			<div className="container">
				<div className="input-container" >
					<input type="text"  value={addTodo} onChange={(e) => setAddTodo(e.target.value)}/>
				</div>
				<div className="button-container">
					<button onClick={handleAddTodo}>Add Todo</button>
				</div>
			</div>
		</div>
	)
}
