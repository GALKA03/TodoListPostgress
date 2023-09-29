"use client";
import * as React from "react";
import { Button, ButtonProps, buttonClasses } from "@mui/base/Button";
import { styled, Theme } from "@mui/system";
import Add from "@mui/icons-material/Add";
import ModalAdd from "./ModalAdd";
import { useState } from "react";
import Form from "./Form";
import { TaskProps } from "./TodoList";

// const ButtonRoot = React.forwardRef(function ButtonRoot(
//   props: React.PropsWithChildren<{}>,
//   ref: React.ForwardedRef<any>
// ) {
//   const { children, ...other } = props;

//   return (
//     <svg
     
//       height="50"
//       viewBox="0 0 150 50"
//       preserveAspectRatio="xMidYMid meet"
//       {...other}
//       ref={ref}
//     >
//       <polygon points="0,50 0,0 150,0 150,50" className="bg w-full" />
//       <polygon points="0,50 0,0 150,0 150,50" className="borderEffect w-full" />
//       <foreignObject x="30%" y="3" width="50%" height="50">
//         <div className="content">{children}</div>
//       </foreignObject>
//     </svg>
//   );
// });

// const SvgButton = React.forwardRef(function SvgButton(
//   props: ButtonProps,
//   ref: React.ForwardedRef<any>
// ) {
//   return (
//     <Button
//       className="w-full mb-4"
//       {...props}
//       slots={{ root: CustomButtonRoot }}
//       ref={ref}
//     />
//   );
// });
interface AddButtonProps {
  onTaskAdd: (newTask: TaskProps) => void;
}
const AddButton: React.FC<AddButtonProps> = ({ onTaskAdd }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 
               transform transition-transform duration-300 ease-in-out 
               hover:scale-105 hover:text-red-300 hover:bg-gradient-to-l 
               focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 
               font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleOpen}>
        Add task <Add />
      </button>
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
