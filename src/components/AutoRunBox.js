import React from 'react'

const AutoRunBox = ({ checkboxValue, setCheckboxValue, labelText }) => {
  // Handler for changes to checkbox
  const handleCheckboxChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue === 'true') return setCheckboxValue('false')
    if (eventValue === 'false') return setCheckboxValue('true')
  }

  return (
    <div>
    <label>{labelText}</label>
    <input type='checkbox' value={checkboxValue} onChange={handleCheckboxChange} checked={(checkboxValue === 'true') ? true : false} />
    </div>
  )
}

export default AutoRunBox