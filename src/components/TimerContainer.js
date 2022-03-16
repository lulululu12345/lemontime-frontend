import React, { useState, useEffect } from 'react'
import TimeBlocks from './TimeBlocks'
import Timer from './Timer'
import TransportCtrl from './TransportCtrl'

const TimerContainer = ({ start, setStart, currentTask, setCurrentTask, time, setTime, pomodoro, shortBreak, longBreak, autoBreak, autoPomodoro, longBreakInterval, log, setLog }) => {

  return (
    <div>
      <TimeBlocks
        setStart={setStart}
        setTime={setTime}
        setCurrentTask={setCurrentTask}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
      />
      <Timer
        time={time}
        setTime={setTime}
        start={start}
        setStart={setStart}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        autoBreak={autoBreak}
        autoPomodoro={autoPomodoro}
        longBreakInterval={longBreakInterval}
        log={log}
        setLog={setLog}
      />
      <TransportCtrl
        start={start}
        setStart={setStart}
        setTime={setTime}
        currentTask={currentTask}
      />
    </div>
  )
}

export default TimerContainer