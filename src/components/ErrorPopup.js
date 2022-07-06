import React from 'react'
import { CgClose } from 'react-icons/cg'

const ErrorPopup = ({ setToggleError }) => {
  const handleClick = () => {
    setToggleError(false)
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <h2 className='heading-error-text'>Must be Logged in!</h2>
        <button className='btn-close btn-login-close' onClick={handleClick}><CgClose size={14}/></button>
      </div>
    </div>
  )
}

export default ErrorPopup