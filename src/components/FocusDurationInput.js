import React from 'react'

const FocusDurationInput = ({ numBoxValue, setNumBoxValue, labelText }) => {
  // Handler for changes to num box
  const handleNumBoxChange = (event) => {
    const eventValue = Number(event.target.value)
    setNumBoxValue(eventValue)
  }

  return (
    <div>
      <label>{labelText}</label>
      <br/>
      <input type='number' min='0' max='999' step='any' value={numBoxValue} onChange={handleNumBoxChange} />
    </div>
  )
}

export default FocusDurationInput
