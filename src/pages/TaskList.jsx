import { useForm } from 'react-hook-form';
import { useTaskState } from './useTaskState';
import { useState } from 'react';
import Task from './Task';
import {
  ChakraProvider,
  Container,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
  Divider,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

export function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);
  const isError = input === '';

  const onSubmit = (data) => {
    const { taskName, taskDescription } = data;
    addTask(taskName, taskDescription || '');
    reset();
  };

  const sendTasksToServer = () => {
    const data = tasks.map(task => ({
      name: task.name,
      description: task.description
    }));

    // Aquí va la lógica para enviar los datos al servidor

    console.log('Tareas enviadas al servidor:', data);
  };

  return (
    <Box bg="gray.300">
      <ChakraProvider>
        <Container maxW="lg" py={8} bg="gray.800" color="white">
          <Text fontSize="3xl" fontWeight="bold">Lista de Actividades</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} mt={5} align="start">
              <FormControl isInvalid={isError}>
                <FormLabel>Nombre de la tarea::</FormLabel>
                <Input
                  type='Task Name'
                  {...register('taskName', { required: true, minLength: 3 })}
                  onChange={handleInputChange}
                />
                {!isError && <FormHelperText color="gray.300">Ingrese una descripción de la tarea (opcional)</FormHelperText>}
                {isError && <FormErrorMessage color="red.300">El nombre de la tarea es obligatorio.</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Descripción de la tarea:</FormLabel>
                <Input type="text" {...register('taskDescription', { defaultValue: '' })} />
              </FormControl>
              <Button type="submit" colorScheme="blue">Agregar Tarea</Button>
            </VStack>
          </form>

          <VStack spacing={3} mt={5} align="start">
            {tasks.map((task, index) => (
              <>
                <Task
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
                {index !== tasks.length - 1 && <Divider />}
              </>
            ))}
          </VStack>
        </Container>
        <Container py={4}>
          <Button onClick={sendTasksToServer} rightIcon={<CheckIcon />} colorScheme="green">Enviar</Button>
        </Container>
      </ChakraProvider>
    </Box>
  );
}
