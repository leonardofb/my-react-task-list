import React, { useState, useEffect } from 'react';
import './Task.css';

function Task(props) {
  const [completed, setCompleted] = useState(props.completed);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(props.name);
  
  useEffect(() => {
    // Cargar el estado de completado de la tarea desde props.completed
    setCompleted(props.completed);
   
  }, [props.completed]);

  const handleCheckboxChange = () => {
    // Actualizar el estado de completado y llamar a la función onUpdate
    const newCompleted = !completed;
    setCompleted(newCompleted);
    props.onUpdate(props.id, newCompleted);
  };

  const handleDeleteButtonClick = () => {
    if (completed) {
      console.log('Eliminar tarea:', props.name);
      props.onDelete(props.id);
    }
  };
  const handleEditButtonClick = () => {
    setEditing(true);
  };
  
  const handleSaveButtonClick = () => {
    // Realizar acciones necesarias para guardar los cambios (actualizar el nombre de la tarea, etc.)
    // ...
    setEditing(false); // Desactivar el modo de edición
    props.onUpdate(props.id, updatedName); // Llamar a la función onUpdate con la tarea modificada
  };
  
  const handleCancelButtonClick = () => {
    setEditing(false); // Desactivar el modo de edición
  };
  
  return (
    <li>
      <h1>
        <div className="task-container">
        <input
          id={`checkbox-${props.index}`}
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        {editing ? (
          <input
            type="text"
            value={updatedName}
            onChange={e => setUpdatedName(e.target.value)}
          />
        ) : (
          <span className="task-name" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {props.name}
          </span>
        )}
          <div className="button-group">
            <button id={`edit-button-${props.index}`} className="edit-button" type="submit" onClick={handleEditButtonClick}>
              <img src="/src/components/imagenes/agregar.png" alt="Edit" className="icon" /></button>
            <button
              id={`delete-button-${props.index}`}
              className="delete-button"
              type="submit"
              onClick={handleDeleteButtonClick}
            >
              <img src="/src/components/imagenes/eliminar2.gif" alt="Eliminar" className="icon" />
              Delete
            </button>
            <button
              id={`save-button-${props.index}`}
              className="save-button"
              type="submit"
              onClick={handleSaveButtonClick}
            >
              <img src="/src/components/imagenes/eliminar2.gif" alt="save" className="icon" />
              save
            </button>
          </div>
        </div>
      </h1>
    </li>
  );
}

export default Task;

   