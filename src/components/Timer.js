import React, { useState, useEffect } from 'react'

const Timer = ({ time, setTime, start, setStart, setCompleted, currentTask, setCurrentTask, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog }) => {
  // Effect hook to stop countdown upon reaching zero
  useEffect(() => {
    if (time === 0) {
      setStart(false)
      if (currentTask.type === 'work') {
        setLog({
          workCompleted: log.workCompleted + 1,
          blocksCompleted: log.blocksCompleted.concat(currentTask)
        })
      }
      if (currentTask.type === 'break') {
        setLog({
          workCompleted: log.workCompleted,
          blocksCompleted: log.blocksCompleted.concat(currentTask)
        })
      }
    }
  }, [time, currentTask])

  useEffect(() => {
    // This if statement manages the automatic setting of the timer to the appropriate Break Time Block
    if (time === 0 && currentTask.type === 'work') {       
      if (log.workCompleted % longBreakInterval === 0) {
        setTime(longBreak.durMs)
        setCurrentTask(longBreak)
      } 
      else {
        setTime(shortBreak.durMs)
        setCurrentTask(shortBreak)
      }
      if (autoBreak === true) {
        setStart (true)
      }
    }
    // This if statement manages the automatic
    if (time === 0 && currentTask.type === 'break') {
      setTime(pomodoro.durMs)
      setCurrentTask(pomodoro)
      if (autoPomodoro === true) {
        setStart (true)
      }
    }
  }, [log])

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

export default Timer