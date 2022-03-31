import React, { useState } from 'react'
import taskService from '../services/tasks'

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
    if (!login) {
      const newTask = {
        tempId: Math.floor(Math.random() * Date.now()),
        name: taskNameAdd,
        dur: taskDurAdd,
        note: taskNoteAdd,
        blocksCompleted: 0
      }
      setTasks(tasks.concat(newTask))
    }


    if (login) {
      const newTask = {
        name: taskNameAdd,
        dur: taskDurAdd,
        note: taskNoteAdd,
        blocksCompleted: 0
      }
      
      taskService
        .create(newTask)
        .then(response => {
          setTasks(tasks.concat(response.data))
        })
    }

    setTaskNameAdd('')
    setTaskDurAdd(1)
    setTaskNoteAdd('')
    setShowTaskForm(false)
  }
  if (showTaskForm) {
    return (
      <div>
        <form onSubmit={submitTaskForm} >
          <input type='text' placeholder='Task Name' value={taskNameAdd} onChange={handleNameChange} required />
          <br/>
          <label>Task Duration</label>
          <br/>
          <input type='number' min='1' max='999' value={taskDurAdd} onChange={handleDurChange} />
          <br/>
          <input type='textarea' placeholder='Notes' value={taskNoteAdd} onChange={handleNoteChange} />
          <br/>
          <input type='submit' value='Save' />
        </form>
        <button onClick={toggleForm} >Cancel</button>
      </div>
    )
  }
  return <button onClick={toggleForm}>Add</button>
}

export default AddTask