import React, { useState, useEffect } from 'react'
import TimeBlockButton from './TimeBlockButton'
import Timer from './Timer'
import SkipButton from './SkipButton'
import StopAndGoButton from './StopAndGoButton'
import ResetButton from './ResetButton'
import { useTimer } from '../useTimer'

import { FaRegLemon, FaLemon } from 'react-icons/fa'




const FocusIcon = () => {
  return (
    <span className='icon-focus-lemon'><FaRegLemon /></span>
  )
}

const FocusIconComplete = () => {
  return (
    <span className='icon-focus-lemon'><FaLemon /></span>
  )
}

const TimerContainer = ({ runWorker }) => {
  
  const { start, 
          setStart, 
          currentTimeBlock, 
          setCurrentTimeBlock, 
          time, 
          setTime, 
          pomodoro, 
          shortBreak, 
          longBreak, 
          autoBreak, 
          autoPomodoro, 
          longBreakInterval, 
          log, 
          setLog, 
          selectedTask, 
          setSelectedTask, 
          tasks, 
          setTasks } = useTimer()

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
        // focus-icon-complete
        // if the index of item is less than completedFocusBlocks
        if (index < completedFocusBlocks) {
          return <FocusIconComplete key={index}/>
        }
        else return <FocusIcon key={index}/>
      }))
    }
  }, [completedFocusBlocks, longBreakInterval])

  return (
    <div className='wrap-timer-frame'>
      <p className='text-focus-icons'>Focus:</p>
      <div className='wrap-focus-icons'>
        {focusIcons}
      </div>
      <div className='card-timer-container'>
        <div className='wrap-pomodoro'>
          <TimeBlockButton
            setStart={setStart}
            setTime={setTime}
            currentTimeBlock={currentTimeBlock}
            setCurrentTimeBlock={setCurrentTimeBlock}
            newBlock={pomodoro}
            text='Pomodoro'
          />
        </div>
        <div className='wrap-short-break'>
          <TimeBlockButton
            setStart={setStart}
            setTime={setTime}
            currentTimeBlock={currentTimeBlock}
            setCurrentTimeBlock={setCurrentTimeBlock}
            newBlock={shortBreak}
            text='Short Break'
          />
        </div>
        <div className='wrap-long-break'>
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
        <div className='wrap-reset'>
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
          runWorker={runWorker}
        />
        <div className='wrap-skip'>
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