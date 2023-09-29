 "use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ModalAdd from "./ModalAdd";
import {updateNewTask } from "../app/api"
import { useFormik } from 'formik';
import * as Yup from 'yup';


interface EditFormProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  title: string;
  text: string;
  onUpdate: (taskId: string, newTitle: string, newText: string) => void;
}

const EditForm: React.FC<EditFormProps> = ({
  isOpen,
  onClose,
  taskId,
  title,
  text,
  onUpdate,
}) => {
  
  const formik = useFormik({
    initialValues: {
      title: title,
      text: text,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required'),
      text: Yup.string()
        .required('Text is required'),
    }),
    onSubmit: async (values) => {
      try {
        await updateNewTask(taskId, values.title, values.text);
        console.log("Task updated!");
        onUpdate(taskId, values.title, values.text);
           formik.resetForm();
        onClose();
        
      } catch (error) {
        console.error("Couldn't update the task:", error);
      }
    },
  });

  return (
    <ModalAdd open={isOpen} handleClose={onClose}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          width: "100%",
          maxHeight: "100vh",
          "@media (max-width: 600px)": {
            width: "90%",
          },
          "@media (min-width: 601px) and (max-width: 960px)": {
            width: "70%",
          },
        }}
      >
        <Typography variant="h3" component="h2">
          Change your task
        </Typography>
        <TextField
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          label="Title"
          multiline
          maxRows={4}
          variant="outlined"
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <TextField
          id="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
          label="Task"
          multiline
          maxRows={6}
          sx={{ width: "100%" }}
        />
        <Button type="submit" variant="contained" color="primary" className="mt-4">
          Save Changes
        </Button>
      </Box>
    </ModalAdd>
  );
};

export default EditForm;