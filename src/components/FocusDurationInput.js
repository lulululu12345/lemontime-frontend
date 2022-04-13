import React from 'react'

const FocusDurationInput = ({ numBoxValue, setNumBoxValue, className }) => {
  // Handler for changes to num box
  const handleNumBoxChange = (event) => {
    const eventValue = event.target.value
    setNumBoxValue(eventValue)
  }

  return <input className={className} type='number' min='0.5' max='999' step='any' value={numBoxValue} onChange={handleNumBoxChange} />
}

export default FocusDurationInput