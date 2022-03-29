import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'
import TemplateCard from './TemplateCard'
import './LoadTemplate.css'

const LoadTemplate = ({ setTasks, user }) => {
  const [buttonText, setButtonText] = useState('Load Template')
  const [toggleForm, setToggleForm] = useState(false)

  const handleFormToggle = () => {
    user ?  setToggleForm(!toggleForm) : console.log('must be logged in')
  }

  useEffect(() => {
    !toggleForm ? setButtonText('Load Template') : setButtonText('Cancel')
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

  const listTemplates = userTemplates.map(template => {
    return (
      <TemplateCard 
        key={template.id}
        templateName={template.name}
        templateId={template.id}
        templateTasks={template.tasks}
        setTasks={setTasks}
        setToggleForm={setToggleForm}
        userTemplates={userTemplates}
        setUserTemplates={setUserTemplates}
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