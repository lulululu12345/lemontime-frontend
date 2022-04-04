import React from 'react'

const ClearTasks = ({ setTasks }) => {
  
  const handleClearTasks = () => {
    setTasks([])
  }

  return (
    <div className='dropdown-content-option' onClick={handleClearTasks}>
      <p>Clear Task List</p>
      {/* <button className='button_task-options'  >Clear Task List</button> */}
    </div>
  )
}

export default ClearTasks