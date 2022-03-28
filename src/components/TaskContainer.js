import React from 'react'
import TaskCard from './TaskCard'
import TaskOptions from './TaskOptions'
import AddTask from './AddTask'
import './TaskContainer.css'

const TaskContainer = ({ selectedTask, setSelectedTask, tasks, setTasks, login, user }) => {

  const listTasks = tasks.map((task) => {
    return (
      <TaskCard 
        key={task.id} 
        taskId={task.id}
        taskName={task.name} 
        taskDur={task.dur} 
        taskNote={task.note} 
        blocksCompleted={task.blocksCompleted} 
        selectedTask={selectedTask} 
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
        login={login}
      />
    ) 
  })
  return (
    <div>
      <h2>Tasks</h2>
      <TaskOptions 
        user={user}
        tasks={tasks}
      />
      <div>
      {listTasks}
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