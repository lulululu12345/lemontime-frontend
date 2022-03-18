import React from 'react'
import SkipButton from './SkipButton'
import StopAndGoButton from './StopAndGoButton'
import ResetButton from './ResetButton'

const TransportCtrl = ({ start, setStart, time, setTime, currentTimeBlock, setCurrentTimeBlock, pomodoro, shortBreak, longBreak, longBreakInterval, log, setLog }) => {
  return (
    <div>
      <ResetButton 
        time={time} 
        setTime={setTime} 
        setStart={setStart} 
        currentTimeBlock={currentTimeBlock} 
      />
      <StopAndGoButton 
        start={start}
        setStart={setStart}
      />
      <SkipButton 
        start={start} 
        setStart={setStart} 
        currentTimeBlock={currentTimeBlock} 
        setCurrentTimeBlock={setCurrentTimeBlock} 
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
