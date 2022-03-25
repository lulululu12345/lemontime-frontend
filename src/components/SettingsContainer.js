import React, { useState, useEffect } from 'react'
import FocusDurationInput from './FocusDurationInput'
import LongBreakSchedule from './LongBreakSchedule'
import AutoRunBox from './AutoRunBox'

const SettingsContainer = ({ setStart, currentTimeBlock, setCurrentTimeBlock, setTime, pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, setAutoBreak, setAutoPomodoro, longBreakInterval, setLongBreakInterval }) => {
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
    setLongBreakIntervalValue(longBreakInterval)
    setAutoBreakCheckbox(JSON.parse(localStorage.getItem('autoBreak')))
    setAutoPomodoroCheckbox(JSON.parse(localStorage.getItem('autoPomodoro')))
  }

  // When the settings are saved
  const onSubmitSettings = (event) => {
    // Prevent default form submission behaviour
    event.preventDefault()
    // Stop the timer
    setStart(false)
    // Store form values in localStorage
    localStorage.setItem('pomodoro', JSON.stringify(pomodoroValue))
    localStorage.setItem('shortBreak', JSON.stringify(shortBreakValue))
    localStorage.setItem('longBreak', JSON.stringify(longBreakValue))
    localStorage.setItem('longBreakInterval', JSON.stringify(longBreakIntervalValue))
    localStorage.setItem('autoBreak', JSON.stringify(autoBreakCheckbox))
    localStorage.setItem('autoPomodoro', JSON.stringify(autoPomodoroCheckbox))
    // Set the pomodoro prop to a new object using the duration value supplied in the settings form
    setPomodoro({ 
      name: 'pomodoro',
      type: 'work',
      // durMins set to value supplied in pomodoro number box
      durMins: pomodoroValue, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
    // Set the shortBreak prop to a new object using the duration value supplied in the settings form
    setShortBreak({ 
      name: 'shortBreak',
      type: 'break',
      // durMins set to value supplied in shortBreak number box
      durMins: shortBreakValue, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
    // Set the longBreak prop to a new object using the duration value supplied in the settings form
    setLongBreak({ 
      name: 'longBreak',
      type: 'break',
      // durMins set to value supplied in longBreak number box
      durMins: longBreakValue, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
    
    // If either auto-run box was checked, set the corresponding prop to match
    const runConditional = () => {
      (autoBreakCheckbox === 'true') ? setAutoBreak(true) : setAutoBreak(false);
      (autoPomodoroCheckbox === 'true') ? setAutoPomodoro(true) : setAutoPomodoro(false);
    }
    // Call the above function
    runConditional()
    // set the long break interval to the value supplied in the settings form
    setLongBreakInterval(longBreakIntervalValue)
    // setFormSubmit to trigger render of the effect below
    setFormSubmit(true)
    // Make the settings form disappear
    setShowSettings(!showSettings)
  }
  // After the settings form submission, timer display is updated with the new duration supplied in the settings form
  useEffect(() => {
    // Check currentTimeBlock to ensure the proper timeBlock duration is displayed
    if (currentTimeBlock.name === 'pomodoro') {
      // Update currentTimeBlock prop with the new poomodoro object
      setCurrentTimeBlock(pomodoro)
      setTime(pomodoro.durMs)
    }
    // Check currentTimeBlock to ensure the proper timeBlock duration is displayed
    if (currentTimeBlock.name === 'shortBreak') {
      // Update currentTimeBlock prop with the new shortBreak object
      setCurrentTimeBlock(shortBreak)
      setTime(shortBreak.durMs)
    }
    // Check currentTimeBlock to ensure the proper timeBlock duration is displayed
    if (currentTimeBlock.name === 'longBreak') {
      // Update currentTimeBlock prop with the new longBreak object
      setCurrentTimeBlock(longBreak)
      setTime(longBreak.durMs)
    }
    // Prepare for future form submissions by resetting formSubmit to false
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
          <FocusDurationInput numBoxValue={pomodoroValue}   setNumBoxValue={setPomodoroValue}   labelText='Pomodoro' />
          <FocusDurationInput numBoxValue={shortBreakValue} setNumBoxValue={setShortBreakValue} labelText='Short Break' />
          <FocusDurationInput numBoxValue={longBreakValue}  setNumBoxValue={setLongBreakValue}  labelText='Long Break' />
          <LongBreakSchedule longBreakIntervalValue={longBreakIntervalValue} setLongBreakIntervalValue={setLongBreakIntervalValue} />
          <AutoRunBox checkboxValue={autoBreakCheckbox}    setCheckboxValue={setAutoBreakCheckbox}    labelText={'Auto Run Breaks'} />
          <AutoRunBox checkboxValue={autoPomodoroCheckbox} setCheckboxValue={setAutoPomodoroCheckbox} labelText={'Auto Run Pomodoros'} />
          <input type='submit' value='Save' />
        </form>
          <button onClick={onClickSettings}>Close</button>
      </div>
    )
  }
}

export default SettingsContainer