import React, { useState } from 'react'

const FocusDurationInput = ({ numBoxValue, setNumBoxValue}) => {
  const [className, setClassName ] = useState('settings-input')
  // Handler for changes to num box
  const handleNumBoxChange = (event) => {
    const eventValue = event.target.value
    console.log(eventValue)
    if (eventValue === '' || Number(eventValue) < 1) {
      setClassName('settings-input input-error')
    }
    else setClassName('settings-input')
    setNumBoxValue(eventValue)
  }
  

  return <input className={className} type='number' min='1' max='999' step='any' value={numBoxValue} onChange={handleNumBoxChange} />
}

export default FocusDurationInput