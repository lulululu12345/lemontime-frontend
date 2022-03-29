import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import LoadTemplate from './LoadTemplate'
import SaveTemplate from './SaveTemplate'

const TaskOptions = ({ user, tasks, setTasks }) => {
  return (
    <div>
      <LoadTemplate 
        setTasks={setTasks}
      />
      <SaveTemplate
        user={user}
        tasks={tasks} 
      />
    </div>
  )
}

export default TaskOptions