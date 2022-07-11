import React, { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import { CgClose } from 'react-icons/cg'

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
    setTasks(tasks.filter(task => task._id !== taskId))
  }

  const submitTaskForm = (event) => {
    event.preventDefault()

    const changedTask = {
      _id: taskId,
      name: taskNameEdit,
      dur: taskDurEdit,
      note: taskNoteEdit,
      blocksCompleted: 0
    }

    setTasks(tasks.map(task => task._id !== taskId ? task : changedTask))


    setTaskNameEdit('')
    setTaskDurEdit(1)
    setTaskNoteEdit('')
    setShowTaskForm(false)
  }

  if (showTaskForm) {
    return (
      <div className='card-edit-task'>
        <form onSubmit={submitTaskForm} >
          <div className='wrap-edit-task'>
            <div className='wrap-edit-task-mainline'>
              <input className='input-edit-task-heading' type='text' placeholder='Task Name' value={taskNameEdit} onChange={handleNameChange} required />
              <input className='input-edit-task-duration' type='number' min='1' max='99' value={taskDurEdit} onChange={handleDurChange} />
            </div>
            <TextareaAutosize className='input-edit-task-notes' placeholder='Notes' value={taskNoteEdit} onChange={handleNoteChange} />
            {/* <input type='textarea' placeholder='Notes' value={taskNoteEdit} onChange={handleNoteChange} /> */}
            <input className='input-edit-task-save' type='submit' value='Save' />
          </div>
        </form>
        <button className='btn-edit-task-delete' onClick={deleteTask} >Delete</button>
        <button className='btn-edit-task-close' onClick={toggleForm} ><CgClose/></button>
      </div>
    )
  }
}

export default EditTask