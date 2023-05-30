import React, { useState, useEffect } from 'react';
import './Task.css';

function Task(props) {
  const [completed, setCompleted] = useState(props.completed);

  useEffect(() => {
    // Cargar el estado de completado de la tarea desde localStorage
    const storedCompleted = localStorage.getItem(props.name);
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, [props.name]);

  const handleCheckboxChange = () => {
    // Actualizar el estado de completado y almacenarlo en localStorage
    const newCompleted = !completed;
    setCompleted(newCompleted);
    localStorage.setItem(props.name, JSON.stringify(newCompleted));
  };

  return (
    <li>
      <h1>
        <input type="checkbox" checked={completed} onChange={handleCheckboxChange}
        />

        <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{props.name}</span>

        <button className="icon-button" type="submit">
          <img src="editar.gif" alt="Modificar" className="icon" />
        </button>

        <button type="submit">
          <img src="eliminar.gif" />Eliminar
        </button>
      </h1>
    </li>
  );
}
export default Task;