import React, { useState, useEffect } from 'react'
import './TaskContainer.css'

const TaskContainer = ({ selectedTask, setSelectedTask, tasks, setTasks }) => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  // Figure out how to hide the add button
  return (
    <div>
      <h2>Tasks</h2>
      <Tasks 
        tasks={tasks}  
        selectedTask={selectedTask} 
        setSelectedTask={setSelectedTask}
      />
      <TaskForm 
        showTaskForm={showTaskForm} 
        setShowTaskForm={setShowTaskForm} 
        tasks={tasks} 
        setTasks={setTasks} 
      />
    </div>  
  )
}

const TaskForm = ({ showTaskForm, setShowTaskForm, tasks, setTasks }) => {
  const [taskName, setTaskName] = useState('')
  const [taskDur, setTaskDur] = useState(1)
  const [taskNote, setTaskNote] = useState('')

  const handleNameChange = (event) => {
    const eventValue = event.target.value
    setTaskName(eventValue)
  }

  const handleDurChange = (event) => {
    const eventValue = event.target.value
    setTaskDur(eventValue)
  }

  const handleNoteChange = (event) => {
    const eventValue = event.target.value
    setTaskNote(eventValue)
  }

  const toggleForm = () => {
    setShowTaskForm(!showTaskForm)
  }

  const submitTaskForm = (event) => {
    event.preventDefault()

    const newTask = {
      name: taskName,
      dur: taskDur,
      blocksCompleted: 0,
      note: taskNote
    }

    setTasks(tasks.concat(newTask))
    setTaskName('')
    setTaskDur(1)
    setTaskNote('')
    setShowTaskForm(false)
  }
  if (showTaskForm) {
    return (
      <div>
        <form onSubmit={submitTaskForm} >
          <input type='text' placeholder='Task Name' value={taskName} onChange={handleNameChange} required />
          <br/>
          <label>Task Duration</label>
          <br/>
          <input type='number' min='1' max='999' value={taskDur} onChange={handleDurChange} />
          <br/>
          <input type='textarea' placeholder='Notes' value={taskNote} onChange={handleNoteChange} />
          <br/>
          <input type='submit' value='Save' />
        </form>
        <button onClick={toggleForm} >Cancel</button>
      </div>
    )
  }
  return <button onClick={toggleForm}>Add</button>
}

const Tasks = ({tasks, selectedTask, setSelectedTask}) => {
  // SELECTEDTASK STATE MUST REACH THIS POINT
  // const [selectedTask, setSelectedTask] = useState(false)

  const listTasks = tasks.map((task) => {
    return (
      <TaskCard 
        key={task.name} 
        taskName={task.name} 
        taskDur={task.dur} 
        taskNote={task.note} 
        blocksCompleted={task.blocksCompleted} 
        selectedTask={selectedTask} 
        setSelectedTask={setSelectedTask} 
      />
    ) 
  })
  return (
    <div>
      {listTasks}
    </div>
  )
}

const TaskCard = ({ taskName, taskDur, taskNote, blocksCompleted, selectedTask, setSelectedTask }) => {
  
  const onCardClick = (event) => {
    const eventId = event.target.id
    setSelectedTask(eventId)
  }
  
  let className = 'taskCard'
  if (selectedTask === taskName) className += ' taskCard-selected'

  return (
    <div className={className} onClick={onCardClick} id={taskName} >
      <h3 id={taskName}>{taskName}</h3>
      <p id={taskName}>{blocksCompleted}/{taskDur}</p>
      <p id={taskName}>{taskNote}</p>
    </div>
  )
}

export default TaskContainer