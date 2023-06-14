//TaskList.jsx
import React from 'react';
import useTaskState from './useTaskState';
import Task from './Task';
import './TaskList.css';

function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskState([]);

  const handleAddTask = () => {
    const taskName = prompt('Ingrese el nombre de la tarea:');
    if (taskName) {
      addTask(taskName);
    }
  };

  return (
    <div className="task-list">
      <h1>ACTIVIDADES DEL MES</h1>
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            index={index}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
}

export default TaskList;