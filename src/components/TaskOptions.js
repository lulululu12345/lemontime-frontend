import React, { useState } from 'react'
import LoadTemplate from './LoadTemplate'
import SaveTemplate from './SaveTemplate'
import ClearTasks from './ClearTasks'
import { BsThreeDots } from 'react-icons/bs'

const TaskOptions = ({ user, tasks, setTasks }) => {
  const [dropdownContent, setDropdownContent] = useState('wrap-dropdown-content')
  const [toggleError, setToggleError] = useState(false)

  const handleShowSettings = () => {
    if ( dropdownContent === 'wrap-dropdown-content') {
      return setDropdownContent(`${dropdownContent} wrap-show-dropdown-content`)
    }
    return setDropdownContent('wrap-dropdown-content')
  }

  return (
    <div className='wrap-dropdown'>
      <button className='btn-dropdown' onClick={handleShowSettings}><BsThreeDots/></button>
      <div className={dropdownContent}>
        <LoadTemplate 
          user={user}
          setTasks={setTasks}
          toggleError={toggleError}
          setToggleError={setToggleError}
        />
        <SaveTemplate
          user={user}
          tasks={tasks} 
          toggleError={toggleError}
          setToggleError={setToggleError}
        />
        <ClearTasks
        setTasks={setTasks}
        />
      </div>
    </div>
  )
}

export default TaskOptions