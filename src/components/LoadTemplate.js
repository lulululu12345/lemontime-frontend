import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import TemplateCard from './TemplateCard'
import './LoadTemplate.css'

const LoadTemplate = ({ setTasks }) => {
  const [buttonText, setButtonText] = useState('Load Template')
  const [toggleForm, setToggleForm] = useState(false)

  const handleFormToggle = () => {
    setToggleForm(!toggleForm)
  }

  useEffect(() => {
    if (!toggleForm) {
      setButtonText('Load Template')
    } else {
      setButtonText('Cancel')
    }
  }, [toggleForm])

  
  
  return (
    <div>
      {toggleForm
        ? <Templates setTasks={setTasks} setToggleForm={setToggleForm}/>
        : null
      }
      <button onClick={handleFormToggle} >{buttonText}</button>
    </div>
  )
}

const Templates = ({ setTasks, setToggleForm }) => {
  const [userTemplates, setUserTemplates] = useState([])

  const getTemplates = async () => {
    const gottenTemplates = await taskTemplateService.getAll()
    setUserTemplates(gottenTemplates)
  }
  // console.log('userTemplates', userTemplates)
  // getTemplates()

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
  useEffect(() => {
    getTemplates()
  }, [])

  return (
    <div>
      <ul className='load-temp-ul'>
        {listTemplates}
      </ul>
    </div>
  )
}

export default LoadTemplate