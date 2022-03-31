import React from 'react'
import TaskCard from './TaskCard'
import TaskOptions from './TaskOptions'
import AddTask from './AddTask'
import './TaskContainer.css'

const TaskContainer = ({ selectedTask, setSelectedTask, tasks, setTasks, login, user }) => {


  // let taskId
  const listTasks = tasks.map((task) => {

    console.log(task)
    return (
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
      />
    ) 
  })
  return (
    <div>
      <h2>Tasks</h2>
      <TaskOptions 
        user={user}
        tasks={tasks}
        setTasks={setTasks}
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