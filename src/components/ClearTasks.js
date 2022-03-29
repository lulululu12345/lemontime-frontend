import React from 'react'

const ClearTasks = ({ setTasks }) => {
  
  const handleClearTasks = () => {
    setTasks([])
  }

  return (
    <button onClick={handleClearTasks} >Clear Task List</button>
  )
}

export default ClearTasks