import React, { useState, useEffect } from 'react'
import FocusDurationInput from './FocusDurationInput'
import LongBreakSchedule from './LongBreakSchedule'
import AutoRunBox from './AutoRunBox'
import { useTimer } from '../useTimer'

import { CgClose } from 'react-icons/cg'

const SettingsContainer = () => {
  // state from useTimer hook
  const { autoBreak, 
          autoPomodoro, 
          currentTimeBlock, 
          setCurrentTimeBlock, 
          setTime, 
          pomodoro, 
          shortBreak, 
          longBreak, 
          longBreakInterval } = useTimer()
  // State hooks
  const [showSettings, setShowSettings] = useState(false)
  const [pomodoroValue, setPomodoroValue] = useState('25')
  const [shortBreakValue, setShortBreakValue] = useState('5')
  const [longBreakValue, setLongBreakValue] = useState('10')
  const [longBreakIntervalValue, setLongBreakIntervalValue] = useState('4')
  const [autoBreakCheckbox, setAutoBreakCheckbox] = useState('false')
  const [autoPomodoroCheckbox, setAutoPomodoroCheckbox] = useState('false')
  const [formSubmit, setFormSubmit] = useState(false)

  // Handler function for settings button. Used to toggle display of settings popup window.
  const onClickSettings = () => {
    setShowSettings(!showSettings)
    setPomodoroValue(pomodoro.durMins)
    setShortBreakValue(shortBreak.durMins)
    setLongBreakValue(longBreak.durMins)
    setLongBreakIntervalValue(longBreakInterval)
    setAutoBreakCheckbox(`${autoBreak}`)
    setAutoPomodoroCheckbox(`${autoPomodoro}`)
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

  return (
    <>
      <button className='link-button' onClick={onClickSettings}>Settings</button>
      {showSettings && <SettingsForm 
        pomodoroValue={pomodoroValue}
        setPomodoroValue={setPomodoroValue} 
        shortBreakValue={shortBreakValue}
        setShortBreakValue={setShortBreakValue}
        longBreakValue={longBreakValue}
        setLongBreakValue={setLongBreakValue}
        longBreakIntervalValue={longBreakIntervalValue}
        setLongBreakIntervalValue={setLongBreakIntervalValue}
        autoBreakCheckbox={autoBreakCheckbox}
        autoPomodoroCheckbox={autoPomodoroCheckbox}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
        setAutoBreakCheckbox={setAutoBreakCheckbox} 
        setAutoPomodoroCheckbox={setAutoPomodoroCheckbox}
        onClickSettings={onClickSettings}
        formSubmit={formSubmit}
        setFormSubmit={setFormSubmit}
      />}
    </>
  )
}

const SettingsForm = ({ setFormSubmit, pomodoroValue, setPomodoroValue, shortBreakValue, setShortBreakValue, longBreakValue, setLongBreakValue, longBreakIntervalValue, setLongBreakIntervalValue, setShowSettings, showSettings, autoBreakCheckbox, setAutoBreakCheckbox, autoPomodoroCheckbox, setAutoPomodoroCheckbox, onClickSettings }) => {
  const [invalidInput, setInvalidInput] = useState(false)
  // state from useTimer hook
  const { setStart, 
          setPomodoro, 
          setShortBreak, 
          setLongBreak, 
          setAutoBreak, 
          setAutoPomodoro, 
          setLongBreakInterval } = useTimer()
  // When the settings are saved
  const onSubmitSettings = (event) => {
    // Prevent default form submission behaviour
    event.preventDefault()
    // Stop the timer
    setStart(false)
    if (Number(pomodoroValue) < 1 || Number(shortBreakValue) < 1 || Number(longBreakValue) < 1 || Number(longBreakIntervalValue) < 1) {
      return setInvalidInput(true)
    }
    // Store form values in localStorage
    localStorage.setItem('pomodoro', JSON.stringify(pomodoroValue))
    localStorage.setItem('shortBreak', JSON.stringify(shortBreakValue))
    localStorage.setItem('longBreak', JSON.stringify(longBreakValue))
    localStorage.setItem('longBreakInterval', JSON.stringify(longBreakIntervalValue))

    // checkbox values are stored as strings, turn them into a boolean true or false before putting in local storage
    const checkBoxBoolean = box => (box === 'true') ? true : false
    localStorage.setItem('autoBreak', JSON.stringify(checkBoxBoolean(autoBreakCheckbox)))
    localStorage.setItem('autoPomodoro', JSON.stringify(checkBoxBoolean(autoPomodoroCheckbox)))
    // Set the pomodoro prop to a new object using the duration value supplied in the settings form
    setPomodoro({ 
      name: 'pomodoro',
      type: 'work',
      // durMins set to value supplied in pomodoro number box
      durMins: Number(pomodoroValue), 
      get durMs(){
        return this.durMins * 60000
      } 
    })
    // Set the shortBreak prop to a new object using the duration value supplied in the settings form
    setShortBreak({ 
      name: 'shortBreak',
      type: 'break',
      // durMins set to value supplied in shortBreak number box
      durMins: Number(shortBreakValue), 
      get durMs(){
        return this.durMins * 60000
      } 
    })
    // Set the longBreak prop to a new object using the duration value supplied in the settings form
    setLongBreak({ 
      name: 'longBreak',
      type: 'break',
      // durMins set to value supplied in longBreak number box
      durMins: Number(longBreakValue), 
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
    setLongBreakInterval(Number(longBreakIntervalValue))
    // setFormSubmit to trigger render of the effect below
    setFormSubmit(true)
    // Make the settings form disappear
    setShowSettings(!showSettings)
  }
  
  return (
    <div className='popup'>
        <div className='popup-inner'>
          <form className='form-settings-container' onSubmit={onSubmitSettings}>

            <h2 className='heading-settings'>Settings</h2>
            
            {invalidInput && <p className='text-submission-error'>All time blocks must be given a value!</p>}

            <h3 className='heading-settings-sub'>Time</h3>

            <div className='wrap-settings-item'>
              <label className='input-label-settings' >Pomodoro</label>
              <FocusDurationInput numBoxValue={pomodoroValue}   setNumBoxValue={setPomodoroValue} setInvalidInput={setInvalidInput}   labelText='Pomodoro'/>
            </div>

            <div className='wrap-settings-item'>
              <label className='input-label-settings'>Short Break</label>
              <FocusDurationInput numBoxValue={shortBreakValue} setNumBoxValue={setShortBreakValue} setInvalidInput={setInvalidInput} labelText='Short Break'/>
            </div>

            <div className='wrap-settings-item'>
              <label className='input-label-settings'>Long Break</label>
              <FocusDurationInput numBoxValue={longBreakValue}  setNumBoxValue={setLongBreakValue} setInvalidInput={setInvalidInput}  labelText='Long Break'/>
            </div>
            
            <div className='wrap-settings-item section-end'>
              <label className='input-label-settings' >Long Break Interval</label>
              <LongBreakSchedule longBreakIntervalValue={longBreakIntervalValue} setLongBreakIntervalValue={setLongBreakIntervalValue}/>  
            </div>

            <h3 className='heading-settings-sub'>Upon Completion</h3>

            <div className='wrap-settings-item'>  
              <label className='input-label-settings'>Auto Run Breaks</label>
              <AutoRunBox className='input-settings input-settings-checkbox' checkboxValue={autoBreakCheckbox}    setCheckboxValue={setAutoBreakCheckbox}    labelText={'Auto Run Breaks'} />
            </div>
            
            <div className='wrap-settings-item section-end'>
              <label className='input-label-settings' >Auto Run Pomodoros</label>
              <AutoRunBox className='input-settings input-settings-checkbox' checkboxValue={autoPomodoroCheckbox} setCheckboxValue={setAutoPomodoroCheckbox} labelText={'Auto Run Pomodoros'} />
            </div>

            <input className='btn-submit' type='submit' value='Save' />
          </form>
            <button className='btn-close btn-login-close' onClick={onClickSettings}><CgClose size={14}/></button>
        </div>
      </div>
  )
}

export default SettingsContainer