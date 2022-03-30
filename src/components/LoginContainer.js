import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import loginService from '../services/login'

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
    form = <Signup showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup} />
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

  const cancelLogin = () => {
    setShowLogin(false)
  }

  const toggleSignup = () => {
    setShowSignup(true)
    setShowLogin(false)
  }

  return (
    <div>
      <h3>Login</h3>
      <LoginForm 
        setUser={setUser}
        setShowLogin={setShowLogin}
      />
      <span>Don't have an account? <button onClick={toggleSignup} >Sign-up!</button></span>
      <div>
        <button onClick={cancelLogin}>Cancel</button>
      </div>
    </div>
  )
}


const LoginForm = ({ setUser, setShowLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
  )
}































const Signup = ({ showLogin, setShowLogin, showSignup, setShowSignup }) => {
  const cancelSignup = () => {
    setShowSignup(!showSignup)
  }

  const toggleLogin = () => {
    setShowLogin(true)
    setShowSignup(false)
  }

  return (
    <div>
      <h3>Sign-up</h3>
      <SignupForm />
      <span>Already have an account? <button onClick={toggleLogin} >Login!</button></span>
      <div>
        <button onClick={cancelSignup}>Cancel</button>
      </div>
    </div>
  )
}


const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
  }

  return (
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
  )
}

export default LoginContainer2