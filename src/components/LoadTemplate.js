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
      <div className='dropdown-content-option' onClick={handleFormToggle}>
        <p>Load Template</p>
        {/* <button className='button_task-options' ></button> */}
      </div>
      {toggleForm
        ? <Templates setTasks={setTasks} setToggleForm={setToggleForm}/>
        : null
      }
    </div>
  )
}

const Templates = ({ setTasks, setToggleForm }) => {
  const [userTemplates, setUserTemplates] = useState([])

  const getTemplates = async () => {
    // This is geting all templates, but it needs to only get the templates associated with the logged in user
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

  const closeForm = () => {
    setToggleForm(false)
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <ul className='load-temp-ul'>
          {listTemplates}
        </ul>
        <button className='close-btn' onClick={closeForm} >cancel</button>
      </div>
    </div>
  )
}

export default LoadTemplate