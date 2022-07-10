import React from 'react'

const AutoRunBox = ({ checkboxValue, setCheckboxValue, className }) => {
  // Handler for changes to checkbox
  const handleCheckboxChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue === 'true') return setCheckboxValue('false')
    if (eventValue === 'false') return setCheckboxValue('true')
  }

  return <input className={className} type='checkbox' value={checkboxValue || 'false'} onChange={handleCheckboxChange} checked={(checkboxValue === 'true') ? true : false} />
}

export default AutoRunBox