"use client";
import * as React from "react";
import { Button, ButtonProps, buttonClasses } from "@mui/base/Button";
import { styled, Theme } from "@mui/system";
import Add from "@mui/icons-material/Add";
import ModalAdd from "./ModalAdd";
import { useState } from "react";
import Form from "./Form";
import { TaskProps } from "./TodoList";



type AddButtonProps = {
  onTaskAdd: (newTask: TaskProps) => void;
  variant?: 'contained' | 'outlined' | 'text'; // If using Material-UI's Button component
};
const AddButton: React.FC<AddButtonProps> = ({ onTaskAdd, variant = "contained" }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     <Button 
    // variant={variant}
    sx={{
        width: "100%",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", // Gradient from your class
        color: "white",
        '&:hover': {
            backgroundColor: "transparent",
            transform: "scale(1.05)",
            color: "red.300",
            background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
        },
        '&:focus-visible': {
            boxShadow: "0 0 0 4px rgba(186, 134, 252, 0.5)", // Equivalent of focus:ring-4 focus:ring-purple-200
        },
        textTransform: "none",
        borderRadius: "8px",
        fontSize: "0.875rem", // Equivalent of text-sm
        px: 5,
        py: 2.5,
        mr: 2,
        mb: 2
    }}
    onClick={handleOpen}
>
    Add task 
</Button>

      {open && (
        <ModalAdd open={open} handleClose={handleClose}>
          <Form onTaskAdd={onTaskAdd} onCloseModal={handleClose} />
        </ModalAdd>
      )}
    </>
  );
};

// const blue = {
//   50: "#fff0ff",
//   100: "#ffc2fb",
//   200: "#f399ec",
//   400: "#ff33f1",
//   500: "#ff00d9",
//   600: "#e500e5",
//   800: "#910099",
//   900: "#75005c",
// };

// const CustomButtonRoot = styled(ButtonRoot)(
//   ({ theme }: { theme: Theme }) => `
//   overflow: visible;
//   cursor: pointer;
//   --main-color: ${theme.palette.mode === "light" ? blue[100] : blue[600]};
//   --hover-color: ${theme.palette.mode === "light" ? blue[600] : blue[900]};
//   --active-color: ${theme.palette.mode === "light" ? blue[800] : blue[600]};

//   & polygon {
//     fill: transparent;
//     transition: all 800ms ease;
//     pointer-events: none;
//   }

//   & .bg {
//     stroke: var(--main-color);
//     stroke-width: 1;
//     filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
//     fill: transparent;
//   }

//   & .borderEffect {
//     stroke: var(--main-color);
//     stroke-width: 2;
//     stroke-dasharray: 150 600;
//     stroke-dashoffset: 150;
//     fill: transparent;
//   }

//   &:hover,
//   &.${buttonClasses.focusVisible} {
//     .borderEffect {
//       stroke-dashoffset: -600;
//     }

//     .bg {
//       fill: var(--hover-color);
//     }
//   }

//   &:focus,
//   &.${buttonClasses.focusVisible} {
//     outline: 2px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
//     outline-offset: 2px;
//   }

//   &.${buttonClasses.active} {
//     & .bg {
//       fill: var(--active-color);
//       transition: fill 300ms ease-out;
//     }
//   }

//   & foreignObject {
//     pointer-events: none;

//     & .content {
//   font-size: 1rem;
//   font-family: IBM Plex Sans, sans-serif;
//   font-weight: 600;
//   line-height: 1.5;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--main-color);
//   text-transform: uppercase;
// }


//     & svg {
//       margin: 0 5px;
//     }
  // }`
// );

export default AddButton;
