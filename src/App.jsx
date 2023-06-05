import React from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import './App.css'

function App() {
  return (
     <div>
      <Header title="My React Lista de tareas"/>
        <TaskList/>
    </div>
  );
}
export default App;