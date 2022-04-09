import React, { useState, useEffect } from 'react'
import FocusDurationInput from './FocusDurationInput'
import LongBreakSchedule from './LongBreakSchedule'
import AutoRunBox from './AutoRunBox'

import { CgClose } from 'react-icons/cg'
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
  return (
    <>
      <button className='button-link' onClick={onClickSettings}>Settings</button>
      {showSettings
        ? <SettingsForm 
        setStart={setStart}
        pomodoroValue={pomodoroValue}
        setPomodoroValue={setPomodoroValue} 
        shortBreakValue={shortBreakValue}
        setShortBreakValue={setShortBreakValue}
        longBreakValue={longBreakValue}
        setLongBreakValue={setLongBreakValue}
        longBreakIntervalValue={longBreakIntervalValue}
        setLongBreakIntervalValue={setLongBreakIntervalValue}
        longBreakInterval={longBreakInterval}
        autoBreakCheckbox={autoBreakCheckbox}
        autoPomodoroCheckbox={autoPomodoroCheckbox}
        setPomodoro={setPomodoro}
        setShortBreak={setShortBreak}
        setLongBreak={setLongBreak}
        setAutoBreak={setAutoBreak}
        setAutoPomodoro={setAutoPomodoro}
        setLongBreakInterval={setLongBreakInterval}
        formSubmit={formSubmit}
        setFormSubmit={setFormSubmit}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
        currentTimeBlock={currentTimeBlock}
        setCurrentTimeBlock={setCurrentTimeBlock}
        pomodoro={pomodoro}
        setTime={setTime}
        shortBreak={shortBreak}
        longBreak={longBreak}
        setAutoBreakCheckbox={setAutoBreakCheckbox} 
        setAutoPomodoroCheckbox={setAutoPomodoroCheckbox}
        onClickSettings={onClickSettings}
        />
        : <></>
      }
    </>
  )
}

const SettingsForm = ({ setStart, pomodoroValue, setPomodoroValue, shortBreakValue, setShortBreakValue, longBreakValue, setLongBreakValue, longBreakIntervalValue, setLongBreakIntervalValue, longBreakInterval, autoBreakCheckbox, autoPomodoroCheckbox, setPomodoro, setShortBreak, setLongBreak, setAutoBreak, setAutoPomodoro, setLongBreakInterval, formSubmit, setFormSubmit, setShowSettings, showSettings, currentTimeBlock, setCurrentTimeBlock, pomodoro, setTime, shortBreak, longBreak, setAutoBreakCheckbox, setAutoPomodoroCheckbox, onClickSettings }) => {
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


  
  return (
    <div className='popup'>
        <div className='popup-inner settings-popup'>
          <form className='settings-container' onSubmit={onSubmitSettings}>

            <h2 className='settings-header'>Settings</h2>

            <h3 className='settings-section'>Time</h3>

            <div className='settings-item'>
              <label className='settings-label' >Pomodoro</label>
              <FocusDurationInput className='settings-input' numBoxValue={pomodoroValue}   setNumBoxValue={setPomodoroValue}   labelText='Pomodoro'/>
            </div>

            <div className='settings-item'>
              <label className='settings-label'>Short Break</label>
              <FocusDurationInput className='settings-input' numBoxValue={shortBreakValue} setNumBoxValue={setShortBreakValue} labelText='Short Break'/>
            </div>

            <div className='settings-item'>
              <label className='settings-label'>Long Break</label>
              <FocusDurationInput className='settings-input' numBoxValue={longBreakValue}  setNumBoxValue={setLongBreakValue}  labelText='Long Break'/>
            </div>
            
            <div className='settings-item'>
              <label className='settings-label' >Long Break interval</label>
              <LongBreakSchedule className='settings-input' longBreakIntervalValue={longBreakIntervalValue} setLongBreakIntervalValue={setLongBreakIntervalValue}/>  
            </div>

            <h3 className='settings-section'>Upon Completion</h3>

            <div className='settings-item'>  
              <label className='settings-label'>Auto Run Breaks</label>
              <AutoRunBox className='settings-input settings-checkbox' checkboxValue={autoBreakCheckbox}    setCheckboxValue={setAutoBreakCheckbox}    labelText={'Auto Run Breaks'} />
            </div>
            
            <div className='settings-item'>
              <label className='settings-label' >Auto Run Pomodoros</label>
              <AutoRunBox className='settings-input settings-checkbox' checkboxValue={autoPomodoroCheckbox} setCheckboxValue={setAutoPomodoroCheckbox} labelText={'Auto Run Pomodoros'} />
            </div>

            <input className='settings-save' type='submit' value='Save' />
          </form>
            <button className='close-btn settings-close' onClick={onClickSettings}><CgClose size={14}/></button>
        </div>
      </div>
  )
}

export default SettingsContainer