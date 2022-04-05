import React, { useState, useEffect } from 'react'
import { FaPlay, FaStop, FaPause } from 'react-icons/fa'

// StopAndGoButton component for starting and stopping the timer
const StopAndGoButton = ({ start, setStart }) => {
  const [className, setClassName] = useState('button stopAndGoButton')
  const onClickStopAndGo = () => {
    setStart(!start)
  }

  useEffect(() => {
    start ? setClassName('button stopAndGoButton stopAndGoStopper') : setClassName('button stopAndGoButton')
  }, [start])

  return (
    <button onClick={onClickStopAndGo} className={className}>{start ? <FaPause/> : <FaPlay/>}</button>
  ) 
}

export default StopAndGoButton
