//TaskList.jsx
import Task from './Task';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTaskState } from './useTaskState';
import {
  ChakraProvider,
  Container,
  Text,
  VStack,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
  Divider,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, RepeatIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import MyTheme from '../theme';
import { useColorMode, useBoolean } from '@chakra-ui/react';
import React, { useRef } from 'react';
import Alert from './Alert';

export function TaskList() {
  const { tasks, addTask, updateTask, deleteTask, deleteAllTasks, deleteCompletedTasks } = useTaskState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [input, setInput] = useState('');
  const isError = input === '';
  const [flag, setFlag] = useBoolean();
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const buttonBg = useColorModeValue('teal.500', 'teal.200');
  const buttonColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whith');
  const { colorMode, toggleColorMode } = useColorMode('dark');
  const leftIcon = colorMode === 'dark' ? <MoonIcon /> : <SunIcon />;

  ///alertas
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteAllAlert, setShowDeleteAllAlert] = useState(false);
  const cancelRef = useRef();

  // Variable para contar tareas completadas
  const completedTasksCount = tasks.filter(task => task.completed).length;

  const createTask = (taskName, taskDescription) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newTask = addTask(taskName, taskDescription || '');
        resolve(newTask);
      }, 0); // Simular un retraso de 3 segundos antes de resolver la promesa
    });
  };

  const onSubmit = async (data) => {
    const { taskName, taskDescription } = data;
    try {
      await createTask(taskName, taskDescription || '');
      reset();
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  const sendTasksToServer = () => {
    const promises = tasks.map(task => {
      return new Promise((resolve, reject) => {
        // Aquí va la lógica para enviar los datos al servidor
        setTimeout(() => {
          resolve(task);
        }, 0); // Simular un retraso de 3 segundos antes de resolver la promesa
      });
    });

    Promise.all(promises)
      .then((data) => {
        console.log('Tareas enviadas al servidor:', data);
      })
      .catch((error) => {
        console.error('Error al enviar las tareas al servidor:', error);
      });
  };

  const [task, setTask] = useState('');
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTask(inputValue);
    setShowError(inputValue.length < 3);
  };

  const handleOpenDeleteCompletedAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleCloseDeleteCompletedAlert = () => {
    setShowDeleteAlert(false);
  };

  const handleOpenDeleteAllAlert = () => {
    setShowDeleteAllAlert(true);
  };

  const handleCloseDeleteAllAlert = () => {
    setShowDeleteAllAlert(false);
  };

  const confirmDeleteCompleted = () => {
    deleteCompletedTasks();
    setShowDeleteAlert(false);
  };

  const confirmDeleteAll = () => {
    deleteAllTasks();
    setShowDeleteAllAlert(false);
  };

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        justify="space-evenly"
        align="center"
        w="90%"
        margin="auto"
        border="1px solid red"
        height="100vh"
        className="task-list-container"
      >
        <Container maxW="lg" py={8} color="white">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="3xl" color={textColor} fontWeight="bold">
              Activities list
            </Text>
          </Flex>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={isError}>
              <FormLabel color={labelColor}>Name of the homework:</FormLabel>
              <Input
                type="Task Name"
                placeholder="Enter your Task"
                _placeholder={{
                  color: useColorModeValue('gray.500', 'gray.600'),
                }}
                _focus={{
                  boxShadow: useColorModeValue('outline', 'outlineDark'),
                }}
                {...register('taskName', { required: true, minLength: 3 })}
                onChange={handleInputChange}
              />
              {showError && (
                <FormHelperText color="red.500">
                  You must enter the task with at least 3 letters.
                </FormHelperText>
              )}
              {isError && (
                <FormErrorMessage color="red.300">
                  The task name is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel color={labelColor}>Task Description:</FormLabel>
              <Input
                type="text"
                placeholder="Enter the description"
                _placeholder={{
                  color: useColorModeValue('gray.400', 'gray.600'),
                }}
                _focus={{
                  boxShadow: useColorModeValue('outline', 'outlineDark'),
                }}
                {...register('taskDescription', { defaultValue: '' })}
              />
              {isError && (
                <FormHelperText color={labelColor}>
                  Enter the task description. (optional)
                </FormHelperText>
              )}
            </FormControl>
            <Flex alignItems="center" mt={3}>
              <ButtonGroup size='sm' isAttached variant='outline'>
                <Button bg={buttonBg} color={buttonColor} mt={4} type="submit" variant="solid" colorScheme="telegram">
                  {<AddIcon />} {/*agregar Tareas */}
                </Button>
              </ButtonGroup>
              <Box ml="auto">
                {/*BORRADO DE TODAS LAS TAREAS COMPLETADAS */}
                <Text>Completed tasks: {completedTasksCount}/{tasks.length}</Text>

                <Button onClick={handleOpenDeleteCompletedAlert} leftIcon={<CheckIcon />} colorScheme="teal" bg={buttonBg} color={buttonColor} mt={4} py={4} size="sm">
                  {<DeleteIcon />} all
                </Button>
                
                <Alert
                  isOpen={showDeleteAlert}
                  onClose={handleCloseDeleteCompletedAlert}
                  onConfirm={confirmDeleteCompleted}
                  cancelText="Cancel"
                  confirmText="Delete"
                  title="Confirmar Eliminación"
                  message="¿Estás seguro de que quieres Delete todas las tareas completadas? Esta acción no se puede deshacer."
                />                
              </Box>
            </Flex>
          </form>

          <Box maxH="200px" overflowY="scroll" className="task-list-container" >

            <VStack spacing={2} mt={3} align="start">
              {tasks.map((task, index) => [
                <label>Tarea: {index + 1}</label>,
                <Task
                  key={index}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />,
                index !== tasks.length - 1 && <Divider key={`divider-${index}`} />,
              ])}
            </VStack>

          </Box>
        </Container>

        <Container py={4}>
          <Button onClick={sendTasksToServer} rightIcon={<CheckIcon />} colorScheme="green">Enviar</Button>
        </Container>
        <Button onClick={handleOpenDeleteAllAlert} colorScheme="teal" bg={buttonBg} color={buttonColor} mt={4} py={4} size="sm">
          {<DeleteIcon />}{<RepeatIcon />}Borrar
        </Button>
        <Alert
          isOpen={showDeleteAllAlert}
          onClose={handleCloseDeleteAllAlert}
          onConfirm={confirmDeleteAll}
          cancelText="Cancel"
          confirmText="Delete"
          title="Confirmar Eliminación"
          message="¿Estás seguro de que quieres Delete todas las tareas? Esta acción no se puede deshacer."
        />

        <Button
          colorScheme="teal"
          bg={buttonBg}
          color={buttonColor}
          mt={4}
          size="sm"
          onClick={toggleColorMode}
        >
          Toggle to {colorMode === "dark" ? "light" : "dark"} mode
        </Button>

      </Flex>
    </ChakraProvider>
  );
}
