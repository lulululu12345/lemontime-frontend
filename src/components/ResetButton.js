import React from 'react'

// ResetButton component for resetting timer
const ResetButton = ({ time, setTime, setStart, currentTask }) => {
  const onClickReset = () => {
    setTime(currentTask.durMs)
    setStart(false)
  }
  
  return (
    <>
      {time < currentTask.durMs
        ? <button onClick={onClickReset}>Reset</button>
        : <></>
      }
    </>
  )
}

export default ResetButton
