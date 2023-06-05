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

      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];

        // Guardar las tareas actualizadas en localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        return updatedTasks;
      });
    }
  };

  const handleUpdateTask = (taskId, newCompleted) => {
    setTasks(prevTasks => {
      // Utilizamos la función de actualización del estado para obtener el estado anterior de las tareas
      // y devolver el nuevo estado actualizado
      const updatedTasks = prevTasks.map(task => {
        // Comprobamos si el ID de la tarea coincide con el ID pasado como argumento
        if (task.id === taskId) {
          // Si es así, creamos un nuevo objeto de tarea con la propiedad "completed" actualizada
          return { ...task, completed: newCompleted };
        }
        // Si no coincide, simplemente devolvemos la tarea sin cambios
        return task;
      });
  
      // Guardamos las tareas actualizadas en el localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
      // Devolvemos las tareas actualizadas para actualizar el estado en el componente TaskList
      return updatedTasks;
    });
  };
  

  const handleDeleteTask = taskId => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== taskId);

      // Guardar las tareas actualizadas en localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return updatedTasks;
    });
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
