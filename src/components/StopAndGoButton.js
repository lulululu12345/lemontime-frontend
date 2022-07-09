import React, { useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

// StopAndGoButton component for starting and stopping the timer
const StopAndGoButton = ({ runWorker, start, setStart }) => {
  const [className, setClassName] = useState('button btn-stop-and-go')

  const onClickStopAndGo = () => {
    if (start === false) {
      runWorker('start-timer')
      setStart(true)
    } else if (start === true) {
      runWorker('stop-timer')
      setStart(false)
    }
  }
  
  useEffect(() => {
    start ? setClassName('button btn-stop-and-go btn-stop') : setClassName('button btn-stop-and-go')
  }, [start])

  return (
    <>
      <button onClick={onClickStopAndGo} className={className}>{start ? <FaPause /> : <FaPlay />}</button>
    </>
  ) 
}

export default StopAndGoButton
