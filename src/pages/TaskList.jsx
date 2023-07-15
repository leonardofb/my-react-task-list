//TaskList.jsx
import Task from './Task';
import React,{ useState } from 'react';
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
import { useColorMode, useBoolean } from '@chakra-ui/react';
import Alert from './Alert';

export function TaskList() {
  const { tasks, addTask, updateTask, deleteTask, deleteAllTasks, deleteCompletedTasks } = useTaskState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [input, setInput] = useState('');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteAllAlert, setShowDeleteAllAlert] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const buttonBg = useColorModeValue('teal.500', 'teal.200');
  const buttonColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'black');
  const completedTasksCount = tasks.filter(task => task.completed).length;

  const createTask = (taskName, taskDescription) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newTask = addTask(taskName, taskDescription || '');
        resolve(newTask);
      }, 0);
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
    <VStack spacing={4} align="stretch">
      <Box maxW="lg" py={8}>
        <Flex justifyContent="space-between" alignItems="center">
        <Box bg={colorMode === 'dark' ? "gray.700" : "gray.200"} color={colorMode === 'dark' ? "white" : "gray.800"}>
          <Text fontSize="3xl" fontWeight="bold">
           Task List
          </Text>
          </Box>
          <Button
            colorScheme="teal"
            bg={buttonBg}
            color={buttonColor}
            size="sm"
            onClick={toggleColorMode}
          >
            Toggle to {colorMode === 'dark' ? 'light' : 'dark'} mode
          </Button>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text color={labelColor}>Name of the homework:</Text>
            <Input
              type="text"
              placeholder="Enter your Task"
              {...register('taskName', { required: true, minLength: 3 })}
              mt={2}
            />
            {errors.taskName && (
              <Text color="red.300" mt={1}>
                Description must have at least three letters.
              </Text>
            )}
          </Box>

          <Box>
            <Text color={labelColor}>Task Description:</Text>
            <Input
              type="text"
              placeholder="Enter the description"
              {...register('taskDescription', { defaultValue: '' })}
              mt={2}
            />
            <Text color={labelColor} mt={1}>
              Enter the task description. (optional)
            </Text>
          </Box>

          <Flex alignItems="center" mt={3}>
            <Button
              bg={buttonBg}
              color={buttonColor}
              mt={4}
              type="submit"
              variant="solid"
              colorScheme="telegram"
              leftIcon={<AddIcon />}
              size="sm"
            >
              Add Task
            </Button>

            <Box ml="auto">
              <Text>
                Completed tasks: {completedTasksCount}/{tasks.length}
              </Text>

              <Button
                onClick={handleOpenDeleteCompletedAlert}
                leftIcon={<DeleteIcon />}
                colorScheme="teal"
                bg={buttonBg}
                color={buttonColor}
                mt={4}
                py={4}
                size="sm"
              >
                All Comple
              </Button>

              <Alert
                isOpen={showDeleteAlert}
                onClose={handleCloseDeleteCompletedAlert}
                onConfirm={confirmDeleteCompleted}
                cancelText="Cancel"
                confirmText="Delete"
                title="Confirm Deletion"
                message="Are you sure you want to delete all completed tasks? This action cannot be undone."
              />
            </Box>
          </Flex>
        </form>

        <Box maxH="200px" overflowY="scroll">
          <VStack spacing={2} mt={3} align="start">
            {tasks.map((task, index) => (
              <React.Fragment key={index}>
                <Text>Tarea: {index + 1}</Text>
                <Task task={task} updateTask={updateTask} deleteTask={deleteTask} />
                {index !== tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </VStack>
        </Box>
      </Box>

      <Button
        onClick={handleOpenDeleteAllAlert}
        colorScheme="teal"
        bg={buttonBg}
        color={buttonColor}
        mt={4}
        py={4}
        size="sm"
        leftIcon={<DeleteIcon />}
        rightIcon={<RepeatIcon />}
      >
        Delete All
      </Button>

      <Alert
        isOpen={showDeleteAllAlert}
        onClose={handleCloseDeleteAllAlert}
        onConfirm={confirmDeleteAll}
        cancelText="Cancel"
        confirmText="Delete"
        title="Confirm Deletion"
        message="Are you sure you want to delete all tasks? This action cannot be undone."
      />

      <Button
        onClick={sendTasksToServer}
        rightIcon={<CheckIcon />}
        colorScheme="green"
        mt={4}
        size="sm"
      >
        Send Tasks to Server
      </Button>
    </VStack>
  );
}
