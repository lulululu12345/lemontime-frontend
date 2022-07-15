import React from 'react'
import TaskCard from './TaskCard'
import TaskOptions from './TaskOptions'
import AddTask from './AddTask'

const TaskContainer = ({ appState }) => {
  const { selectedTask, setSelectedTask, tasks, setTasks, login, user } = appState
  return (
    <div className='section-task-container'>
      <div className='wrap-task-container-header'>
        <h2 className='heading-task-container'>Tasks</h2>
        <TaskOptions 
          user={user}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
      <div>
        {tasks && tasks.map(task => 
          <TaskCard 
            key={task._id} 
            taskId={task._id}
            taskName={task.name} 
            taskDur={task.dur} 
            taskNote={task.note} 
            blocksCompleted={task.blocksCompleted} 
            selectedTask={selectedTask} 
            setSelectedTask={setSelectedTask}
            tasks={tasks}
            setTasks={setTasks}
            login={login}
          />)
        }
      </div>
      <AddTask 
        tasks={tasks} 
        setTasks={setTasks}
        login={login}
      />
    </div>  
  )
}

export default TaskContainer