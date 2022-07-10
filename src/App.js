import React from 'react'
import LoginContainer from './components/LoginContainer'
import SettingsContainer from './components/SettingsContainer'
import TimerContainer from './components/TimerContainer'
import TaskContainer from './components/TaskContainer'
import AccountConfirmed from './components/AccountConfirmed'
import PasswordReset from './components/PasswordReset'
import { Outlet, Routes, Route } from 'react-router-dom'
import { useTimer } from './useTimer'

import './App.css'

const worker = new window.Worker('./timer-worker.js')

const App = () => {
  // localStorage.clear()
  const { setReady, setTime, ready } = useTimer()

  React.useEffect(() => {
    setReady(true)
  }, [])
  
  const runWorker = (message) => {
    worker.postMessage(message)

    worker.onmessage = (e) => {
      const result = e.data
      if (result === 'tick') setTime(prevTime => prevTime - 1000)
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
              <SettingsContainer />
            </li>
            <li>
              <LoginContainer />
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='confirm/:confirmationCode' element={<AccountConfirmed />} />
        <Route path='password-reset/:resetToken' element={<PasswordReset />} />
      </Routes>
      <TimerContainer runWorker={runWorker} />
      <TaskContainer />
      <Outlet />
    </div>
  )
}

export default App
