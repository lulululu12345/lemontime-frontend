import React, { useState, useEffect } from 'react'

const App = () => {
  // Phony Database
  const todo = ['taskA', 'taskB', 'taskC']
  // Duration in milliseconds for different tasks
  const pomodoro = { name: 'pomodoro', duration: 1500000 }
  const shortBreak = { name: 'shortBreak' , duration: 300000 }
  const longBreak = { name: 'longBreak', duration: 600000}
  // State hooks
  const [currentTask, setCurrentTask] = useState(pomodoro)
  const [time, setTime] = useState(currentTask.duration)
  const [start, setStart] = useState(false)
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    if (time === 0) {
      setStart(false)
    }
    if (time === 0 && currentTask.name === 'pomodoro') {
      setCompleted(prev => prev + 1)
    }
  }, [time, currentTask])

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
        <button onClick={() => {setStart(false); setTime(pomodoro.duration); setCurrentTask(pomodoro);}}>Pomodoro</button>
        <button onClick={() => {setStart(false); setTime(shortBreak.duration); setCurrentTask(shortBreak);}}>Short Break</button>
        <button onClick={() => {setStart(false); setTime(longBreak.duration); setCurrentTask(longBreak);}}>Long Break</button>
      </div>
      <h2>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        {/* <span>{('0' + (time / 10) % 1000).slice(-2)}</span> */}
      </h2>
      <div>
        <button onClick={() => setStart(true)}>Start</button>
        <button onClick={() => setStart(false)}>Stop</button>
        <button onClick={() => {setTime(currentTask.duration); setStart(false);}}>Reset</button>
      </div>
      <div>
        {`Completed: ${completed}`}
      </div>
    </div>
  )
}

export default App
