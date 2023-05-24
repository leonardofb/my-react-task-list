import React from 'react';

function Task(props) {
  return (
    <li>
      <input type="checkbox" checked={props.completed} readOnly />
      
      <span style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
        {props.name}
      </span>
      <button type="submit"><img src="editar.gif"/>Editar</button>
      <button type="submit"><img src="eliminar.gif"/>Eliminar</button>
    </li>
  );
}

export default Task;