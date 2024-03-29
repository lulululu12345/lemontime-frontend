import React, { useEffect, useState } from 'react'

const Timer = ({ time, setTime, start, setStart, currentTimeBlock, setCurrentTimeBlock, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog, selectedTask, setSelectedTask, tasks, setTasks, runWorker }) => {
  // Stop countdown when timer reaches zero and add completed TimeBlock to log
  useEffect(() => {
    // If the time prop has reached 0 (timer has completed)
    if (time === 0) {
      // Stop the timer
      runWorker('stop-timer')
      setStart(false)
      // If the timer just completed a pomodoro
      if (currentTimeBlock.type === 'work') {
        // Iterate over the tasks array, find the selected task and increase the blocksCompleted value by one
        setTasks(tasks.map(task => {
          if (task.name === selectedTask) {
            return {
              id: task.id,
              name: task.name,
              dur: task.dur,
              blocksCompleted: task.blocksCompleted += 1,
              note: task.note
            }
          }
          else return task
        }))
        // Add one to the log's workCompleted property and add the current task object to the blocksCompleted array with concat
        setLog({
          workCompleted: log.workCompleted + 1,
          blocksCompleted: log.blocksCompleted.concat(currentTimeBlock)
        })
      }
      // If the timer just completed a short or long break
      if (currentTimeBlock.type === 'break') {
        // Add the current task object to the log's blocksCompleted array without changing the workCompleted value
        setLog({
          workCompleted: log.workCompleted,
          blocksCompleted: log.blocksCompleted.concat(currentTimeBlock)
        })
      }
    }
  }, [time, currentTimeBlock])

  // Effect for setting the Timer to a new task after the timer has completed and the log prop has been updated
  useEffect(() => {
    // If the timer completes a pomodoro
    if (time === 0 && currentTimeBlock.type === 'work') {  
      // Check to see if it is time for a long break 
      if (log.workCompleted % longBreakInterval === 0) {
        // Set the time prop to the long break duration in ms
        setTime(longBreak.durMs)
        // Set the current task to long break
        setCurrentTimeBlock(longBreak)
      } 
      // If it isn't time for a long break, it must be time for a short one
      else {
        // Set the time prop to the short break duration in ms
        setTime(shortBreak.durMs)
        // Set the current task to short break
        setCurrentTimeBlock(shortBreak)
      }
      // If the auto break setting is turned on
      if (autoBreak === true) {
        // Set the start prop to true to automatically start the break timer
        setStart (true)
      }
    }
    // If the timer completes a break
    if (time === 0 && currentTimeBlock.type === 'break') {
      // Set the time prop to the pomodoro duration in ms
      setTime(pomodoro.durMs)
      // Set the current task to pomodoro
      setCurrentTimeBlock(pomodoro)
      // If the auto pomodoro setting is turned on
      if (autoPomodoro === true) {
        // Set the start prop to true to automatically start the pomodoro timer
        setStart (true)
      }
    }
  }, [log])

  // Convert the time props millisecond value to minutes
  const calcMinutes = () => {
    if (Math.floor(time / 60000) >= 100) {
      return ('0' + Math.floor(time / 60000)).slice(-3)
    }
    return ('0' + Math.floor(time / 60000)).slice(-2)
  }

  // Convert the time props millisecond value to seconds
  const calcSeconds = () => {
    return ('0' + Math.floor((time / 1000) % 60)).slice(-2)
  }

  if (start) {
    document.title = (`${calcMinutes()}:${calcSeconds()} - Lemontime`)
  } else {
    document.title = 'Lemontime'
  }

  // Display the time props remaining minutes and seconds
  return (
    <>
      <div className='wrap-time-display'>
        <h2 className='heading-time-display'>{`${calcMinutes()}:${calcSeconds()}`}</h2>
      </div>
    </>
  )
}

export default Timer
