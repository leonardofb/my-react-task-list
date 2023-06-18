import React from 'react';
import { useForm } from 'react-hook-form';
import useTaskState from './useTaskState';
import Task from './Task';
import './TaskList.css';

function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { taskName, taskDescription } = data;
    addTask(taskName, taskDescription || '');
    reset();
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
          <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" id="taskName" {...register('taskName', { required: true, minLength: 3 })} />
          {errors.taskName && errors.taskName.type === 'minLength' && (
            <p className="error-message">El nombre de la tarea debe tener al menos 3 letras.</p>
          )}
        </div>

        <div>
          <label htmlFor="taskDescription">Task Description:</label>
          <input type="text" id="taskDescription" {...register('taskDescription', { defaultValue: '' })} />
        </div>

        <button type="submit">Agregar Tarea</button>
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


