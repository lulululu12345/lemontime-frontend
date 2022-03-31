import React, { useState, useEffect } from 'react'
import taskService from './services/tasks'
import LoginContainer from './components/LoginContainer'
import SettingsContainer from './components/SettingsContainer'
import TimerContainer from './components/TimerContainer'
import TaskContainer from './components/TaskContainer'

import './App.css'

const App = () => {
  // localStorage.clear()
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')))

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (login) {
      taskService
        .getAll()
        .then(response => {
          setTasks(response.data)
        })
    }
  }, [])
  
  // Duration in milliseconds for different tasks
  const [pomodoro, setPomodoro] = 
    useState({ 
      name: 'pomodoro',
      type: 'work', 
      durMins: JSON.parse(localStorage.getItem('pomodoro')), 
      get durMs(){
        return this.durMins * 60000
      }
    })
  const [shortBreak, setShortBreak] = 
    useState({ 
      name: 'shortBreak', 
      type: 'break',
      durMins: JSON.parse(localStorage.getItem('shortBreak')), 
      get durMs(){
        return this.durMins * 60000
      } 
    })
  const [longBreak, setLongBreak] = 
    useState({ 
      name: 'longBreak', 
      type: 'break',
      durMins: JSON.parse(localStorage.getItem('longBreak')), 
      get durMs(){
        return this.durMins * 60000
      } 
    })

  const [currentTimeBlock, setCurrentTimeBlock] = useState(pomodoro)
  const [time, setTime] = useState(currentTimeBlock.durMs)
  const [start, setStart] = useState(false)
  const [autoBreak, setAutoBreak] = useState(JSON.parse(localStorage.getItem('autoBreak')))
  const [autoPomodoro, setAutoPomodoro] = useState(JSON.parse(localStorage.getItem('autoPomodoro')))
  const [longBreakInterval, setLongBreakInterval] = useState(JSON.parse(localStorage.getItem('longBreakInterval')))
  const [selectedTask, setSelectedTask] = useState(false)
  const [log, setLog] = 
    useState({
      workCompleted: 0,
      blocksCompleted: []
    })

  return (
    <div className='App'>
      <header className='primary-header'>
        <div>
          <h3>LOGO</h3>
        </div>
        <nav>
          <ul className='primary-navigation'>
            <li>
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
            </li>
            <li>
              <LoginContainer 
                user={user}
                setUser={setUser}
              />
            </li>
          </ul>
        </nav>
      </header>




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
        login={login}
        user={user}
      />
    </div>
  )
}

export default App
