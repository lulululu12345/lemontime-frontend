import React from 'react'

// StopAndGoButton component for starting and stopping the timer
const StopAndGoButton = ({ start, setStart }) => {
  const onClickStopAndGo = () => {
    setStart(!start)
  }

  return (
    <button onClick={onClickStopAndGo} className='button stopAndGoButton'>{start ? 'Stop' : 'Start'}</button>
  ) 
}

export default StopAndGoButton
