import React, { useState, useEffect } from 'react'
import SettingsContainer from './components/SettingsContainer'
import TimerContainer from './components/TimerContainer'
import TaskContainer from './components/TaskContainer'

const App = () => {
  // Phony Database
  const tasks = ['taskA', 'taskB', 'taskC']
  // Duration in milliseconds for different tasks
  const [pomodoro, setPomodoro] = 
    useState({ 
      name: 'pomodoro',
      type: 'work', 
      durMins: 25, 
      get durMs(){
        return this.durMins * 60000
      }
    })
  const [shortBreak, setShortBreak] = 
    useState({ 
      name: 'shortBreak', 
      type: 'break',
      durMins: 5, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
  const [longBreak, setLongBreak] = 
    useState({ 
      name: 'longBreak', 
      type: 'break',
      durMins: 10, 
      get durMs(){
        return this.durMins * 60000
      } 
    })

  const [currentTask, setCurrentTask] = useState(pomodoro)
  const [time, setTime] = useState(currentTask.durMillis)
  const [start, setStart] = useState(false)
  const [autoBreak, setAutoBreak] = useState(false)
  const [autoPomodoro, setAutoPomodoro] = useState(false)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [log, setLog] = 
    useState({
      workCompleted: 0,
      blocksCompleted: []
    })

  return (
    <div className='App'>
      <span>
      <SettingsContainer 
        pomodoro={pomodoro}
        setPomodoro={setPomodoro}
        shortBreak={shortBreak}
        setShortBreak={setShortBreak}
        longBreak={longBreak}
        setLongBreak={setLongBreak}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        time={time}
        setTime={setTime}
        start={start}
        setStart={setStart}
        autoBreak={autoBreak}
        setAutoBreak={setAutoBreak}
        autoPomodoro={autoPomodoro}
        setAutoPomodoro={setAutoPomodoro}
        longBreakInterval={longBreakInterval}
        setLongBreakInterval={setLongBreakInterval}
      />
      </span>
      <span>
      </span>
      <h1>Timer</h1>
      <TimerContainer 
        start={start}
        setStart={setStart}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        time={time}
        setTime={setTime}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        autoBreak={autoBreak}
        autoPomodoro={autoPomodoro}
        longBreakInterval={longBreakInterval}
        log={log}
        setLog={setLog}
      />
      <TaskContainer />
    </div>
  )
}

export default App
