import React, { useState } from 'react'
import LoadTemplate from './LoadTemplate'
import SaveTemplate from './SaveTemplate'
import ClearTasks from './ClearTasks'
import { BsThreeDots } from 'react-icons/bs'

import './TaskOptions.css'

const TaskOptions = ({ user, tasks, setTasks }) => {
  const [showSettings, setShowSettings] = useState(false)
  const [dropdownContent, showDropdownContent] = useState('dropdown-content')

  const handleShowSettings = () => {
    if ( dropdownContent === 'dropdown-content') {
      return showDropdownContent(`${dropdownContent} show-dropdown-content`)
    }
    return showDropdownContent('dropdown-content')
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