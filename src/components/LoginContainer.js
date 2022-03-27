import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import taskService from '../services/tasks'

const LoginContainer = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTimerAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      taskService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('made it')
      const user = await loginService.login({
        email, password,
      })
      window.localStorage.setItem(
        'loggedTimerAppUser', JSON.stringify(user)
      )
      taskService.setToken(user.token)
      setUser(user)
      setEmail('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }
  console.log('user', user)
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <input 
            type='text' 
            value={email} 
            name='Email' 
            placeholder='email'
            onChange={({target}) => setEmail(target.value)} 
          />
        </div>
        <div>
          <input 
            type='password'
            value={password}
            name='Password'
            placeholder='password'
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedTimerAppUser')
    setUser(null)
  }

  const logOut = () => {
    return (
      <button onClick={handleLogout} >logout</button>
    )
  }

  return (
    <div>
      {user === null
        ? loginForm()
        : logOut()
      }
    </div>
  )
}

export default LoginContainer