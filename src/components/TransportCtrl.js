import React from 'react'
import SkipButton from './SkipButton'
import StopAndGoButton from './StopAndGoButton'
import ResetButton from './ResetButton'

const TransportCtrl = ({ start, setStart, time, setTime, currentTask, setCurrentTask, pomodoro, shortBreak, longBreak, longBreakInterval, log, setLog }) => {
  return (
    <div>
      <ResetButton 
        time={time} 
        setTime={setTime} 
        setStart={setStart} 
        currentTask={currentTask} 
      />
      <StopAndGoButton 
        start={start}
        setStart={setStart}
      />
      <SkipButton 
        start={start} 
        setStart={setStart} 
        currentTask={currentTask} 
        setCurrentTask={setCurrentTask} 
        log={log} 
        setLog={setLog} 
        setTime={setTime} 
        pomodoro={pomodoro} 
        shortBreak={shortBreak} 
        longBreak={longBreak} 
        longBreakInterval={longBreakInterval} 
      />
    </div>
  )
}

export default TransportCtrl
