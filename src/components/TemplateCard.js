import React from 'react'
import './TemplateCard.css'

const TemplateCard = ({ templateName, templateTasks, setTasks, setToggleForm }) => {

  const handleTemplateSelect = () => {
    // use this particular template's id to get the associated tasks and put them in the taasks aarraay
    setTasks(templateTasks)
    setToggleForm(false)
  }

  return (
    <li className='load-temp-li' onClick={handleTemplateSelect} >
      {templateName}
    </li>
  )
}

export default TemplateCard