import React, { useState } from 'react'
import EditTask from './EditTask'

const TaskCard = ({ taskName, taskDur, taskNote, blocksCompleted, selectedTask, setSelectedTask, tasks, setTasks, taskId }) => {
  const [showTaskForm, setShowTaskForm] = useState(false)

  const onCardClick = (event) => {
    const eventId = event.target.id
    setSelectedTask(eventId)
  }

  const onEditClick = () => {
    setShowTaskForm(true)
  }
  
  let className = 'taskCard'
  if (selectedTask === taskName) className += ' taskCard-selected'

  if (showTaskForm) {
    return (
      <div className={className} onClick={onCardClick} id={taskName} >
        <EditTask 
          taskId={taskId}
          tasks={tasks}
          setTasks={setTasks}
          taskNameEdit={taskName}
          taskName={taskName}
          taskDur={taskDur}
          taskNote={taskNote}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
        />
      </div>
    )
  }
  else {
    return (
      <div className={className} onClick={onCardClick} id={taskName} >
        <h3 id={taskName}>{taskName}</h3>
        <p id={taskName}>{blocksCompleted}/{taskDur}</p>
        <p id={taskName}>{taskNote}</p>
        <button onClick={onEditClick} >Edit</button>
      </div>
    )
  }
}

export default TaskCard