import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import accountService from '../services/account'

const PasswordReset = ({ setShowLogin }) => {
  const [successful, setSuccessful] = useState(false)

  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        {successful
          ? <PasswordResetSuccess setShowLogin={setShowLogin} />
          : <PasswordResetForm setSuccessful={setSuccessful} />
          }
      </div>
    </div>
  )
}

const PasswordResetForm = ({ setSuccessful }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordClasses, setPasswordClasses] = useState('input-login')
  const [passwordError, setPasswordError] = useState(false)

  const resetToken = useParams().resetToken

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
        const newPassword = {
          password
        }
        const resetPassword = await accountService.passwordReset(newPassword, resetToken)

        console.log(resetPassword)
        setPassword('')
        setConfirmPassword('')
        setSuccessful(true)
      }
      if (password !== confirmPassword) {
        setPasswordError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (passwordError) {
      setPasswordClasses('input-login input-error')
    }
  }, [passwordError])


  return (
    <form className='form-login-container' onSubmit={handleSubmit}>
      <h3 className='heading-login'>Reset Password</h3>
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
  )
}

const PasswordResetSuccess = ({ setShowLogin }) => {

  const handleClick = () => {
    setShowLogin(true)
  }

  return (
    <div className='resetSuccess'>
      <h2 className='heading-error-text'>Password reset successful!</h2>
      <Link to={'/'} >
        <button className='footer-text altForm-button' onClick={handleClick}>Please Login</button>
      </Link>
    </div>
  )
}

export default PasswordReset