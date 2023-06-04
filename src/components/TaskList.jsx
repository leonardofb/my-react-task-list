import React from 'react';
import Task from './Task';
import './TaskList.css';

function TaskList() {
  const tasks = [
    { id: 1, name: 'Atender cliente 8 am', completed: false },
    { id: 2, name: 'Instalar sistemas de cámaras de seguridad', completed: "" },
    { id: 3, name: 'Realizar Actividades de ADA SCHOOL', completed: "" },
    { id: 4, name: 'Llamar a mi Madre', completed: "" },
    { id: 5, name: 'Sacar la basura de los Gatos', completed: "" }
  ];

  return (
    <div className="task-list">
      <h1>Hola Mundo</h1>
      <ul>
        {tasks.map((task, index) => (
          <Task key={task.id} name={task.name} completed={task.completed} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
