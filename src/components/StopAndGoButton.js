import React, { useState, useEffect } from 'react'
import { FaPlay, FaStop, FaPause } from 'react-icons/fa'

// StopAndGoButton component for starting and stopping the timer
const StopAndGoButton = ({ start, setStart }) => {
  const [className, setClassName] = useState('button btn-stop-and-go')
  const [playing, setPlaying] = useState(false)

  const onClickStopAndGo = () => {
    setStart(!start)
    setPlaying(!playing)
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
