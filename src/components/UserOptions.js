import React, { useState, useEffect } from 'react'
import userToken from '../services/userToken'
import DeleteAccount from './DeleteAccount'
import { FaUser } from 'react-icons/fa'
import './UserOptions.css'

const UserOptions = ({ setUser }) => {
  const [dropdownContent, setDropdownContent] = useState('dropdown-content')
  const [deletePopup, setDeletePopup] = useState(false)

  const handleShowSettings = () => {
    if ( dropdownContent === 'dropdown-content') {
      return setDropdownContent(`${dropdownContent} show-dropdown-content`)
    }
    return setDropdownContent('dropdown-content')
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedTimerAppUser')
    userToken.token = null
    setUser(null)
  }

  const handleDelete = () => {
    setDeletePopup(true)
  }

  return (
    <>
      <div className='dropdown'>
        <button className='dropbtn user-opts' onClick={handleShowSettings}><FaUser size='14' /></button>
        <div className={dropdownContent}>
          <div className='dropdown-content-option' onClick={handleLogOut}>
            <p>Logout</p>
          </div>
          <div className='dropdown-content-option' onClick={handleDelete}>
            <p>Delete Account</p>
          </div>
        </div>
      </div>
      {deletePopup
        ? <DeleteAccount setDeletePopup={setDeletePopup} setUser={setUser} />
        : null
      }
    </>
  )
}

export default UserOptions