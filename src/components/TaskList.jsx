import React from 'react';
import Task from './Task';

function TaskList() {
  const tasks = [
    { id: 1, name: 'Atender cliente 8 am   ', completed: false },
    { id: 2, name: 'Instalar sistemas de camaras de seguridad   ', completed: true },
    { id: 3, name: 'Realizar Actividades de ADA SCHOOL  ', completed: true },
    { id: 4, name: 'Llamar a mi Madre   ', completed: false },
    { id: 4, name: 'Sacar la basura de los Gatos    ', completed: false}
  ];

  return (
    <ol>
      {tasks.map(task => (
        <Task key={task.id} name={task.name} completed={task.completed} />
      ))}
    </ol>
  );
}

export default TaskList;