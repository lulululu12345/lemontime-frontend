import React from 'react'
import accountService from '../services/account'
import { Link, useParams } from 'react-router-dom'
import { useTimer } from '../useTimer'

const AccountConfirmed = () => {
  const{ setShowLogin } = useTimer()

  let confirmation = useParams().confirmationCode
  if (confirmation) {
    accountService.verifyUser(confirmation)
  }

  const handleClick = () => {
    setShowLogin(true)
  }

  return (
    <div className='popup'>
      <div className='popup-inner popup-verification'>
          <h3>Confirmation Successful!</h3>
          <Link to={'/'} >
            <button className='btn-alt-form' onClick={handleClick}>Please Login</button>
          </Link>
      </div>
    </div>
  )
}

export default AccountConfirmed