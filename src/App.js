import React, { useState, useEffect } from 'react'

const App = () => {
  // Phony Database
  const tasks = ['taskA', 'taskB', 'taskC']
  // Duration in milliseconds for different tasks
  const pomodoro = { name: 'pomodoro', duration: 1500000 }
  const shortBreak = { name: 'shortBreak' , duration: 300000 }
  const longBreak = { name: 'longBreak', duration: 600000}
  
  
  
  
  return (
    <div className='App'>
      <span>
      <Settings 
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
      />
      </span>
      <span>
      </span>
      <h1>Timer</h1>
      <TimerContainer 
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        />
    </div>
  )
}

const Settings = ({ pomodoro, shortBreak, longBreak }) => {
  const [showSettings, setShowSettings] = useState(false)
  
  const onClickSettings = () => {
    setShowSettings(!showSettings)
  }

  if (showSettings === false) {
    return (
      <button onClick={onClickSettings}>Settings</button>
    )
  }
  if (showSettings === true) {
    return (
      <div>
        <h2>Settings</h2>
        <div>
          <h3>Timer</h3>
          <ul style={{listStyleType: 'none'}}>
            <li>{`Pomodoro ${pomodoro.duration / 60000}:00`}</li>
            <li>{`Short Break ${shortBreak.duration / 60000}:00`}</li>
            <li>{`Long Break ${longBreak.duration / 60000}:00`}</li>
          </ul>
        </div>
        <button onClick={onClickSettings}>Close</button>
      </div>
    )
  }
}

const Tasks = (props) => {
  // State hooks
  const [showTasks, setShowTasks] = useState(false)
  
  // Toggle task display
  const onClickTasks = () => {
    setShowTasks(!showTasks)
  }

  if (showTasks === false) {
    return (
      <button onClick={onClickTasks}>Tasks</button>
      )
    }
    return (
      <div>
      <div>
        <h3>Tasks</h3>
        <ul style={{listStyleType: 'none'}}>
          {props.tasks.map(task => <li key={task}>{task}</li>)}
        </ul>
      </div>
      <button onClick={onClickTasks}>Close</button>
    </div>
  )
}

const TimerContainer = ({ pomodoro, shortBreak, longBreak }) => {
  // State hooks
  const [currentTask, setCurrentTask] = useState(pomodoro)
  const [time, setTime] = useState(currentTask.duration)
  const [start, setStart] = useState(false)
  const [completed, setCompleted] = useState(0)

  return (
    <div>
      <TaskButtons 
        setStart={setStart}
        setTime={setTime}
        setCurrentTask={setCurrentTask}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
      />
      <Timer 
        time={time}
        setTime={setTime}
        start={start}
        setStart={setStart}
        setCompleted={setCompleted}
        currentTask={currentTask}
      />
      <TransportButtons 
        setStart={setStart}
        setTime={setTime}
        currentTask={currentTask}
      />
      <div>
        {`Completed: ${completed}`}
      </div>
    </div>
  )
}

const TaskButtons = ({ setStart, setTime, setCurrentTask, pomodoro, shortBreak, longBreak }) => {
  return (
    <div>
      <button onClick={() => {setStart(false); setTime(pomodoro.duration); setCurrentTask(pomodoro);}}>Pomodoro</button>
      <button onClick={() => {setStart(false); setTime(shortBreak.duration); setCurrentTask(shortBreak);}}>Short Break</button>
      <button onClick={() => {setStart(false); setTime(longBreak.duration); setCurrentTask(longBreak);}}>Long Break</button>
    </div>
  )
}

const Timer = ({ time, setTime, start, setStart, setCompleted, currentTask }) => {
    // Effect hook to stop countdown upon reaching zero
    useEffect(() => {
      if (time === 0) {
        setStart(false)
      }
      if (time === 0 && currentTask.name === 'pomodoro') {
        setCompleted(prev => prev + 1)
      }
    }, [time, currentTask])

    // Effect hook for the clock, updated by start state
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
    <>
      <h2>
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          {/* <span>{('0' + (time / 10) % 1000).slice(-2)}</span> */}
      </h2>
    </>
  )
}

const TransportButtons = ({ setStart, setTime, currentTask }) => {
  return (
    <div>
      <button onClick={() => setStart(true)}>Start</button>
      <button onClick={() => setStart(false)}>Stop</button>
      <button onClick={() => {setTime(currentTask.duration); setStart(false);}}>Reset</button>
    </div>
  )
}

export default App
