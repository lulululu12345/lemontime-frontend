import { useState, useEffect } from 'react'

export function useTimer() {
  const [pomodoro, setPomodoro] = useState(
    { 
      name: 'pomodoro',
      type: 'work', 
      durMins: JSON.parse(localStorage.getItem('pomodoro')) || 25, 
      get durMs(){
        return this.durMins * 60000
      }
    }
    
    )
  const [shortBreak, setShortBreak] = useState(
    { 
      name: 'shortBreak', 
      type: 'break',
      durMins: JSON.parse(localStorage.getItem('shortBreak')) || 5, 
      get durMs(){
        return this.durMins * 60000
      } 
    }
  )

  const [longBreak, setLongBreak] = useState(
    { 
      name: 'longBreak', 
      type: 'break',
      durMins: JSON.parse(localStorage.getItem('longBreak')) || 10, 
      get durMs(){
        return this.durMins * 60000
      } 
    }
  )

  const [log, setLog] = useState(
    {
      workCompleted: 0,
      blocksCompleted: []
    }
  )
  
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [start, setStart] = useState(false)
  const [currentTimeBlock, setCurrentTimeBlock] = useState(pomodoro)
  const [time, setTime] = useState(currentTimeBlock.durMs)
  const [autoBreak, setAutoBreak] = useState(JSON.parse(localStorage.getItem('autoBreak')) || false)
  const [autoPomodoro, setAutoPomodoro] = useState(JSON.parse(localStorage.getItem('autoPomodoro')) || false)
  const [longBreakInterval, setLongBreakInterval] = useState(JSON.parse(localStorage.getItem('longBreakInterval')) || 4)
  const [selectedTask, setSelectedTask] = useState(false)
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return { pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, log, setLog, user, setUser, showLogin, setShowLogin, start, setStart, currentTimeBlock, setCurrentTimeBlock, time, setTime, autoBreak, setAutoBreak, autoPomodoro, setAutoPomodoro, longBreakInterval, setLongBreakInterval, selectedTask, setSelectedTask, tasks, setTasks, ready, setReady}
}