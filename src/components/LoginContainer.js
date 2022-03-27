import React, { useState } from 'react'
import loginService from '../services/login'

const LoginContainer = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        email, password,
      })
      setUser(user)
      setEmail('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

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

  return (
    <div>
      {user === null
        ? loginForm()
        : <div><p>signed in</p></div>
      }
    </div>
  )
}

export default LoginContainer