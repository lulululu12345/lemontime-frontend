import React, { useState, useEffect } from 'react'

const SettingsContainer = ({ start, setStart, currentTask, setCurrentTask, time, setTime, pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, autoBreak, setAutoBreak, autoPomodoro, setAutoPomodoro, longBreakInterval, setLongBreakInterval }) => {
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
          <label>Long Break interval</label>
          <br/>
          <input type='number' value={longBreakIntervalValue} onChange={handleLongBreakIntervalChange} />
          <br/>
          <label>Auto run Breaks</label>
          <input type='checkbox' value={autoBreakCheckbox} onChange={handleAutoBreakChange} checked={(autoBreakCheckbox === 'true') ? true : false} />
          <br/>
          <label>Auto run Pomodoros</label>
          <input type='checkbox' value={autoPomodoroCheckbox} onChange={handleAutoPomodoroChange} checked={(autoPomodoroCheckbox === 'true') ? true : false} />
          <br/>
          <input type='submit' value='Save' />
        </form>
          <button onClick={onClickSettings}>Close</button>
      </div>
    )
  }
}

export default SettingsContainer