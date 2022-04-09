import React from 'react'
import { CgClose } from 'react-icons/cg'

import './ErrorPopup.css'

const ErrorPopup = ({ setToggleError }) => {
  const handleClick = () => {
    setToggleError(false)
  }

  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <h2 className='error-text'>Must be Logged in!</h2>
        <button className='close-btn login-close' onClick={handleClick}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

export default ErrorPopup