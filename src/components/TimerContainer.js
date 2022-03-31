import React from 'react'
import TimeBlocks from './TimeBlocks'
import Timer from './Timer'
import TransportCtrl from './TransportCtrl'

import './TimeContainer.css'

const TimerContainer = ({ start, setStart, currentTimeBlock, setCurrentTimeBlock, time, setTime, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog, selectedTask, setSelectedTask, tasks, setTasks }) => {

  return (
    
    <div className='timecontainer'>
      <TimeBlocks
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
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