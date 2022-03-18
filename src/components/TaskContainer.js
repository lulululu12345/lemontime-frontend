import React from 'react'
import TaskCard from './TaskCard'
import AddTask from './AddTask'
import './TaskContainer.css'

const TaskContainer = ({ selectedTask, setSelectedTask, tasks, setTasks }) => {

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
      />
    ) 
  })
  // Figure out how to hide the add button
  return (
    <div>
      <h2>Tasks</h2>
      <div>
      {listTasks}
    </div>
      {/* <Tasks 
        tasks={tasks}  
        selectedTask={selectedTask} 
        setSelectedTask={setSelectedTask}
      /> */}
      <AddTask 
        tasks={tasks} 
        setTasks={setTasks}
      />
    </div>  
  )
}

export default TaskContainer