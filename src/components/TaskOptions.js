import React, { useState } from 'react'
import LoadTemplate from './LoadTemplate'
import SaveTemplate from './SaveTemplate'
import ClearTasks from './ClearTasks'
import { BsThreeDots } from 'react-icons/bs'

import './TaskOptions.css'

const TaskOptions = ({ user, tasks, setTasks }) => {
  const [dropdownContent, setDropdownContent] = useState('dropdown-content')

  const handleShowSettings = () => {
    if ( dropdownContent === 'dropdown-content') {
      return setDropdownContent(`${dropdownContent} show-dropdown-content`)
    }
    return setDropdownContent('dropdown-content')
  }

  return (
    <div className='dropdown'>
      <button className='dropbtn' onClick={handleShowSettings}><BsThreeDots/></button>
      <div className={dropdownContent}>
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