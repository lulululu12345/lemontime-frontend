import React, { useEffect } from 'react'

const Timer = ({ time, setTime, start, setStart, currentTask, setCurrentTask, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog }) => {
  // Effect hook to stop countdown upon reaching zero and update log prop
  useEffect(() => {
    // If the time prop has reached 0 (timer has completed)
    if (time === 0) {
      // Stop the timer
      setStart(false)
      // If the timer just completed a pomodoro
      if (currentTask.type === 'work') {
        // Add one to the log's workCompleted property and add the current task object to the blocksCompleted array with concat
        setLog({
          workCompleted: log.workCompleted + 1,
          blocksCompleted: log.blocksCompleted.concat(currentTask)
        })
      }
      // If the timer just completed a short or long break
      if (currentTask.type === 'break') {
        // Add the current task object to the log's blocksCompleted array without changing the workCompleted value
        setLog({
          workCompleted: log.workCompleted,
          blocksCompleted: log.blocksCompleted.concat(currentTask)
        })
      }
    }
  }, [time, currentTask])

  // Effect for setting the Timer to a new task after the timer has completed and the log prop has been updated
  useEffect(() => {
    // If the timer completes a pomodoro
    if (time === 0 && currentTask.type === 'work') {  
      // Check to see if it is time for a long break 
      if (log.workCompleted % longBreakInterval === 0) {
        // Set the time prop to the long break duration in ms
        setTime(longBreak.durMs)
        // Set the current task to long break
        setCurrentTask(longBreak)
      } 
      // If it isn't time for a long break, it must be time for a short one
      else {
        // Set the time prop to the short break duration in ms
        setTime(shortBreak.durMs)
        // Set the current task to short break
        setCurrentTask(shortBreak)
      }
      // If the auto break setting is turned on
      if (autoBreak === true) {
        // Set the start prop to true to automatically start the break timer
        setStart (true)
      }
    }
    // If the timer completes a break
    if (time === 0 && currentTask.type === 'break') {
      // Set the time prop to the pomodoro duration in ms
      setTime(pomodoro.durMs)
      // Set the current task to pomodoro
      setCurrentTask(pomodoro)
      // If the auto pomodoro setting is turned on
      if (autoPomodoro === true) {
        // Set the start prop to true to automatically start the pomodoro timer
        setStart (true)
      }
    }
  }, [log])

  // Effect hook for the decrementing timer every setInterval
  useEffect(() => {
    // Create an interval variable outside setInterval so that it will also be accessible to the return (unmount) statement at the end of the effect
    let interval = null
    // If the timer has been started
    if (start) {
      // Set the interval variable to a setInterval function which runs every 10 milliseconds
      interval = setInterval(() => {
        // Set the new time prop value by subtracting ten milliseconds from the previously stored value
        setTime(prevTime => prevTime - 10)
      }, 10)
    } 
    // If start is false, i.e. if the timer has been stopped, clear the interval so that it ceases to run
    else {
      clearInterval(interval)
    }
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [start])

  // Convert the time props millisecond value to minutes
  const calcMinutes = () => {
    return ('0' + Math.floor((time / 60000) % 60)).slice(-2)
  }

  // Convert the time props millisecond value to seconds
  const calcSeconds = () => {
    return ('0' + Math.floor((time / 1000) % 60)).slice(-2)
  }
  
  // Display the time props remaining minutes and seconds
  return <h2>{`${calcMinutes()}:${calcSeconds()}`}</h2>
}

export default Timer
