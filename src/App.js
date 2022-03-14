import React, { useState, useEffect } from 'react'

const App = () => {
  // Phony Database
  const tasks = ['taskA', 'taskB', 'taskC']
  // Duration in milliseconds for different tasks
  const [pomodoro, setPomodoro] = 
    useState({ 
      name: 'pomodoro', 
      durMins: 25, 
      get durMillis(){
        return this.durMins * 60000
      } 
    })
  const [shortBreak, setShortBreak] = 
    useState({ 
      name: 'shortBreak', 
      durMins: 5, 
      get durMillis(){
        return this.durMins * 60000
      } 
    })
  const [longBreak, setLongBreak] = 
    useState({ 
      name: 'longBreak', 
      durMins: 10, 
      get durMillis(){
        return this.durMins * 60000
      } 
    })

  const [currentTask, setCurrentTask] = useState(pomodoro)
  const [time, setTime] = useState(currentTask.durMillis)
  const [start, setStart] = useState(false)
  const [autoRun, setAutoRun] = useState(false)
  const [log, setLog] = 
  useState({
    pomodoros: 0,
    shortBreaks: 0,
    longBreaks: 0
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
        autoRun={autoRun}
        setAutoRun={setAutoRun}
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
        />
    </div>
  )
}

const Settings = ({ start, setStart, currentTask, setCurrentTask, time, setTime, pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, autoRun, setAutoRun }) => {
  // State hooks
  const [showSettings, setShowSettings] = useState(false)
  const [pomodoroSliderValue, setPomodoroSliderValue] = useState(25)
  const [shortBreakSliderValue, setShortBreakSliderValue] = useState(5)
  const [longBreakSliderValue, setLongBreakSliderValue] = useState(10)
  const [autoRunCheckboxValue, setAutoRunCheckboxValue] = useState('false')
  const [formSubmit, setFormSubmit] = useState(false)
  // Handler function for settings button. Used to toggle display of settings popup window.
  const onClickSettings = () => {
    setShowSettings(!showSettings)
  }
  
  // Handler for changes to pomodoro slider
  const handlePomodoroChange = (event) => {
    const eventValue = Number(event.target.value)
    setPomodoroSliderValue(eventValue)
  }
  // Handler for changes to shortBreak slider
  const handleShortBreakChange = (event) => {
    const eventValue = Number(event.target.value)
    setShortBreakSliderValue(eventValue)
  }
  // Handler for changes to longBreak slider
  const handleLongBreakChange = (event) => {
    const eventValue = Number(event.target.value)
    setLongBreakSliderValue(eventValue)
  }
  // Handler for auto-run checkbox
  const handleAutoRunChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue === 'true') return setAutoRunCheckboxValue('false')
    if (eventValue === 'false') return setAutoRunCheckboxValue('true')
  }

  // Handler for settings form submission.
  const onSubmitSettings = (event) => {
    event.preventDefault()
    setStart(false)

    setPomodoro({ 
      name: 'pomodoro', 
      durMins: pomodoroSliderValue, 
      get durMillis(){
        return this.durMins * 60000
      } 
    })

    setShortBreak({ 
      name: 'shortBreak', 
      durMins: shortBreakSliderValue, 
      get durMillis(){
        return this.durMins * 60000
      } 
    })

    setLongBreak({ 
      name: 'longBreak', 
      durMins: longBreakSliderValue, 
      get durMillis(){
        return this.durMins * 60000
      } 
    })
    
    // setAutoRun(autoRunCheckboxValue)
    const runConditional = () => {
      (autoRunCheckboxValue === 'true') ? setAutoRun(true) : setAutoRun(false);
    }

    runConditional()

    setFormSubmit(true)
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    if (currentTask.name === 'pomodoro') {
      setCurrentTask(pomodoro)
      setTime(pomodoro.durMillis)
    }
    if (currentTask.name === 'shortBreak') {
      setCurrentTask(shortBreak)
      setTime(shortBreak.durMillis)
    }
    if (currentTask.name === 'longBreak') {
      setCurrentTask(longBreak)
      setTime(longBreak.durMillis)
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
        <form onSubmit={onSubmitSettings}>
          <label>Pomodoro: {pomodoroSliderValue}</label>
          <br/>
          <input type='range' min='25' max='50' value={pomodoroSliderValue} onChange={handlePomodoroChange} />
          <br/>
          <label>Short Break: {shortBreakSliderValue}</label>
          <br/>
          <input type='range' min='5' max='10' value={shortBreakSliderValue} onChange={handleShortBreakChange} />
          <br/>
          <label>Long Break: {longBreakSliderValue}</label>
          <br/>
          <input type='range' min='10' max='20' value={longBreakSliderValue} onChange={handleLongBreakChange} />
          <br/>
          <input type='checkbox' value={autoRunCheckboxValue} onChange={handleAutoRunChange} checked={(autoRunCheckboxValue === 'true') ? true : false} />
          <label>Auto-run task blocks</label>
          <br/>
          <input type='submit' value='Save' />
        </form>
          <button onClick={onClickSettings}>Close</button>
      </div>
    )
  }
}

const TimerContainer = ({ start, setStart, currentTask, setCurrentTask, time, setTime, pomodoro, shortBreak, longBreak }) => {
  // State hooks
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
      <button onClick={() => {setStart(false); setTime(pomodoro.durMillis); setCurrentTask(pomodoro);}}>Pomodoro</button>
      <button onClick={() => {setStart(false); setTime(shortBreak.durMillis); setCurrentTask(shortBreak);}}>Short Break</button>
      <button onClick={() => {setStart(false); setTime(longBreak.durMillis); setCurrentTask(longBreak);}}>Long Break</button>
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

  // Effect hook for the decrementing timer every setInterval
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
      <button onClick={() => {setTime(currentTask.durMillis); setStart(false);}}>Reset</button>
    </div>
  )
}

export default App
