import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import loginService from '../services/login'
import signupService from '../services/signup'

import { CgClose } from 'react-icons/cg'
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
  if (user === null) {
    button = <button className='button-link' onClick={toggleLogin}>Login</button>
  } 
  if (user) {
    button = <button className='button-link' onClick={handleLogOut}>Logout</button>
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
      <div className='popup-inner login-popup'>
        <form className='login-container' onSubmit={handleLogin}>
          <h3 className='login-header'>Login</h3>
          <input 
            className='login-input'
            type='text' 
            value={email} 
            name='Email' 
            placeholder='Email'
            onChange={({target}) => setEmail(target.value)} 
          />
          <input 
            className='login-input'
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({target}) => setPassword(target.value)}
          />
          <button className='login-submit' type='submit'>Login</button>
        </form>
        <div className='login-footer'>
          <span className='footer-text'>Don't have an account? <button className='altForm-button' onClick={toggleSignup}>Sign-up!</button></span>
        </div>
        <button className='close-btn login-close' onClick={cancelLogin}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

const Signup = ({ showLogin, setShowLogin, showSignup, setShowSignup, setUser }) => {
  
  return (
    <div>
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
      <div className='popup-inner login-popup'>
        <form className='login-container' onSubmit={handleSubmit} >
        <h3 className='login-header'>Sign-up</h3>
          <input className='login-input' type='text' placeholder='Email' value={email} onChange={handleEmailChange} />
          <input className='login-input' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
          <input className='login-input' type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
          {/* <input type='submit' value='Submit'  /> */}
          <button className='login-submit' type='submit'>Submit</button>
        </form>
        <div className='login-footer'>
          <span className='footer-text'>Already have an account? <button className='altForm-button' onClick={toggleLogin} >Login!</button></span>
        </div>
        <button className='close-btn login-close' onClick={cancelSignup}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

export default LoginContainer2