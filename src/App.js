import React, { useState, useEffect } from 'react'
import TimerContainer from './components/TimerContainer'

const App = () => {
  // Phony Database
  const tasks = ['taskA', 'taskB', 'taskC']
  // Duration in milliseconds for different tasks
  const [pomodoro, setPomodoro] = 
    useState({ 
      name: 'pomodoro',
      type: 'work', 
      durMins: 25, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
  const [shortBreak, setShortBreak] = 
    useState({ 
      name: 'shortBreak', 
      type: 'break',
      durMins: 5, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
  const [longBreak, setLongBreak] = 
    useState({ 
      name: 'longBreak', 
      type: 'break',
      durMins: 10, 
      get durMs(){
        return this.durMins * 60000
      } 
    })

  const [currentTask, setCurrentTask] = useState(pomodoro)
  const [time, setTime] = useState(currentTask.durMillis)
  const [start, setStart] = useState(false)
  const [autoBreak, setAutoBreak] = useState(false)
  const [autoPomodoro, setAutoPomodoro] = useState(false)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [log, setLog] = 
    useState({
      workCompleted: 0,
      blocksCompleted: []
    })

  return (
    <div className='App'>
      <span>
      <Settings 
        pomodoro={pomodoro}
        setPomodoro={setPomodoro}
        shortBreak={shortBreak}
        setShortBreak={setShortBreak}
        longBreak={longBreak}
        setLongBreak={setLongBreak}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        time={time}
        setTime={setTime}
        start={start}
        setStart={setStart}
        autoBreak={autoBreak}
        setAutoBreak={setAutoBreak}
        autoPomodoro={autoPomodoro}
        setAutoPomodoro={setAutoPomodoro}
        longBreakInterval={longBreakInterval}
        setLongBreakInterval={setLongBreakInterval}
      />
      </span>
      <span>
      </span>
      <h1>Timer</h1>
      <TimerContainer 
        start={start}
        setStart={setStart}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        time={time}
        setTime={setTime}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        autoBreak={autoBreak}
        autoPomodoro={autoPomodoro}
        longBreakInterval={longBreakInterval}
        log={log}
        setLog={setLog}
      />
    </div>
  )
}

const Settings = ({ start, setStart, currentTask, setCurrentTask, time, setTime, pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, autoBreak, setAutoBreak, autoPomodoro, setAutoPomodoro, longBreakInterval, setLongBreakInterval }) => {
  // State hooks
  const [showSettings, setShowSettings] = useState(false)
  const [pomodoroValue, setPomodoroValue] = useState(25)
  const [shortBreakValue, setShortBreakValue] = useState(5)
  const [longBreakValue, setLongBreakValue] = useState(10)
  const [autoBreakCheckbox, setAutoBreakCheckbox] = useState('false')
  const [autoPomodoroCheckbox, setAutoPomodoroCheckbox] = useState('false')
  const [formSubmit, setFormSubmit] = useState(false)
  const [longBreakIntervalValue, setLongBreakIntervalValue] = useState(4)
  // Handler function for settings button. Used to toggle display of settings popup window.
  const onClickSettings = () => {
    setShowSettings(!showSettings)
    setPomodoroValue(pomodoro.durMins)
    setShortBreakValue(shortBreak.durMins)
    setLongBreakValue(longBreak.durMins)
  }
  
  // Handler for changes to pomodoro slider
  const handlePomodoroChange = (event) => {
    const eventValue = Number(event.target.value)
    setPomodoroValue(eventValue)
  }
  // Handler for changes to shortBreak slider
  const handleShortBreakChange = (event) => {
    const eventValue = Number(event.target.value)
    setShortBreakValue(eventValue)
  }
  // Handler for changes to longBreak slider
  const handleLongBreakChange = (event) => {
    const eventValue = Number(event.target.value)
    setLongBreakValue(eventValue)
  }
  // Handler for auto break checkbox
  const handleAutoBreakChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue === 'true') return setAutoBreakCheckbox('false')
    if (eventValue === 'false') return setAutoBreakCheckbox('true')
  }
  // Handler for auto pomodoro checkbox
  const handleAutoPomodoroChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue === 'true') return setAutoPomodoroCheckbox('false')
    if (eventValue === 'false') return setAutoPomodoroCheckbox('true')
  }

  const handleLongBreakIntervalChange = (event) => {
    const eventValue = event.target.value;
    setLongBreakIntervalValue(eventValue)
  }

  // Handler for settings form submission.
  const onSubmitSettings = (event) => {
    event.preventDefault()
    setStart(false)

    setPomodoro({ 
      name: 'pomodoro',
      type: 'work',
      durMins: pomodoroValue, 
      get durMs(){
        return this.durMins * 60000
      } 
    })

    setShortBreak({ 
      name: 'shortBreak',
      type: 'break',
      durMins: shortBreakValue, 
      get durMs(){
        return this.durMins * 60000
      } 
    })

    setLongBreak({ 
      name: 'longBreak',
      type: 'break',
      durMins: longBreakValue, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
    
    // setAutoRun(autoRunCheckboxValue)
    const runConditional = () => {
      (autoBreakCheckbox === 'true') ? setAutoBreak(true) : setAutoBreak(false);
      (autoPomodoroCheckbox === 'true') ? setAutoPomodoro(true) : setAutoPomodoro(false);
    }

    runConditional()

    setLongBreakInterval(longBreakIntervalValue)

    setFormSubmit(true)
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    if (currentTask.name === 'pomodoro') {
      setCurrentTask(pomodoro)
      setTime(pomodoro.durMs)
    }
    if (currentTask.name === 'shortBreak') {
      setCurrentTask(shortBreak)
      setTime(shortBreak.durMs)
    }
    if (currentTask.name === 'longBreak') {
      setCurrentTask(longBreak)
      setTime(longBreak.durMs)
    }
    setFormSubmit(false)
  }, [formSubmit])

  // Conditional rendering
  if (showSettings === false) {
    return (
      <button onClick={onClickSettings}>Settings</button>
    )
  }
  if (showSettings === true) {
    return (
      <div>
        <h2>Settings</h2>
        <h3>Time(minutes)</h3>
        <form onSubmit={onSubmitSettings}>
          <label>Pomodoro</label>
          <br/>
          <input type='number' min='0' value={pomodoroValue} onChange={handlePomodoroChange} />
          <br/>
          <label>Short Break</label>
          <br/>
          <input type='number' min='0' value={shortBreakValue} onChange={handleShortBreakChange} />
          <br/>
          <label>Long Break</label>
          <br/>
          <input type='number' min='0' value={longBreakValue} onChange={handleLongBreakChange} />
          <br/>
          <label>Auto run Breaks</label>
          <input type='checkbox' value={autoBreakCheckbox} onChange={handleAutoBreakChange} checked={(autoBreakCheckbox === 'true') ? true : false} />
          <br/>
          <label>Auto run Pomodoros</label>
          <input type='checkbox' value={autoPomodoroCheckbox} onChange={handleAutoPomodoroChange} checked={(autoPomodoroCheckbox === 'true') ? true : false} />
          <br/>
          <label>Long Break interval</label>
          <input type='number' value={longBreakIntervalValue} onChange={handleLongBreakIntervalChange} />
          <br/>
          <input type='submit' value='Save' />
        </form>
          <button onClick={onClickSettings}>Close</button>
      </div>
    )
  }
}

// const TimerContainer = ({ start, setStart, currentTask, setCurrentTask, time, setTime, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog }) => {

//   return (
//     <div>
//       <TaskButtons 
//         setStart={setStart}
//         setTime={setTime}
//         setCurrentTask={setCurrentTask}
//         pomodoro={pomodoro}
//         shortBreak={shortBreak}
//         longBreak={longBreak}
//       />
//       <Timer 
//         time={time}
//         setTime={setTime}
//         start={start}
//         setStart={setStart}
//         currentTask={currentTask}
//         setCurrentTask={setCurrentTask}
//         pomodoro={pomodoro}
//         shortBreak={shortBreak}
//         longBreak={longBreak}
//         autoBreak={autoBreak}
//         autoPomodoro={autoPomodoro}
//         longBreakInterval={longBreakInterval}
//         log={log}
//         setLog={setLog}
//       />
//       <TransportButtons
//         start={start}
//         setStart={setStart}
//         setTime={setTime}
//         currentTask={currentTask}
//       />
//     </div>
//   )
// }

// const TaskButtons = ({ setStart, setTime, setCurrentTask, pomodoro, shortBreak, longBreak }) => {
//   return (
//     <div>
//       <button onClick={() => {setStart(false); setTime(pomodoro.durMs); setCurrentTask(pomodoro);}}>Pomodoro</button>
//       <button onClick={() => {setStart(false); setTime(shortBreak.durMs); setCurrentTask(shortBreak);}}>Short Break</button>
//       <button onClick={() => {setStart(false); setTime(longBreak.durMs); setCurrentTask(longBreak);}}>Long Break</button>
//     </div>
//   )
// }
// const Timer = ({ time, setTime, start, setStart, setCompleted, currentTask, setCurrentTask, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog }) => {
//   // Effect hook to stop countdown upon reaching zero
//   useEffect(() => {
//     if (time === 0) {
//       setStart(false)
//       setLog({
//         workCompleted: log.workCompleted + 1,
//         blocksCompleted: log.blocksCompleted.concat(currentTask)
//       })
//     }
//     if (time === 0 && currentTask.type === 'work') {
//       if (log.workCompleted % longBreakInterval === 0) {
//         setTime(longBreak.durMs)
//         setCurrentTask(longBreak)
//       } 
//       else {
//         setTime(shortBreak.durMs)
//         setCurrentTask(shortBreak)
//       }
//       if (autoBreak === true) {
//         setStart (true)
//       }
//     }
//     if (time === 0 && currentTask.type ==='break' && autoPomodoro === true) {
//       setTime(pomodoro.durMs)
//       setCurrentTask(pomodoro)
//       if (autoPomodoro === true) {
//         setStart (true)
//       }
//     }
//   }, [time, currentTask])

//   // Effect hook for the decrementing timer every setInterval
//   useEffect(() => {
//     let interval = null

//     if (start) {
//       interval = setInterval(() => {
//         setTime(prevTime => prevTime - 10)
//       }, 10)
//     } else {
//       clearInterval(interval)
//     }

//     return () => clearInterval(interval)
//   }, [start])

//   return (
//     <>
//       <h2>
//           <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
//           <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
//           {/* <span>{('0' + (time / 10) % 1000).slice(-2)}</span> */}
//       </h2>
//     </>
//   )
// }

// const TransportButtons = ({ start, setStart, setTime, currentTask }) => {

//   const startStopOnClick = () => {
//     setStart(!start)
//   }

//   return (
//     <div>
//       <button onClick={startStopOnClick}>{start ? 'Stop' : 'Start'}</button>
//       <button onClick={() => {setTime(currentTask.durMs); setStart(false);}}>Reset</button>
//     </div>
//   )
// }

export default App
