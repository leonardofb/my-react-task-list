import React, { useState } from 'react';
import Task from './Task';

function TaskList() {
  const tasks = [
    { id: 1, name: 'Atender cliente 8 am   ', completed: false},
    { id: 2, name: 'Instalar sistemas de camaras de seguridad   ', completed: "" },
    { id: 3, name: 'Realizar Actividades de ADA SCHOOL  ', completed: "" },
    { id: 4, name: 'Llamar a mi Madre   ', completed: "" },
    { id: 4, name: 'Sacar la basura de los Gatos    ', completed: ""}
  ];

  return (
    <ul>
     <div class="task-list">
    <div class="task">
      {tasks.map(task => (
        <Task key={task.id} name={task.name} completed={task.completed} />
      ))}
    </div>
    </div>
    </ul>
  );
}

export default TaskList;