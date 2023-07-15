import { useState, useEffect } from 'react';

export function useTaskState(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);

  const generateId = () => {
    const timestamp = new Date().getTime();
    return timestamp;
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (taskName, taskDescription) => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: generateId(),
        name: taskName,
        description: taskDescription,
        completed: false
      };

      updateTasks([...tasks, newTask]);
    }
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });

    updateTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    updateTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    updateTasks([]);
  };
  const deleteCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    updateTasks(updatedTasks);
  };
  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    deleteCompletedTasks
  };
}