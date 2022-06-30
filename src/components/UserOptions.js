import React, { useState, useEffect } from 'react'
import userToken from '../services/userToken'
import DeleteAccount from './DeleteAccount'
import { FaUser } from 'react-icons/fa'

const UserOptions = ({ setUser, setTasks }) => {
  const [dropdownContent, setDropdownContent] = useState('wrap-dropdown-content')
  const [deletePopup, setDeletePopup] = useState(false)

  const handleShowSettings = () => {
    if ( dropdownContent === 'wrap-dropdown-content') {
      return setDropdownContent(`${dropdownContent} wrap-show-dropdown-content`)
    }
    return setDropdownContent('wrap-dropdown-content')
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedTimerAppUser')
    userToken.token = null
    setUser(null)
    setTasks([])
  }

  const handleDelete = () => {
    setDeletePopup(true)
  }

  return (
    <>
      <div className='wrap-dropdown'>
        <button className='btn-dropdown user-opts' onClick={handleShowSettings}><FaUser /></button>
        <div className={dropdownContent}>
          <div className='wrap-dropdown-content-option' onClick={handleLogOut}>
            <p>Logout</p>
          </div>
          <div className='wrap-dropdown-content-option' onClick={handleDelete}>
            <p>Delete Account</p>
          </div>
        </div>
      </div>
      {deletePopup
        ? <DeleteAccount setDeletePopup={setDeletePopup} setUser={setUser} setTasks={setTasks} />
        : null
      }
    </>
  )
}

export default UserOptions