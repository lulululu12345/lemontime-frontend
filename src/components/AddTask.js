import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { BsPlusLg } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'

const AddTask = ({ tasks, setTasks, login }) => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskNameAdd, setTaskNameAdd] = useState('')
  const [taskDurAdd, setTaskDurAdd] = useState(1)
  const [taskNoteAdd, setTaskNoteAdd] = useState('')

  const handleNameChange = (event) => {
    const eventValue = event.target.value
    setTaskNameAdd(eventValue)
  }

  const handleDurChange = (event) => {
    const eventValue = event.target.value
    setTaskDurAdd(eventValue)
  }

  const handleNoteChange = (event) => {
    const eventValue = event.target.value
    setTaskNoteAdd(eventValue)
  }

  const toggleForm = () => {
    setShowTaskForm(!showTaskForm)
  }

  const submitTaskForm = (event) => {
    event.preventDefault()

    const newTask = {
      _id: Math.floor(Math.random() * Date.now()),
      name: taskNameAdd,
      dur: taskDurAdd,
      note: taskNoteAdd,
      blocksCompleted: 0
    }
    setTasks(tasks.concat(newTask))

    setTaskNameAdd('')
    setTaskDurAdd(1)
    setTaskNoteAdd('')
    setShowTaskForm(false)
  }
  if (showTaskForm) {
    return (
      <div className='card-edit-task card-add'>
        <form onSubmit={submitTaskForm} >
          <div className='wrap-edit-task'>
            <div className='wrap-edit-task-mainline'>
              <input className='input-edit-task-heading' type='text' placeholder='Task Name' value={taskNameAdd} onChange={handleNameChange} required/>
              <input className='input-edit-task-duration' type='number' min='1' max='99' value={taskDurAdd} onChange={handleDurChange}/>
            </div>
            <TextareaAutosize className='input-edit-task-notes' placeholder='Notes' value={taskNoteAdd} onChange={handleNoteChange} />
            <input className='input-edit-task-save' type='submit' value='Save'/>
          </div>
        </form>
        <button className='btn-close-addTask' onClick={toggleForm} ><CgClose/></button>
      </div>
    )
  }
  return <button onClick={toggleForm} className='btn-task-container-add'><BsPlusLg size={18} /></button>
}

export default AddTask