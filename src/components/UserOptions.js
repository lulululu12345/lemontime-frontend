import React, { useState, useEffect } from 'react'

import { FaUser } from 'react-icons/fa'

import './UserOptions.css'

const UserOptions = ({ setUser }) => {
  const [dropdownContent, setDropdownContent] = useState('dropdown-content')

  const handleShowSettings = () => {
    if ( dropdownContent === 'dropdown-content') {
      return setDropdownContent(`${dropdownContent} show-dropdown-content`)
    }
    return setDropdownContent('dropdown-content')
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedTimerAppUser')
    setUser(null)
  }

  return (
    <div className='dropdown'>
      <button className='dropbtn user-opts' onClick={handleShowSettings}><FaUser size='14' /></button>
      <div className={dropdownContent}>
        <div className='dropdown-content-option' onClick={handleLogOut}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default UserOptions