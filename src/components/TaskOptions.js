import React from 'react'
import LoadTemplate from './LoadTemplate'
import SaveTemplate from './SaveTemplate'
import ClearTasks from './ClearTasks'

const TaskOptions = ({ user, tasks, setTasks }) => {
  return (
    <div>
      <LoadTemplate 
        user={user}
        setTasks={setTasks}
      />
      <SaveTemplate
        user={user}
        tasks={tasks} 
      />
      <ClearTasks
      setTasks={setTasks}
      />
    </div>
  )
}

export default TaskOptions