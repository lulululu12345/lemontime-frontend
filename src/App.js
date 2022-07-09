import React, { useState, useEffect } from 'react'
import LoginContainer from './components/LoginContainer'
import SettingsContainer from './components/SettingsContainer'
import TimerContainer from './components/TimerContainer'
import TaskContainer from './components/TaskContainer'
import AccountConfirmed from './components/AccountConfirmed'
import PasswordReset from './components/PasswordReset'
import { Outlet, Routes, Route } from 'react-router-dom'

import './App.css'

const worker = new window.Worker('./timer-worker.js')


const App = () => {
  let localTasks = JSON.parse(localStorage.getItem('tasks')) || []
  let localPomodoro = JSON.parse(localStorage.getItem('pomodoro')) || 25
  let localShortBreak = JSON.parse(localStorage.getItem('shortBreak')) || 5
  let localLongBreak = JSON.parse(localStorage.getItem('longBreak')) || 10
  let localAutoBreak = JSON.parse(localStorage.getItem('autoBreak')) || false
  let localAutoPomodoro = JSON.parse(localStorage.getItem('autoPomodoro')) || false
  let localLongBreakInterval = JSON.parse(localStorage.getItem('longBreakInterval')) || 4

  // localStorage.clear()
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState(localTasks)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  // Duration in milliseconds for different tasks
  const [pomodoro, setPomodoro] = 
    useState({ 
      name: 'pomodoro',
      type: 'work', 
      durMins: localPomodoro, 
      get durMs(){
        return this.durMins * 60000
      }
    })
  const [shortBreak, setShortBreak] = 
    useState({ 
      name: 'shortBreak', 
      type: 'break',
      durMins: localShortBreak, 
      get durMs(){
        return this.durMins * 60000
      } 
    })
  const [longBreak, setLongBreak] = 
    useState({ 
      name: 'longBreak', 
      type: 'break',
      durMins: localLongBreak, 
      get durMs(){
        return this.durMins * 60000
      } 
    })

  const [currentTimeBlock, setCurrentTimeBlock] = useState(pomodoro)
  const [time, setTime] = useState(currentTimeBlock.durMs)
  const [start, setStart] = useState(false)
  const [autoBreak, setAutoBreak] = useState(localAutoBreak)
  const [autoPomodoro, setAutoPomodoro] = useState(localAutoPomodoro)
  const [longBreakInterval, setLongBreakInterval] = useState(localLongBreakInterval)
  const [selectedTask, setSelectedTask] = useState(false)
  const [log, setLog] = 
    useState({
      workCompleted: 0,
      blocksCompleted: []
    })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])






  // const [worker, setWorker] = useState()
  
  const runWorker = (message) => {
    worker.postMessage(message)
    worker.onmessage = (e) => {
      const result = e.data
      console.log('worker -> main thread: ', result)
    }
  }






  

  return (
    <div className='App' style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <header className='primary-header'>
        <div>
          <h3 className='primary-header_logo'>LEMONTIME</h3>
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
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setTasks={setTasks}
              />
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='confirm/:confirmationCode' element={<AccountConfirmed setShowLogin={setShowLogin} />} />
        <Route path='password-reset/:resetToken' element={<PasswordReset setShowLogin={setShowLogin} />} />
      </Routes>
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
        runWorker={runWorker}
      />
      <TaskContainer 
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
        user={user}
      />
      <Outlet />
    </div>
  )
}

export default App
