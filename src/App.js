import React, { useState, useEffect } from 'react'

const App = () => {
  // Duration in milliseconds for different tasks
  const pomodoro = 1500000
  const shortBreak = 5000
  // const shortBreak = 300000
  const longBreak = 600000
  // State hooks
  const [currentTask, setCurrentTask] = useState(pomodoro)
  const [time, setTime] = useState(currentTask)
  const [start, setStart] = useState(false)
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    if (time === 0) {
      setCompleted(prev => prev + 1)
      setStart(false)
    }
  }, [time])

  useEffect(() => {
    let interval = null

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [start])


  return (
    <div className='App'>
      <h1>Timer</h1>
      <div>
        <button onClick={() => {setStart(false); setTime(pomodoro); setCurrentTask(pomodoro);}}>Pomodoro</button>
        <button onClick={() => {setStart(false); setTime(shortBreak); setCurrentTask(shortBreak);}}>Short Break</button>
        <button onClick={() => {setStart(false); setTime(longBreak); setCurrentTask(longBreak);}}>Long Break</button>
      </div>
      <h2>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        {/* <span>{('0' + (time / 10) % 1000).slice(-2)}</span> */}
      </h2>
      <div>
        <button onClick={() => setStart(true)}>Play</button>
        <button onClick={() => setStart(false)}>Pause</button>
        <button onClick={() => {setTime(currentTask); setStart(false);}}>Reset</button>
      </div>
      <div>
        {`Completed: ${completed}`}
      </div>
    </div>
  )
}

export default App
