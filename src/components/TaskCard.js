import React from 'react'
import EditTask from './EditTask'

const TaskCard = ({ taskName, taskDur, taskNote, blocksCompleted, selectedTask, setSelectedTask, tasks, setTasks, taskId }) => {


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
      <EditTask 
        taskId={taskId}
        tasks={tasks}
        setTasks={setTasks}
        taskNameEdit={taskName}
        taskName={taskName}
        taskDur={taskDur}
        taskNote={taskNote}

      />
    </div>
  )
}

export default TaskCard