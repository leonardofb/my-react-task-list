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
        <input id={`checkbox-${props.index}`} type="checkbox" checked={completed} onChange={handleCheckboxChange} />
        <span className="task-name" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
          {props.name}
        </span>
        <button id={`edit-button-${props.index}`} className="edit-button" type="submit">
          <img src="/src/components/imagenes/agregar.png" alt="Modificar" className="icon" />
          Modificar
        </button>
        <button id={`delete-button-${props.index}`} className="delete-button" type="submit">
          <img src="/src/components/imagenes/eliminar2.gif" alt="Eliminar" className="icon" />
          Eliminar
        </button>
        </h1>
      </li>
    );
  }
   export default Task;
  
  
  
  
  
  

    
  /*return (
   <li>
      <h1>
        <input id={`checkbox-${uniqueId}`} type="checkbox" checked={completed} onChange={handleCheckboxChange}/>
        <span className="task-name" style={{ textDecoration: completed ? 'line-through' : 'none' }}>{props.name}</span>
        <button id={`edit-button-${uniqueId}`} className="edit-button" type="submit"><img src="/src/components/imagenes/agregar.png" alt="Modificar" className="icon" />Modificar</button>
        <button id={`delete-button-${uniqueId}`} className="delete-button" type="submit"> <img src="/src/components/imagenes/eliminar2.gif" alt="Eliminar" className="icon"/>Eliminar </button>
      </h1>
      
   </li>
  );


}
export default Task;
*/