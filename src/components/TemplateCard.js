import React from 'react'
import taskTemplateService from '../services/taskTemplates'

const TemplateCard = ({ templateId, templateName, templateTasks, setTasks, setToggleForm, userTemplates, setUserTemplates }) => {
  const handleTemplateSelect = () => {
    // use this particular template's id to get the associated tasks and put them in the tasks array
    setTasks(templateTasks)
    setToggleForm(false)
  }

  const deleteTemplate = async () => {
    try {
      await taskTemplateService.remove(templateId)
      // setUserTemplates(userTemplates.filter(template => template.id !== templateId))
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <li className='load-temp-li' onClick={handleTemplateSelect} >
      <span className='load-temp-name'>
      {templateName}
      </span>
      <span>
        {/* <button onClick={deleteTemplate}>Delete</button> */}
      </span>
    </li>
  )
}

export default TemplateCard