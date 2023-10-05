"use client";
import Task from "./Task";
import { useState, useEffect } from "react";
import AddButton from "./AddBtn";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  
} from "react-beautiful-dnd";
import { useSearch } from "../app/context/SearchContext";
import { Box, Paper, Typography, List, ListItem } from "@mui/material";
export interface TaskProps {
  id: string;
  title: string;
  text: string;
  status: "inProgress" | "done";
}

interface TodoListProps {
  tasks: TaskProps[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);
  const [isClient, setIsClient] = useState(false);
  const { searchTerm } = useSearch();
useEffect(() => {
  setIsClient(true);
}, []);
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination or if the source and destination are the same, return
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "done") {
        removed.status = "done";
      } else {
        removed.status = "inProgress";
      }
    }

    const destinationIndex =
      tasks.findIndex((task) => task.status === destination.droppableId) +
      destination.index;
    reorderedTasks.splice(destinationIndex, 0, removed);

    setTasks(reorderedTasks);
  };

  const handleMarkAsDone = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "done" } : task
      )
    );
  };
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "inProgress"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "done");

  const handleTaskDeletion = (deletedTaskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deletedTaskId)
    );
  };
  const handleTaskAddition = (newTask: TaskProps) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const handleTaskUpdate = (
    taskId: string,
    newTitle: string,
    newText: string
  ) => {
    // Find the task to update and update it in the state
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle, text: newText } : task
      )
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
     {isClient && ( 
        <Box>
          <AddButton onTaskAdd={handleTaskAddition} />

          <Box display="flex"  justifyContent="space-between" alignItems="center">
            {["inProgress", "done"].map((status, index) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                   <Paper
                ref={provided.innerRef}
                elevation={3}
                sx={{
                  flex: 1,
                  margin: index === 0 ? "0 16px 0 0" : "0 0 0 16px",
                  padding: 2,
                  background: 'transparent',
                 
                   
                }}
              >
                    <Typography variant="h6">
                  {status === "inProgress" ? "In Progress" : "Done"}
                    </Typography>
                    
                    <List {...provided.droppableProps} sx={{ height:"100vh"}}>
                      {filteredTasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
                            index={index}
                            isDragDisabled={false}
                          >
                            {(provided) => (
                            <ListItem
                                ref={provided.innerRef} // set ref here
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{ background: 'transparent', boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' }} 
                              >
                                <Task
                                  handleMarkAsDone={handleMarkAsDone}
                    
                                  title={task.title}
                                  text={task.text}
                                  id={task.id}
                                  taskStatus={task.status}
                                  onUpdate={handleTaskUpdate}
                                  onDelete={handleTaskDeletion}
                                />
                              </ListItem>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </List>
                  </Paper>
                )}
              </Droppable>
            ))}
          </Box>
        </Box>
     )} 
    </DragDropContext>
   );
};

export default TodoList;
