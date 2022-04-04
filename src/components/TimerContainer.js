import React, { useState } from 'react'
import TimeBlockButton from './TimeBlockButton'
import Timer from './Timer'
import TransportCtrl from './TransportCtrl'
import SkipButton from './SkipButton'
import StopAndGoButton from './StopAndGoButton'
import ResetButton from './ResetButton'

import './TimerContainer.css'

const TimerContainer = ({ start, setStart, currentTimeBlock, setCurrentTimeBlock, time, setTime, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog, selectedTask, setSelectedTask, tasks, setTasks }) => {
  return (
    <div className='timerContainer'>
      <div className='pomodoro-wrapper'>
        <TimeBlockButton
          setStart={setStart}
          setTime={setTime}
          currentTimeBlock={currentTimeBlock}
          setCurrentTimeBlock={setCurrentTimeBlock}
          newBlock={pomodoro}
          text='Pomodoro'
        />
      </div>
      <div className='shortBreak-wrapper'>
        <TimeBlockButton
          setStart={setStart}
          setTime={setTime}
          currentTimeBlock={currentTimeBlock}
          setCurrentTimeBlock={setCurrentTimeBlock}
          newBlock={shortBreak}
          text='Short Break'
        />
      </div>
      <div className='longBreak-wrapper'>
        <TimeBlockButton
          setStart={setStart}
          setTime={setTime}
          currentTimeBlock={currentTimeBlock}
          setCurrentTimeBlock={setCurrentTimeBlock}
          newBlock={longBreak}
          text='Long Break'
        />
      </div>
      <Timer
        time={time}
        setTime={setTime}
        start={start}
        setStart={setStart}
        currentTimeBlock={currentTimeBlock}
        setCurrentTimeBlock={setCurrentTimeBlock}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        autoBreak={autoBreak}
        autoPomodoro={autoPomodoro}
        longBreakInterval={longBreakInterval}
        log={log}
        setLog={setLog}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
      />
      <div className='reset-wrapper'>
        <ResetButton 
          time={time} 
          setTime={setTime} 
          setStart={setStart} 
          currentTimeBlock={currentTimeBlock} 
        />
      </div>
      <StopAndGoButton 
        start={start}
        setStart={setStart}
      />
      <div className='skip-wrapper'>
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
    </div>
  )
}

export default TimerContainer