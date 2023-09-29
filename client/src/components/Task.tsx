"use client";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { deleteTask } from "@/app/api";
import EditForm from "./EditForm"; // Import the EditForm component

interface TaskProps {
  title: string;
  text: string;
  id: string;
  taskStatus: "inProgress" | "done";
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, newTitle: string, newText: string) => void;
  handleMarkAsDone: (taskId: string) => void;
  
}

const Task: React.FC<TaskProps> = ({
  onDelete,
  text,
  taskStatus,
  title,
  id,
  onUpdate,
  handleMarkAsDone,
  
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [isDone, setIsDone] = useState(false);

  
const handleDelete = async () => {
    try {
        await deleteTask(id);
        setTimeout(() => {
            onDelete(id);
        }, 100); // Delay for 100ms
    } catch (error) {
        console.error("Couldn't delete the task:", error);
    }
};
  const handleEditClick = () => {
    // Initialize the states for editing with the current values
    setNewTitle(title);
    setNewText(text);
    setIsEditMode(true);
  };

  const handleCloseModal = () => {
    setIsEditMode(false);
  };

  return (
    <div

      className={`w-full flex flex-col md:flex-row justify-between items-center h-auto mb-4 pt-5 ${
        taskStatus === "done"
          ? "bg-gray-300"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200 via-purple-400 to-purple-800"
      }`}
      style={{
        textDecoration: taskStatus === "done" ? "line-through" : "none",
      }}
    >
      <CardContent sx={{ mb: { xs: 2, md: 1.5 } }}>
        <Typography sx={{ mb: { xs: 2, md: 1.5 } }} color="text.secondary">
          {title}
        </Typography>

        <Typography sx={{ mb: { xs: 2, md: 1.5 } }} color="text.secondary">
          {text}
        </Typography>
      </CardContent>

      <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:space-x-4">
        <CardActions>
          <Button onClick={handleEditClick} disabled={taskStatus === "done"}>
            <CreateOutlinedIcon sx={{
      ':hover': {
        color: 'green',
      },
      ':focus': {
        color: 'green',
      }
    }} />
          </Button>
          <Button onClick={handleDelete} disabled={taskStatus === "done"}>
            <DeleteOutlineIcon  sx={{
      ':hover': {
        color: 'red',
      },
      ':focus': {
        color: 'red',
      }
    }}/>
          </Button>
        </CardActions>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={taskStatus === "done"}
                onChange={() => {
                  if (taskStatus === "inProgress") {
                    handleMarkAsDone(id);
                  }
                }}
              />
            }
            label="Done"
          />
        </FormGroup>
      </div>

      {isEditMode && (
        <EditForm
          isOpen={isEditMode}
          onClose={handleCloseModal}
          taskId={id}
          title={newTitle}
          text={newText}
          onUpdate={onUpdate} // Pass onUpdate as a prop
        />
      )}
    </div>
  );
};

export default Task;
