import React from 'react';
import './Task.css';

function Task(props) {
  return (
    <li>
      <h1>
      <input type="checkbox" checked={props.completed} readOnly />
      
      <span style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
        {props.name}
      </span>
      
      <button class="icon-button" type="submit"><img src="editar.gif" alt="Editar" class="icon"/></button>
      
      <button type="submit"><img src="eliminar.gif"/>Eliminar</button> 
      </h1>
    </li>
  );
}

export default Task;