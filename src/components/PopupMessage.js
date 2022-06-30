import React from 'react'
import { CgClose } from 'react-icons/cg'

const PopupMessage = ({ setToggleError, message }) => {
  const handleClick = () => {
    setToggleError(null)
  }

  return (
    <div className='popup'>
      <div className='popup-inner popup-login'>
        <h2 className='heading-error-text'>{message}</h2>
        <button className='btn-close btn-login-close' onClick={handleClick}><CgClose/></button>
      </div>
    </div>
  )
}

export default PopupMessage