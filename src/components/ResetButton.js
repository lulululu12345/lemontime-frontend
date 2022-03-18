import React from 'react'

// ResetButton component for resetting timer
const ResetButton = ({ time, setTime, setStart, currentTimeBlock }) => {
  const onClickReset = () => {
    setTime(currentTimeBlock.durMs)
    setStart(false)
  }
  
  return (
    <>
      {time < currentTimeBlock.durMs
        ? <button onClick={onClickReset}>Reset</button>
        : <></>
      }
    </>
  )
}

export default ResetButton
