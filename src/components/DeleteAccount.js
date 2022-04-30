import React from 'react'
import accountService from '../services/account'
import userToken from '../services/userToken'
import { CgClose } from 'react-icons/cg'
import './DeleteAccount.css'

const DeleteAccount = ({ setDeletePopup, setUser }) => {
  const handleClick = () => {
    setDeletePopup(false)
  }

  const handleYesClick = async () => {
    try {
      const removeAccount = await accountService.remove()
      console.log(removeAccount)
      window.localStorage.removeItem('loggedTimerAppUser')
      userToken.token = null
      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className='popup'>
    <div className='popup-inner login-popup'>
      <h2 className='error-text'>Are you sure you want to delete your account?</h2>
      <div className='delAcc-btn-wrap'>
        <button className='delAcc-btn no-btn' onClick={handleClick}>No</button>
        <button className='delAcc-btn yes-btn' onClick={handleYesClick}>Yes</button>
      </div>



      <button className='close-btn login-close' onClick={handleClick}><CgClose /></button>
    </div>
  </div>
  )
}

export default DeleteAccount