import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import userToken from '../services/userToken'
import loginService from '../services/login'
import signupService from '../services/signup'
import accountService from '../services/account'
import UserOptions from './UserOptions'


import { CgClose } from 'react-icons/cg'
import PopupMessage from './PopupMessage'

const LoginContainer = ({ user, setUser, showLogin, setShowLogin, setTasks }) => {
  const [form, setForm] = useState(null)
  const [userOptions, setUserOptions] = useState(null)

  // This effect checks to see if the user is signed in after mounting the LoginContainer component
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTimerAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userToken.setToken(user.token)
    }
  }, [])

  const toggleLogin = () => {
    // setShowLogin(!showLogin)
    setForm(<Login setUser={setUser} setForm={setForm} />)
  }

  useEffect(() => {
    if (showLogin) {
      setForm(<Login setUser={setUser} setForm={setForm} />)
    }
  }, [showLogin])

  // Conditionals for setting the userOptions state
  useEffect(() => {
    if (user === null) {
      setUserOptions(<button className='link-button' onClick={toggleLogin}>Login</button>)
    } 
    if (user) {
      setUserOptions(<UserOptions setUser={setUser} setTasks={setTasks} />)
    }
  }, [user])
  
  return (
    <div>
      {form}
      {userOptions}
    </div>
  )
}

const Login = ({ setForm, setUser }) => {

  return (
    <div>
      <LoginForm 
        setUser={setUser}
        setForm={setForm}
      />
      
    </div>
  )
}

const LoginForm = ({ setUser, setForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [inputClasses, setInputClasses] = useState('input-login')

  const cancelLogin = () => {
    setForm(null)
  }

  const toggleSignup = () => {
    setForm(<Signup setForm={setForm} setUser={setUser} />)
  }

  const togglePasswordReset = () => {
    setForm(<ForgotPassword setForm={setForm} />)
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
      setForm(null)
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setLoginError(true)
    }
  }
  useEffect(() => {
    if (loginError) {
      setInputClasses('input-login input-error')
    }
  }, [loginError])

  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <form className='form-login-container' onSubmit={handleLogin}>
          <h3 className='heading-login'>Login</h3>
          {loginError
            ?<p className='login-error' >{errorMessage}</p>
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
          <button className='settings-save' type='submit'>Submit</button>
        </form>
        <div className='login-footer'>
          <span className='footer-text'>Don't have an account? <button className='altForm-button' onClick={toggleSignup}>Sign-up!</button></span>
          <button className='altForm-button footer-text forgot-pass' onClick={togglePasswordReset}>Forgot Password?</button>
        </div>
        <button className='btn-close login-close' onClick={cancelLogin}><CgClose/></button>
      </div>
    </div>
  )
}

const ForgotPassword = ({ setForm }) => {
  const [emailClasses, setEmailClasses] = useState('input-login')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)

  const handleEmailChange = (event) => {
    const eventValue = event.target.value
    setEmail(eventValue)
  }

  const handleClose = () => {
    setForm(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {

      const params = await accountService.forgotPassword({ email })

      emailjs.send('service_dgmgizg', 'template_zwq1evs', params, 'qiILZOyanyiItfMQL')

      setForm(<PopupMessage message='Check your inbox' setToggleError={setForm} />)
    } catch (err) {
      setErrorMessage(err.response.data.error)
    }
  }

  useEffect(() => {
    if(errorMessage) {
      setEmailClasses('input-login input-error')
    }
  }, [errorMessage])

  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <form className='form-login-container' onSubmit={handleSubmit}>
          <h2 className='heading-error-text'>Enter your email</h2>
          <input 
            className={emailClasses} 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={handleEmailChange} 
            required
          />
          {errorMessage
            ? <p className='login-error'>{errorMessage}</p>
            : null
          }
          <button className='settings-save' type='submit'>Submit</button>
        </form>
        <button className='btn-close login-close' onClick={handleClose}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

const Signup = ({ setForm, setUser }) => {
  
  return (
    <div>
      <SignupForm 
        setUser={setUser}
        setForm={setForm}
      />
      
    </div>
  )
}

const SignupForm = ({ setForm, setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [signupError, setSignupError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailClasses, setEmailClasses] = useState('input-login')
  const [passwordClasses, setPasswordClasses] = useState('input-login')

  const cancelSignup = () => {
    setForm(null)
  }

  const toggleLogin = () => {
    setForm(<Login setForm={setForm} setUser={setUser} />)
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
        const userEmailParams =  await signupService.signup({ email, password, })

        emailjs.send('service_dgmgizg', 'template_pm9yx2o', userEmailParams, 'qiILZOyanyiItfMQL')

        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setForm(<PopupMessage message='Please check your email to verify your account!' setToggleError={setForm} />)
      }
      if (password !== confirmPassword) {
        setPasswordError(true)
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.error)
        setSignupError(true)
      }
    }
  }

  useEffect(() => {
    if (passwordError) {
      setPasswordClasses('input-login input-error')
    }
  }, [passwordError])

  useEffect(() => {
    if (signupError) {
      setEmailClasses('input-login input-error')
    }
  }, [signupError])
  
  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <form className='form-login-container' onSubmit={handleSubmit}>
          <h3 className='heading-login'>Sign-up</h3>
          {signupError
            ? <p className='login-error'>{errorMessage}</p>
            : null
          }
          <input 
            className={emailClasses} 
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
        <button className='btn-close login-close' onClick={cancelSignup}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

export default LoginContainer