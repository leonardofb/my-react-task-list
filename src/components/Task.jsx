import React, { useState, useEffect } from 'react';
import './Task.css';

function Task(props) {
  const [completed, setCompleted] = useState(props.completed);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(props.name);
  const [editedName, setEditedName] = useState(props.name);
/*
  useEffect(() => {
    setCompleted(getTaskState(props.id)?.completed || props.completed);
  }, [props.completed]);
*/
useEffect(() => {
  const taskState = getTaskState(props.id);
  if (taskState) {
    setCompleted(taskState.completed);
    setEditedName(taskState.name);
  } else {
    setCompleted(props.completed);
    setEditedName(props.name);
  }
}, [props.id, props.completed, props.name]);

useEffect(() => {
  const taskState = getTaskState(props.id);
  if (taskState) {
    setCompleted(taskState.completed);
  } else {
    setCompleted(props.completed);
  }
}, [props.id, props.completed]);

  const handleCheckboxChange = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    props.onUpdate(props.id, newCompleted);
   // saveTaskState(props.id, newCompleted, editedName);
    if (newCompleted) {
      saveTaskState(props.id, newCompleted, editedName);
    } else {
      removeTaskState(props.id);
    }
  };

  const handleDeleteButtonClick = () => {
    if (completed) {
      console.log('Eliminar tarea:', props.name);
      props.onDelete(props.id);
      removeTaskState(props.id);
    }
  };

  const handleEditButtonClick = () => {
    setEditing(true);
  };

  const handleSaveButtonClick = () => {
    setEditing(false);
    props.onUpdate(props.id, { completed, name: editedName });
    saveTaskState(props.id, completed, editedName);
  };

  const handleCancelButtonClick = () => {
    setEditing(false);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const saveTaskState = (taskId, completed, name) => {
    const taskState = {
      completed,
      name,
    };
    localStorage.setItem(`task_${taskId}`, JSON.stringify(taskState));
  };

  const removeTaskState = (taskId) => {
    localStorage.removeItem(`task_${taskId}`);
  };

  const getTaskState = (taskId) => {
    const taskState = localStorage.getItem(`task_${taskId}`);
    return taskState ? JSON.parse(taskState) : null;
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
              value={editedName}
              onChange={handleNameChange}
            />
          ) : (
            <span
              className="task-name"
              style={{ textDecoration: completed ? 'line-through' : 'none' }}
            >
              {props.name}
            </span>
          )}

          <div className="button-group">
            {editing ? (
              <>
                <button
                  id={`save-button-${props.index}`}
                  className="save-button"
                  type="button"
                  onClick={handleSaveButtonClick}
                ><img src="/src/components/imagenes/guardar.gif" alt="save" className="icon" />
                  Save
                </button>
                <button
                  id={`cancel-button-${props.index}`}
                  className="cancel-button"
                  type="button"
                  onClick={handleCancelButtonClick}
                ><img src="/src/components/imagenes/agregar2.png" alt="cancel" className="icon" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                id={`edit-button-${props.index}`}
                className="edit-button"
                type="button"
                onClick={handleEditButtonClick}
              ><img src="/src/components/imagenes/editar.gif" alt="edit" className="icon" />
                Edit
              </button>
            )}
            <button
              id={`delete-button-${props.index}`}
              className="delete-button"
              type="button"
              onClick={handleDeleteButtonClick}
            ><img src="/src/components/imagenes/eliminar2.gif" alt="Eliminar" className="icon" />
            Delete
            </button>
          </div>
        </div>
      </h1>
    </li>
  );
}

export default Task;
