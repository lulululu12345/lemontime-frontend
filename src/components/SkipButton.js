import React, { useState, useEffect } from 'react'

// SkipButton component for skipping to the next time block
const SkipButton = ({ start, setStart, currentTask, setCurrentTask, log, setLog, setTime, pomodoro, shortBreak, longBreak, longBreakInterval }) => {
  const [skip, setSkip] = useState(false)

  const onClickSkip = () => {
    setStart(false)
    if (currentTask.type === 'work') {
      setLog({
        workCompleted: log.workCompleted + 1,
        blocksCompleted: log.blocksCompleted
      })
    }
    if (currentTask.type === 'break') {
      setLog({
        workCompleted: log.workCompleted,
        blocksCompleted: log.blocksCompleted
      })
    }
    setSkip(true)
  }

  useEffect(() => {
    if (skip === true && currentTask.type === 'work') {
      if (log.workCompleted % longBreakInterval === 0) {
        setTime(longBreak.durMs)
        setCurrentTask(longBreak)
      } 
      else {
        setTime(shortBreak.durMs)
        setCurrentTask(shortBreak)
      }
    }
    if (skip === true && currentTask.type === 'break') {
      setTime(pomodoro.durMs)
      setCurrentTask(pomodoro)
    }
    setSkip(false)
  }, [skip])
  
  return (
    <>
      {start
        ? <button onClick={onClickSkip}>Skip</button>
        : <></>
      }
    </>
  )
}

export default SkipButton
