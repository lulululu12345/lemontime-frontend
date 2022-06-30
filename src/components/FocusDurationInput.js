import React, { useState } from 'react'

const FocusDurationInput = ({ numBoxValue, setNumBoxValue}) => {
  const [className, setClassName ] = useState('input-settings')
  // Handler for changes to num box
  const handleNumBoxChange = (event) => {
    const eventValue = event.target.value
    if (eventValue === '' || Number(eventValue) < 1) {
      setClassName('input-settings input-error')
    }
    else setClassName('input-settings')
    setNumBoxValue(eventValue)
  }
  

  return <input className={className} type='number' min='1' max='999' step='any' value={numBoxValue} onChange={handleNumBoxChange} />
}

export default FocusDurationInput