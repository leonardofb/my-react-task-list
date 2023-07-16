//Task.jsx
import React, { useState } from 'react';
import {
  Text,
  Button,
  Input,
  Icon,
  Textarea,
  Flex,
  VStack,
  useTheme,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';

function Task({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description });
  const [error, setError] = useState('');
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const inputColor = useColorModeValue('gray.800', 'gray.500');
  const inputBgColor = useColorModeValue('gray.600', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whith');
  const [showError, setShowError] = useState(false);

  const handleComplete = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
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

  const handleSave = async () => {
    const updatedTask = {
      ...task,
      name: editedTask.name,
      description: editedTask.description,
    };

    try {
      await updateTask(task.id, updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
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
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedTask.name.length < 3) {
      setError('Description must have at least three (3) letters');
      return;
    }

    handleSave();
  };

  return (
    <VStack spacing={2} align="left">
    {isEditing ? (
      <form onSubmit={handleSubmit}>
        <Box bg={colorMode === 'dark' ? "gray.700" : "gray.200"} color={colorMode === 'dark' ? "white" : "gray.800"}>
           <Input
            colorScheme={colorMode === 'dark' ? 'teal' : 'blue'}
            type="text"
            placeholder="Enter Your Task"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
            color={inputColor}
            bg={inputBgColor}
            w="400px"
          /> 
                 
        </Box>
       
      
        <Input
          colorScheme={colorMode === 'dark' ? 'teal' : 'blue'}
          placeholder="Write the description"
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          mb={1}
          color={inputColor}
          bg={inputBgColor}
          w="400px"
        />
        {error && <Text color="red.500">{error}</Text>}
        
        <Flex>
          <Button type="submit" variant="solid" colorScheme="teal" size="sm" mr={2}>
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </Flex>
      </form>
    ) : (
      <VStack align="left" spacing={1}>
        <Text
          textDecoration={task.completed ? 'line-through' : 'none'}
          color={task.completed ? 'red.500' : 'inherit'}
        >
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
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleComplete}
            colorScheme="teal"
            leftIcon={<CheckIcon boxSize={4} />}
          >
            {task.completed ? 'uncheck' : ''}
          </Button>
          {task.completed && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              colorScheme="red"
              leftIcon={<DeleteIcon boxSize={4} />}
            >
               </Button>
          )}
        </Flex>
      </VStack>
    )}
  </VStack>
  );
}

export default Task;
