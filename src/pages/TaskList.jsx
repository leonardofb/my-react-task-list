import React from 'react';
import { useForm } from 'react-hook-form';
import {useTaskState} from './useTaskState';
import Task from './Task';
import styles from './styles/TaskList.module.css';

export function TaskList() {
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
    
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <label htmlFor={styles.taskName}>   Task Name:</label>
          <input type="text" className={styles.taskName} {...register('taskName', { required: true, minLength: 3 })} />
          {errors.taskName && errors.taskName.type === 'minLength' && (
            <p className="error-message">El nombre de la tarea debe tener al menos 3 letras.</p>
          )}
        </div>

        <div className={styles.container}>
          <label htmlFor={styles.taskName}>  Task Description: </label>
          <input type="text" className={styles.taskDescription} {...register('taskDescription', { defaultValue: '' })} />
        <button type="submit">Agregar Tarea</button>
        </div>

        
      </form>

      <ul className={styles.tasklist}>
        {tasks.map(task => (
          <li className={styles.li} key={task.id} >
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




