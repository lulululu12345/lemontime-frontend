import React, { useState, useEffect } from 'react'
import taskTemplateService from '../services/taskTemplates'

const SaveTemplate = ({ user, tasks }) => {
  const [buttonText, setButtonText] = useState('Save As Template')
  const [showTemplateSaveForm, setShowToggleSaveForm] = useState(false)
  const [templateName, setTemplateName] = useState('')
  
  // This is the handler for the og button click, to change the text and toggle the form
  const toggleSaveForm = () => {
    user ? setShowToggleSaveForm(!showTemplateSaveForm) : console.log('must be logged in')
    
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
          const newTaskTemplate = {
            name: templateName,
            tasks: tasks
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
      <form onSubmit={submitTemplateSaveForm} key='templateNameForm' >
        <input type='text' placeholder='Template Name' value={templateName}  onChange={handleTemplateNameChange} />
        <input type='submit' value='Save' />
      </form>
    )
  }

  return (
    <div>
      <div>
        {showTemplateSaveForm
          ? TemplateSaveForm()
          : null
        }
      </div>
      <button onClick={toggleSaveForm} >{buttonText}</button>
    </div>
  )
}









export default SaveTemplate