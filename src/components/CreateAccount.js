import React, { useState, useEffect } from 'react'

const CreateAccount = () => {
  const [showForm, setShowForm] = useState(false)
  const [buttonText, setButtonText] = useState('Create Account')

  const toggleSignUpForm = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    !showForm ? setButtonText('Create Account') : setButtonText('Cancel')

  }, [showForm])

  return (
    <div>
      {showForm
        ? <SignUpForm />
        : null
      }
      <button onClick={toggleSignUpForm}>{buttonText}</button>
    </div>
  )
}

const SignUpForm = () => {
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

export default CreateAccount