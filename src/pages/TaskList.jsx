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
  Flex,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

export function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);
  const isError = input === '';

// Variable para contar tareas completadas
const completedTasksCount = tasks.filter(task => task.completed).length;

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
    <Flex
      direction="column"
      justify="space-evenly"
      align="center"
      w="90%"
      margin="auto"
      border="1px solid red"
      height="100vh"
      >
      
      <ChakraProvider>
        <Container maxW="lg" py={8} bg="gray.800" color="white">
        <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="3xl" fontWeight="bold">Lista de Actividades</Text>
            
        </Flex>
               
          <form onSubmit={handleSubmit(onSubmit) }>
            <VStack spacing={3} mt={5} align="start">  {/* Se usa para apolar verticalmen los BOx */}
              <FormControl isInvalid={isError}>
                <FormLabel>Nombre de la tarea:</FormLabel> 
                 <Input
                  type='Task Name'
                  {...register('taskName', { required: true, minLength: 3 })}
                  onChange={handleInputChange}
                />
                {!isError && <FormHelperText color="gray.300">Debe ingresar la tarea como minimo 3 letras</FormHelperText>}
                {isError && <FormErrorMessage color="red.300">El nombre de la tarea es obligatorio.</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Descripción de la tarea:</FormLabel>
                <Input type="text" {...register('taskDescription', { defaultValue: '' })} />
                {!isError && <FormHelperText color="gray.300">Ingrese la descripción de la tarea. (opcional)</FormHelperText>}
               </FormControl>
               
            </VStack>

               <Flex alignItems="center" mt={3}>
                   <Button type="submit" variant="solid" colorScheme="telegram">Agregar Tarea</Button>
                    <Box ml="auto">
                      <Text>Tareas completadas: {completedTasksCount}/{tasks.length}</Text>
                  </Box>
                </Flex>
            
          </form>

          <VStack spacing={3} mt={5} align="start">
            {tasks.map((task, index) => (
              <>
              
                <Task
                  key={index}     //Me corrigio el error cada tara tiene un llave unica
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
    </Flex>
  );
}
