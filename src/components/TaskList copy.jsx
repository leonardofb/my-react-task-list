// TaskList.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import useTaskState from './useTaskState';
import Task from './Task';
import './TaskList.css';

function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const { taskName, taskDescription } = data;
    if (taskDescription.trim() !== '') {
      addTask(taskName, taskDescription);
      reset();
    }
  };

  const sendTasksToServer = () => {
    const data = tasks.map(task => ({
      name: task.name,
      description: task.description
    }));

    // Aquí puedes realizar la lógica para enviar los datos al servidor usando fetch u otras bibliotecas

    console.log('Tareas enviadas al servidor:', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Task Form</h2>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" id="taskName" {...register('taskName')} />
        
        </div>

        <div>
          
          <label htmlFor="taskDescription">Task Description:</label>
          <input type="text" id="taskDescription" {...register('taskDescription')} />
       
        </div>

        <button type="submit">Add Task</button>
      </form>

      <ul className="task-print">
        {tasks.map(task => (
          <li className="task-list" key={task.id}>
            <Task
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </li>
        ))}
      </ul>

      <button onClick={sendTasksToServer}>Enviar tareas al servidor</button>
    </div>
  );
}

export default TaskList;
