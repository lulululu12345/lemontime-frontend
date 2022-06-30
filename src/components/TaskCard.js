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
      setClasses('card-task-selected')
    }
  }

  const onEditClick = () => {
    setShowTaskForm(true)
  }
  
  // if (selectedTask === taskName) setClasses('card-task-selected')

  if (showTaskForm) {
    return (
      <div className={`card-task ${classes}`} onClick={onCardClick} id={taskName} >
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
        <div className='card-task' onClick={onCardClick} id={taskName} >
          <div className='wrap-task-mainline'>
            <h3 id={taskName} className='heading-task'>{taskName}</h3>
            <div className='wrap-task-settings'>
              <p className='text-duration' id={taskName}>{blocksCompleted}/{taskDur}</p>
              <button onClick={onEditClick} className='btn-edit'><MdEdit/></button>
            </div>
          </div>
          {taskNote.length !== 0
            ? <TextareaAutosize id={taskName} className='input-task-notes' value={taskNote} readOnly/>
            : <></>
          }
        </div>
      </div>
    )
  }
}

export default TaskCard