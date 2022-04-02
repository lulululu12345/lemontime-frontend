import React from 'react'
import TimeBlockButton from './TimeBlockButton'
import Timer from './Timer'
import TransportCtrl from './TransportCtrl'

import './TimerContainer.css'

const TimerContainer = ({ start, setStart, currentTimeBlock, setCurrentTimeBlock, time, setTime, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog, selectedTask, setSelectedTask, tasks, setTasks }) => {

  return (
    
    <div className='timerContainer'>
      {/* <TimeBlocks
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
      /> */}
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        newBlock={pomodoro}
        text='Pomodoro'
      />
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        newBlock={shortBreak}
        text='Short Break'
      />
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        newBlock={longBreak}
        text='Long Break'
      />
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
      <TransportCtrl
        start={start}
        setStart={setStart}
        time={time}
        setTime={setTime}
        currentTimeBlock={currentTimeBlock}
        setCurrentTimeBlock={setCurrentTimeBlock}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        longBreakInterval={longBreakInterval}
        log={log}
        setLog={setLog}
      />
    </div>
  )
}

export default TimerContainer