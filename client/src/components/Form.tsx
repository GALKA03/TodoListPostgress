
import { Fab, Typography,TextField,Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { addNewTask } from '@/app/api';
import { TaskProps } from './TodoList';
import { useFormik } from 'formik';
import * as Yup from 'yup';
interface FormProps {
  onTaskAdd: (newTask: TaskProps) => void;
 onCloseModal: () => void; 
}

const Form: React.FC<FormProps> = ({ onTaskAdd, onCloseModal }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      taskValue: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      taskValue: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const newTask = await addNewTask(values.title, values.taskValue);
        onTaskAdd(newTask);
        formik.resetForm();

          onCloseModal();
         
      } catch (error) {
        console.error('Error creating a new task:', error);
      }
    },
  });

  return (
    <Box
    component="form"
  onSubmit={formik.handleSubmit}
  className='block'
  display="flex"
  flexDirection="column"
      alignItems="center"
      width="100%"
       sx={{ position: "relative", paddingY:"50px", paddingX:"20px"}} 
    >
      <Typography variant="h3" component="h2" sx={{marginBottom:"40px"}}>
        Write your task
      </Typography>

      <TextField
        id="title"
        name="title"
        label="Title"
        multiline
        maxRows={4}
        variant="outlined"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
   sx={{marginBottom:"20px", width:"100%"}}
       
      />

      <TextField
        id="taskValue"
        name="taskValue"
        label="Task"
        multiline
        maxRows={6}
        value={formik.values.taskValue}
        onChange={formik.handleChange}
        error={formik.touched.taskValue && Boolean(formik.errors.taskValue)}
        helperText={formik.touched.taskValue && formik.errors.taskValue}
  sx={{ width:"100%"}}
      />

      <Fab component="button" type="submit" color="secondary" aria-label="add" sx={{position:"absolute", bottom:"0", right:"0"}}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Form;