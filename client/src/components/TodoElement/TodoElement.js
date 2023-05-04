import React, { useState } from 'react'

//^ Importing REDUX
import { useDispatch } from 'react-redux'
import { refresh } from '../../store/todo'

export default function TodoElement(props) {
    const dispatch = useDispatch()

    //^State variables
    const [update, setUpdate] = useState(false) //^ Toogle beteewn converting the details to an input and back to the new updated details.
    const [updateValue, setUpdateValue] = useState()

    //^ using '_id' as I am working with the MongoDB assigned id.
    //^ This onClick function will be responsible for deleteing the todo when they are marked as compete
    //!Delete Todo
    const handleComplete = async (_id) => {
        console.log(_id)

        const res = await fetch(`/api/todos/${_id}`, {method: "DELETE"})
    
        const json = await res.json()
        dispatch(refresh())

        console.log(res)

    }
    
    const handleUpdate = (_id) => {
        setUpdate(true)
    }

    const handleSave = async (_id) =>{
        setUpdate(false)
        console.log(_id, updateValue)
        console.log('updateValue', updateValue)
        await fetch(`api/todos/update?id=${_id}&newDetails=${updateValue}`, {method:"PUT"})
            .then((res) => console.log(res))

        dispatch(refresh())
        
    }
    
    const handleSave_cancel = async () =>{
        setUpdate(false)
    }

  return (
    <div id="TodoElement">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        <div className="left">

            <div className="details-container">
                <h1>
                    {/* This input is displayed when the user chooses to edit the todo. */}
                    {update ? <input  classname="change-details" onChange={(e) => {setUpdateValue(e.target.value)}}/> : <h3>{props.details}</h3>}
                </h1>
            </div>

            <div className="created-at-container">
                <h3>{props.created}</h3>
            </div>

        </div>
        <div className="right">
            <div className="button-container">
                { update ? <></> :<button onClick={() => handleComplete(props._id)}><span class="material-symbols-outlined">done</span></button>}
                {
                    update ? 
                    //^ Displays this button, so the user can save the update todo. will execute thr update CRUD function.
                    <>
                        <button onClick={() => handleSave(props._id)}><span class="material-symbols-outlined">save_as</span></button> 
                        <button onClick={() => handleSave_cancel(props._id)}><span class="material-symbols-outlined">close</span></button> 
                    </>
                        :
                        <button onClick={() => handleUpdate(props._id)}><span class="material-symbols-outlined">edit</span></button>
                }
            </div>

        </div>

    </div>
  )
}
