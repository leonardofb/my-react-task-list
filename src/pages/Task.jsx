import React, { useState } from 'react';
import { Text, Button, Input, Icon, Textarea, Flex, VStack, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

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
    setEditedTask((prevState) => ({
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
    <VStack spacing={4} align="left">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
            mb={2}
          />
          <Textarea
            placeholder="Escribe aquí"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            mb={2}
          />
          {error && <Text color="red.500">{error}</Text>}

          <Flex>
            <Button type="submit" variant="solid" colorScheme="green" size="sm" mr={2}>
              Guardar
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancelar
            </Button>
          </Flex>
        </form>
      ) : (
        <VStack align="left" spacing={2}>
          <Text textDecoration={task.completed ? 'line-through' : 'none'} color={task.completed ? 'red.500' : 'inherit'}>
            {task.name}
          </Text>
          <Text>{task.description}</Text>

          <Flex>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              colorScheme="teal"
              leftIcon={<EditIcon boxSize={4} />}
            >
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleComplete}
              colorScheme="teal"
              leftIcon={<CheckIcon boxSize={4} />}
            >
              {task.completed ? 'Desmarcar' : 'Completar'}
            </Button>
            {task.completed && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                colorScheme="red"
                leftIcon={<DeleteIcon boxSize={4} />}
              >
                Eliminar
              </Button>
            )}
          </Flex>
        </VStack>
      )}
    </VStack>
  );
}

export default Task;
