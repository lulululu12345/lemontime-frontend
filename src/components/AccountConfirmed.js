import React from 'react'
import accountService from '../services/account'
import { Link, useParams } from 'react-router-dom'

const AccountConfirmed = ({ setShowLogin }) => {
  let confirmation = useParams().confirmationCode
  if (confirmation) {
    accountService.verifyUser(confirmation)
  }

  const handleClick = () => {
    setShowLogin(true)
  }

  return (
    <div className='popup'>
      <div className='popup-inner verification-popup'>
          <h3>Confirmation Successful!</h3>
          <Link to={'/'} >
            <button className='btn-alt-form' onClick={handleClick}>Please Login</button>
          </Link>
      </div>
    </div>
  )
}

export default AccountConfirmed