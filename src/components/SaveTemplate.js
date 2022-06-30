import React, { useState, useEffect } from 'react'
import ErrorPopup from './ErrorPopup'
import taskTemplateService from '../services/taskTemplates'
import { CgClose } from 'react-icons/cg'

const SaveTemplate = ({ user, tasks, toggleError, setToggleError }) => {
  const [buttonText, setButtonText] = useState('Save As Template')
  const [showTemplateSaveForm, setShowToggleSaveForm] = useState(false)
  const [templateName, setTemplateName] = useState('')
  
  // This is the handler for the og button click, to change the text and toggle the form
  const toggleSaveForm = () => {
    user ? setShowToggleSaveForm(!showTemplateSaveForm) : setToggleError(true)
    
  }

  useEffect(() => {
    showTemplateSaveForm ? setButtonText('Cancel') : setButtonText('Save As Template')
  }, [showTemplateSaveForm])

  const handleTemplateNameChange = (event) => {
    const eventValue = event.target.value
    setTemplateName(eventValue)
  }

  // This is the component which is the form where the template is named and then saved
  const TemplateSaveForm = () => {

    const submitTemplateSaveForm = async (event) => {
      event.preventDefault()
      try {
        if (user) {
          const saveTasks = tasks.map(task => {
            const { _id, ...newTask} = task
            return newTask
          })

          const newTaskTemplate = {
            name: templateName,
            tasks: saveTasks
          }

          await taskTemplateService.create(newTaskTemplate)
          setTemplateName('')
          setShowToggleSaveForm(false)
        } else if (!user) {
          console.log('must be signed in!')
        }
      } catch (exception) {
        console.log(exception)
      }
       
    }
    return (
      <div className='popup'>
        <div className='popup-inner popup-login'>
          <form className='form-login-container' onSubmit={submitTemplateSaveForm} key='templateNameForm' >
            <h2 className='heading-login'>Save Template</h2>
            <input className='input-login' type='text' placeholder='Template Name' value={templateName}  onChange={handleTemplateNameChange} />
            <input className='btn-settings-save' type='submit' value='Save' />
          </form>
          <button className='btn-close btn-login-close' onClick={toggleSaveForm}><CgClose size={14}/></button>
        </div>
      </div>
    )
  }

  return ( 
    <div>
      <div className='wrap-dropdown-content-option' onClick={toggleSaveForm}>
        <p>Save as Template</p>
      </div>
      {showTemplateSaveForm
        ? TemplateSaveForm()
        : null
      }
      {toggleError
        ? <ErrorPopup setToggleError={setToggleError} />
        : null  
      }
    </div>     
  )
}
export default SaveTemplate