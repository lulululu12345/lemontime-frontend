import React, { useState, useEffect } from 'react'
import TimeBlockButton from './TimeBlockButton'
import Timer from './Timer'
import TransportCtrl from './TransportCtrl'
import SkipButton from './SkipButton'
import StopAndGoButton from './StopAndGoButton'
import ResetButton from './ResetButton'

import { FaRegLemon, FaLemon } from 'react-icons/fa'

import './TimerContainer.css'




const FocusIcon = () => {
  return (
    <span><FaRegLemon size='12'/></span>
  )
}

const FocusIconComplete = () => {
  return (
    <span><FaLemon size='12'/></span>
  )
}

const TimerContainer = ({ start, setStart, currentTimeBlock, setCurrentTimeBlock, time, setTime, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog, selectedTask, setSelectedTask, tasks, setTasks }) => {
  const [focusIcons, setFocusIcons] = useState([])

  const completedFocusBlocks = log.workCompleted % longBreakInterval

  useEffect(() => {
    if (completedFocusBlocks === 0) {
      setFocusIcons(Array.from(Array(Number(longBreakInterval))).map((item, index) => 
        <FocusIcon
          key={index}
          className={'focus-icon'}
        />
      ))
    }
    if (completedFocusBlocks > 0) {
      setFocusIcons(focusIcons.map((item, index) => {
        console.log('index', index)
        // focus-icon-complete
        // if the index of item is less than completedFocusBlocks
        if (index < completedFocusBlocks) {
          console.log('if evaluated to true')
          return <FocusIconComplete key={index}/>
        }
        else return <FocusIcon key={index}/>
      }))
    }
  }, [completedFocusBlocks, longBreakInterval])

  return (
    <div className='timer-frame'>
      <p className='focus-text'>Focus:</p>
      <div className='focusBlock-container'>
        {focusIcons}
      </div>
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
            time={time}
            setTime={setTime} 
            pomodoro={pomodoro} 
            shortBreak={shortBreak} 
            longBreak={longBreak} 
            longBreakInterval={longBreakInterval} 
          />
        </div>
      </div>
    </div>
  )
}

export default TimerContainer