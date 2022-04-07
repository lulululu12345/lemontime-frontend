import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import loginService from '../services/login'
import signupService from '../services/signup'

import './LoginContainer.css'

const LoginContainer2 = ({ user, setUser}) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  // This effect checks to see if the user is signed in after mounting the LoginContainer component
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTimerAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      taskTemplateService.setToken(user.token)
    }
  }, [])

  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedTimerAppUser')
    setUser(null)
  }

  let form
  let button
  // Conditionals for setting the form variable
  if (showLogin) {
    form = <Login showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup} setUser={setUser} />
  } 
  if (showSignup) {
    form = <Signup showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup} setUser={setUser} />
  }
  if (showLogin === false && showSignup === false) {
    form = false
  }
  // Conditionals for setting the button variable
  if (user === null && form === false) {
    button = <button onClick={toggleLogin} >Login</button>
  } 
  if (form === true) {
    button = <></>
  } 
  if (user) {
    button = <button onClick={handleLogOut}>Logout</button>
  }
  
  return (
    <div>
      {form}
      {button}
    </div>
  )
}







const Login = ({showLogin, setShowLogin, showSignup, setShowSignup, setUser }) => {

  return (
    <div>
      <h3>Login</h3>
      <LoginForm 
        setUser={setUser}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />
      
    </div>
  )
}


const LoginForm = ({ setUser, setShowLogin, setShowSignup }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const cancelLogin = () => {
    setShowLogin(false)
  }

  const toggleSignup = () => {
    setShowSignup(true)
    setShowLogin(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email, password,
      })
      window.localStorage.setItem(
        'loggedTimerAppUser', JSON.stringify(user)
      )
      taskTemplateService.setToken(user.token)
      setUser(user)
      setEmail('')
      setPassword('')
      setShowLogin(false)
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className='popup'>
      <div className='popup-inner'>
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
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
        <span>Don't have an account? <button onClick={toggleSignup}>Sign-up!</button></span>
        <div>
          <button className='close-btn' onClick={cancelLogin}>Cancel</button>
        </div>
      </div>
    </div>
  )
}































const Signup = ({ showLogin, setShowLogin, showSignup, setShowSignup, setUser }) => {
  

  return (
    <div>
      <h3>Sign-up</h3>
      <SignupForm 
        setUser={setUser}
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
      />
      
    </div>
  )
}


const SignupForm = ({ setUser, showSignup, setShowSignup, setShowLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const cancelSignup = () => {
    setShowSignup(!showSignup)
  }

  const toggleLogin = () => {
    setShowLogin(true)
    setShowSignup(false)
  }
  
  const handleEmailChange = (event) => {
    const eventValue = event.target.value
    setEmail(eventValue)
  }

  const handlePasswordChange = (event) => {
    const eventValue = event.target.value
    setPassword(eventValue)
  }
  
  const handleConfirmPasswordChange = (event) => {
    const eventValue = event.target.value
    setConfirmPassword(eventValue)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (password === confirmPassword) {
        const user =  await signupService.signup({ email, password, })
        window.localStorage.setItem(
          'loggedTimerAppUser', JSON.stringify(user)
        )
        taskTemplateService.setToken(user.token)
        setUser(user)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setShowSignup(false)
      }
      if (password !== confirmPassword) {
        console.log('You gotta have the asswords match dooood!!')
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <form onSubmit={handleSubmit} >
          <div>
            <input type='text' placeholder='email' value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
          </div>
          <div>
            <input type='password' placeholder='confirm password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>
          <input type='submit' value='Submit'  />
        </form>
        <span>Already have an account? <button onClick={toggleLogin} >Login!</button></span>
        <div>
          <button onClick={cancelSignup}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default LoginContainer2