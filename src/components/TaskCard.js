import React, { useState } from 'react'
import EditTask from './EditTask'
import { MdEdit } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';

const TaskCard = ({ taskName, taskDur, taskNote, blocksCompleted, selectedTask, setSelectedTask, tasks, setTasks, taskId, login }) => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [classes, setClasses] = useState('')

  const onCardClick = (event) => {
    const eventId = event.target.id
    setSelectedTask(eventId)
    if (classes !== '') {
      setClasses('')
    }
    if (classes === '') {
      setClasses('taskCard-selected')
    }
  }

  const onEditClick = () => {
    setShowTaskForm(true)
  }
  
  // if (selectedTask === taskName) setClasses('taskCard-selected')

  if (showTaskForm) {
    return (
      <div className={`taskCard ${classes}`} onClick={onCardClick} id={taskName} >
        <EditTask 
          taskId={taskId}
          tasks={tasks}
          setTasks={setTasks}
          taskNameEdit={taskName}
          taskName={taskName}
          taskDur={taskDur}
          taskNote={taskNote}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          login={login}
        />
      </div>
    )
  }
  else {
    return (
      <div className={classes}>
        <div className='taskCard' onClick={onCardClick} id={taskName} >
          <div className='taskCard-mainLine'>
            <h3 id={taskName} className='task-card-heading'>{taskName}</h3>
            <div className='taskCard-settings'>
              <p className='duration' id={taskName}>{blocksCompleted}/{taskDur}</p>
              <button onClick={onEditClick} className='edit-button'><MdEdit/></button>
            </div>
          </div>
          {taskNote.length !== 0
            ? <TextareaAutosize id={taskName} className='taskNotes' value={taskNote} readOnly/>
            : <></>
          }
        </div>
      </div>
    )
  }
}

export default TaskCard