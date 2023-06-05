import React, { useState, useEffect } from 'react';
import Task from './Task';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  

  const generateId = () => {
    const timestamp = new Date().getTime();
    return timestamp;
  };

  useEffect(() => {
    // Cargar las tareas desde localStorage al inicio
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = () => {
    const taskName = prompt('Ingrese el nombre de la tarea:');
    if (taskName) {
      const newTask = {
        id: generateId(),
        name: taskName,
        completed: false
      };
      setTasks([...tasks, newTask]);

      // Guardar las tareas actualizadas en localStorage
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
  };

  const handleUpdateTask = (taskId, newCompleted) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);

    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
}

export default TaskList;
