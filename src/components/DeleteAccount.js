import React from 'react'
import accountService from '../services/account'
import userToken from '../services/userToken'
import { CgClose } from 'react-icons/cg'

const DeleteAccount = ({ setDeletePopup, setUser, setTasks }) => {
  const handleClick = () => {
    setDeletePopup(false)
  }

  const handleYesClick = async () => {
    try {
      await accountService.remove()
      window.localStorage.removeItem('loggedTimerAppUser')
      userToken.token = null
      setUser(null)
      setTasks([])
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className='popup'>
    <div className='popup-inner popup-login'>
      <h2 className='heading-error-text'>Are you sure you want to delete your account?</h2>
      <div className='wrap-delete-account-buttons'>
        <button className='btn-delete-account btn-no' onClick={handleClick}>No</button>
        <button className='btn-delete-account btn-yes' onClick={handleYesClick}>Yes</button>
      </div>



      <button className='btn-close btn-login-close' onClick={handleClick}><CgClose /></button>
    </div>
  </div>
  )
}

export default DeleteAccount