import React from 'react'
import { CgClose } from 'react-icons/cg'

import './PopupMessage.css'

const PopupMessage = ({ setToggleError, message }) => {
  const handleClick = () => {
    setToggleError(null)
  }

  return (
    <div className='popup'>
      <div className='popup-inner login-popup'>
        <h2 className='error-text'>{message}</h2>
        <button className='close-btn login-close' onClick={handleClick}><CgClose/></button>
      </div>
    </div>
  )
}

export default PopupMessage