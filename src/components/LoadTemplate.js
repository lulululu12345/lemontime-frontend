import React, { useState, useEffect } from 'react'
import ErrorPopup from './ErrorPopup'
import taskTemplateService from '../services/taskTemplates'
import TemplateCard from './TemplateCard'
import { CgClose } from 'react-icons/cg'

const LoadTemplate = ({ setTasks, user, toggleError, setToggleError }) => {
  const [buttonText, setButtonText] = useState('Load Template')
  const [toggleForm, setToggleForm] = useState(false)

  const handleFormToggle = () => {
    user ?  setToggleForm(!toggleForm) : setToggleError(true)
  }

  useEffect(() => {
    !toggleForm ? setButtonText('Load Template') : setButtonText('Cancel')
  }, [toggleForm])
  
  return (
    <div>
      <div className='wrap-dropdown-content-option' onClick={handleFormToggle}>
        <p>Load Template</p>
      </div>
      {toggleForm
        ? <Templates setTasks={setTasks} setToggleForm={setToggleForm}/>
        : null
      }
      {toggleError
        ? <ErrorPopup setToggleError={setToggleError} />
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
      <div className='popup-inner popup-login'>
        <div className='wrap-load-template-header'>
          <h2 className='heading-load-template'>Templates</h2>
          <button className='btn-load-template-edit'>Edit</button>
        </div>
        <ul className='list-load-template'>
          {listTemplates}
        </ul>
        <button className='btn-close btn-login-close' onClick={closeForm}><CgClose /></button>
      </div>
    </div>
  )
}

export default LoadTemplate