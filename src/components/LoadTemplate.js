import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import TemplateCard from './TemplateCard'
import './LoadTemplate.css'

const LoadTemplate = ({ setTasks }) => {
  const [buttonText, setButtonText] = useState('Load Template')
  const [toggleForm, setToggleForm] = useState(false)
  const [userTemplates, setUserTemplates] = useState([])

  const handleFormToggle = () => {
    setToggleForm(!toggleForm)
  }

  useEffect(() => {
    !toggleForm ? setButtonText('Load Template') : setButtonText('Cancel')
  }, [toggleForm])

  const Templates = () => {

    const getTemplates = async () => {
      const gottenTemplates = await taskTemplateService.getAll()
      setUserTemplates(gottenTemplates)
    }
    // console.log('userTemplates', userTemplates)
    getTemplates()
    const listTemplates = userTemplates.map(template => {
      return (
        <TemplateCard 
          key={template.id}
          templateName={template.name}
          templateId={template.id}
          templateTasks={template.tasks}
          setTasks={setTasks}
          setToggleForm={setToggleForm}
        />
      )
    })

    return (
      <div>
        <ul className='load-temp-ul'>
          {listTemplates}
        </ul>
      </div>
    )
  }
  
  return (
    <div>
      {toggleForm
        ? Templates()
        : null
      }
      <button onClick={handleFormToggle} >{buttonText}</button>
    </div>
  )
}

export default LoadTemplate