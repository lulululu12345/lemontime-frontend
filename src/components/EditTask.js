import React, { useState, useEffect } from 'react'
import taskService from '../services/tasks'

const EditTask = ({ tasks, setTasks, taskName, taskDur, taskNote, taskId, showTaskForm, setShowTaskForm, login }) => {
  // const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskNameEdit, setTaskNameEdit] = useState('')
  const [taskDurEdit, setTaskDurEdit] = useState(1)
  const [taskNoteEdit, setTaskNoteEdit] = useState('')

  useEffect(() => {
    if(showTaskForm) {
      setTaskNameEdit(taskName)
      setTaskDurEdit(taskDur)
      setTaskNoteEdit(taskNote)
    }
  }, [showTaskForm])

  const handleNameChange = (event) => {
    const eventValue = event.target.value
    setTaskNameEdit(eventValue)
  }

  const handleDurChange = (event) => {
    const eventValue = event.target.value
    setTaskDurEdit(eventValue)
  }

  const handleNoteChange = (event) => {
    const eventValue = event.target.value
    setTaskNoteEdit(eventValue)
  }

  const toggleForm = () => {
    setShowTaskForm(!showTaskForm)
  }

  const deleteTask = () => {
    console.log(taskId)
    setTasks(tasks.filter(task => task.id !== taskId))

    if (login) {
      taskService
        .remove(taskId)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== taskId))
        })
    }
  }

  const submitTaskForm = (event) => {
    event.preventDefault()

    const changedTask = {
      id: taskId,
      name: taskNameEdit,
      dur: taskDurEdit,
      note: taskNoteEdit,
      blocksCompleted: 0
    }

    setTasks(tasks.map(task => task.id !== taskId ? task : changedTask))

    if (login) {
      taskService
        .update(taskId, changedTask)
        .then(response => {
          setTasks(tasks.map(task => task.id !== taskId ? task : response.data))
        })
    }

    setTaskNameEdit('')
    setTaskDurEdit(1)
    setTaskNoteEdit('')
    setShowTaskForm(false)
  }

  if (showTaskForm) {
    return (
      <div>
        <form onSubmit={submitTaskForm} >
          <input type='text' placeholder='Task Name' value={taskNameEdit} onChange={handleNameChange} required />
          <br/>
          <label>Task Duration</label>
          <br/>
          <input type='number' min='1' max='999' value={taskDurEdit} onChange={handleDurChange} />
          <br/>
          <input type='textarea' placeholder='Notes' value={taskNoteEdit} onChange={handleNoteChange} />
          <br/>
          <input type='submit' value='Save' />
        </form>
        <button onClick={toggleForm} >Cancel</button>
        <button onClick={deleteTask} >Delete</button>
      </div>
    )
  }
}

export default EditTask