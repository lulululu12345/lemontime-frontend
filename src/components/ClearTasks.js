import React from 'react'

const ClearTasks = ({ setTasks }) => {
  
  const handleClearTasks = () => {
    setTasks([])
  }

  return (
    <div className='dropdown-content-option'>
      <button onClick={handleClearTasks} >Clear Task List</button>
    </div>
  )
}

export default ClearTasks