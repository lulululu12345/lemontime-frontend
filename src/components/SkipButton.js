import React, { useState, useEffect } from 'react'

// SkipButton component for skipping to the next time block
const SkipButton = ({ start, setStart, currentTimeBlock, setCurrentTimeBlock, log, setLog, setTime, pomodoro, shortBreak, longBreak, longBreakInterval }) => {
  const [skip, setSkip] = useState(false)

  const onClickSkip = () => {
    setStart(false)
    if (currentTimeBlock.type === 'work') {
      setLog({
        workCompleted: log.workCompleted + 1,
        blocksCompleted: log.blocksCompleted
      })
    }
    if (currentTimeBlock.type === 'break') {
      setLog({
        workCompleted: log.workCompleted,
        blocksCompleted: log.blocksCompleted
      })
    }
    setSkip(true)
  }

  useEffect(() => {
    if (skip === true && currentTimeBlock.type === 'work') {
      if (log.workCompleted % longBreakInterval === 0) {
        setTime(longBreak.durMs)
        setCurrentTimeBlock(longBreak)
      } 
      else {
        setTime(shortBreak.durMs)
        setCurrentTimeBlock(shortBreak)
      }
    }
    if (skip === true && currentTimeBlock.type === 'break') {
      setTime(pomodoro.durMs)
      setCurrentTimeBlock(pomodoro)
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
