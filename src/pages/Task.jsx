import React, { useState } from 'react';
import './Task.css';

function Task({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description });
  const [error, setError] = useState('');

  const handleComplete = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };
    updateTask(task.id, updatedTask);
  };

  const handleDelete = () => {
    if (task.completed) {
      deleteTask(task.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      name: editedTask.name,
      description: editedTask.description
    };
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ name: task.name, description: task.description });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedTask.name.length < 3) {
      setError('La descripción debe tener al menos tres letras');
      return;
    }

    handleSave();
  };

  return (
    <div className="button-group">
      {isEditing ? (
        <div className="task-container">
          <form onSubmit={handleSubmit}>
            <input 
              type="text-input"
              name="name"
              value={editedTask.name}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
            />
            {error && <div className="error">{error}</div>}

            <button className="save-button" type="submit">
              <img src="/src/components/imagenes/guardar.gif" alt="save" className="icon" />
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              <img src="/src/components/imagenes/undo.png" alt="cancelar" className="icon" />
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <span className={task.completed ? 'task-name completed' : 'task-name'}>
            {task.name}
          </span>
          <p className="task-name-des">{task.description}</p>
          
          
          <button className="edit-button" onClick={handleEdit}>
            <img src="/src/components/imagenes/editar.gif" alt="Editar" className="icon" />
            Edit
          </button>
          <button className="edit-button" onClick={handleComplete}>
            <img src="/src/components/imagenes/completado.png" alt="completada" className="icon" />
            {task.completed ? 'Undo' : 'Completada'}
          </button>
          {task.completed && (
            <button className="delete-button" onClick={handleDelete}>
              <img src="/src/components/imagenes/eliminar.png" alt="eliminar" className="icon" />
              </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Task;
