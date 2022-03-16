import React, { useState, useEffect } from 'react'

const TransportCtrl = ({ start, setStart, setTime, currentTask }) => {

  const startStopOnClick = () => {
    setStart(!start)
  }

  return (
    <div>
      <button onClick={startStopOnClick}>{start ? 'Stop' : 'Start'}</button>
      <button onClick={() => {setTime(currentTask.durMs); setStart(false);}}>Reset</button>
    </div>
  )
}

export default TransportCtrl