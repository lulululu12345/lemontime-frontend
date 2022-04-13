import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import userToken from '../services/userToken'
import loginService from '../services/login'
import signupService from '../services/signup'
import  UserOptions from './UserOptions'

import { CgClose } from 'react-icons/cg'
import './LoginContainer.css'

const LoginContainer = ({ user, setUser}) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [userOptions, setUserOptions] = useState(null)

  // This effect checks to see if the user is signed in after mounting the LoginContainer component
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTimerAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userToken.setToken(user.token)
      // taskTemplateService.setToken(user.token)
    }
  }, [])

  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }

  // const handleLogOut = () => {
  //   window.localStorage.removeItem('loggedTimerAppUser')
  //   setUser(null)
  // }

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
  // Conditionals for setting the userOptions state
  useEffect(() => {
    if (user === null) {
      setUserOptions(<button className='button-link' onClick={toggleLogin}>Login</button>)
    } 
    if (user) {
      // setUserOptions(<button className='button-link' onClick={handleLogOut}>Logout</button>)
      setUserOptions(<UserOptions setUser={setUser}/>)
    }
  }, [user])
  
  return (
    <div>
      {form}
      {userOptions}
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
  const [loginError, setLoginError] = useState(false)
  const [inputClasses, setInputClasses] = useState('login-input')

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
      userToken.setToken(user.token)
      // taskTemplateService.setToken(user.token)
      setUser(user)
      setEmail('')
      setPassword('')
      setShowLogin(false)
    } catch (exception) {
      console.log(exception)
      setLoginError(true)
    }
  }
  useEffect(() => {
    if (loginError) {
      setInputClasses('login-input input-error')
    }
  }, [loginError])

  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <form className='login-container' onSubmit={handleLogin}>
          <h3 className='login-header'>Login</h3>
          {loginError
            ?<p className='login-error' >Incorrect email or password</p>
            : null
          }
          <input 
            className={inputClasses}
            type='email' 
            value={email} 
            name='Email' 
            placeholder='Email'
            onChange={({target}) => setEmail(target.value)}
            required 
          />
          <input 
            className={inputClasses}
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({target}) => setPassword(target.value)}
            required
          />
          <button className='settings-save' type='submit'>Login</button>
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
  const [passwordError, setPasswordError] = useState(false)
  const [passwordClasses, setPasswordClasses] = useState('login-input')

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
        setPasswordError(true)
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  useEffect(() => {
    if (passwordError) {
      setPasswordClasses('login-input input-error')
    }
  }, [passwordError])
  
  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <form className='login-container' onSubmit={handleSubmit}>
          <h3 className='login-header'>Sign-up</h3>
          <input 
            className='login-input' 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={handleEmailChange} 
            required
          />
          <input 
            className={passwordClasses} 
            type='password' 
            placeholder='Password' 
            value={password} 
            onChange={handlePasswordChange} 
            required
          />
          <input 
            className={passwordClasses}
            type='password' 
            placeholder='Confirm Password' 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            required
          />
          {passwordError
            ? <p className='error'>Passwords do not match</p>
            : null
          }
          
          <button className='settings-save' type='submit'>Submit</button>
        </form>
        <div className='login-footer'>
          <span className='footer-text'>Already have an account? <button className='altForm-button' onClick={toggleLogin} >Login!</button></span>
        </div>
        <button className='close-btn login-close' onClick={cancelSignup}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

export default LoginContainer