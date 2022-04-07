import React, { useState, useEffect } from 'react'
import FocusDurationInput from './FocusDurationInput'
import LongBreakSchedule from './LongBreakSchedule'
import AutoRunBox from './AutoRunBox'

import './SettingsContainer.css'

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
      <div className='popup'>
        <div className='popup-inner'>
          <form className='settings-grid-container' onSubmit={onSubmitSettings}>
            <h2 className='settings-header'>Settings</h2>

            <div className='blank1'></div>

            <label className='pomo settings-label'>Pomodoro</label>
            <FocusDurationInput className='pomo-value settings-value' numBoxValue={pomodoroValue}   setNumBoxValue={setPomodoroValue}   labelText='Pomodoro' />

            <label className='sbreak settings-label'>Short Break</label>
            <FocusDurationInput className='sbreak-value settings-value' numBoxValue={shortBreakValue} setNumBoxValue={setShortBreakValue} labelText='Short Break' />

            <label className='lbreak settings-label' >Long Break</label>
            <FocusDurationInput className='lbreak-value settings-value' numBoxValue={longBreakValue}  setNumBoxValue={setLongBreakValue}  labelText='Long Break' />
            
            <label className='lbreak-interval settings-label' >Long Break interval</label>
            <LongBreakSchedule className='lbreak-interval-value settings-value' longBreakIntervalValue={longBreakIntervalValue} setLongBreakIntervalValue={setLongBreakIntervalValue} />
            
            <div className='blank2' ></div>

            <label className='auto-break settings-label' >Auto Run Breaks</label>
            <AutoRunBox className='auto-break-value settings-value' checkboxValue={autoBreakCheckbox}    setCheckboxValue={setAutoBreakCheckbox}    labelText={'Auto Run Breaks'} />
            
            <label className='auto-pomo settings-label' >Auto Run Pomodoros</label>
            <AutoRunBox className='auto-pomo-value settings-value' checkboxValue={autoPomodoroCheckbox} setCheckboxValue={setAutoPomodoroCheckbox} labelText={'Auto Run Pomodoros'} />

            <input className='settings-save' type='submit' value='Save' />
          </form>
            <button className='close-btn' onClick={onClickSettings}>Close</button>
        </div>
      </div>
    )
  }
}

export default SettingsContainer