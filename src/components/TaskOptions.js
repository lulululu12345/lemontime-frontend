import React from 'react'
import LoadTemplate from './LoadTemplate'
import SaveTemplate from './SaveTemplate'
import ClearTasks from './ClearTasks'

import './TaskOptions.css'

const TaskOptions = ({ user, tasks, setTasks }) => {
  return (
    <div className='dropdown'>
      <button className='dropbtn'>...</button>
      <div className='dropdown-content'>
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
    </div>
  )
}

export default TaskOptions