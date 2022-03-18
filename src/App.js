import React, { useState } from 'react'
import SettingsContainer from './components/SettingsContainer'
import TimerContainer from './components/TimerContainer'
import TaskContainer from './components/TaskContainer'

const App = () => {
  // Phony Database
  const [tasks, setTasks] = useState([{
    id: 0,
    name: 'Shlurp the pollywogs',
    dur: 4,
    blocksCompleted: 0,
    note: 'All the live long day'
  },
  {
    id: 1,
    name: 'Flies in the buttermilk',
    dur: 2,
    blocksCompleted: 0,
    note: 'Get em out'
  }
  ])
  
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

  const [currentTimeBlock, setCurrentTimeBlock] = useState(pomodoro)
  const [time, setTime] = useState(currentTimeBlock.durMillis)
  const [start, setStart] = useState(false)
  const [autoBreak, setAutoBreak] = useState(false)
  const [autoPomodoro, setAutoPomodoro] = useState(false)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [selectedTask, setSelectedTask] = useState(false)
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
        currentTimeBlock={currentTimeBlock}
        setCurrentTimeBlock={setCurrentTimeBlock}
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
        currentTimeBlock={currentTimeBlock}
        setCurrentTimeBlock={setCurrentTimeBlock}
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
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaskContainer 
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  )
}

export default App
