"use client";
import * as React from "react";
import { Modal, Button, Box, useMediaQuery, useTheme } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface ModalAddProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode; // Make children optional
}

export default function ModalAdd({
  open,
  handleClose,
  children,
}: ModalAddProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Set the width to auto
          padding: "30px",
          background: "white",
          borderRadius: "4px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%", // Adjust the width to your liking
          maxHeight: "100vh",
          // Responsive styles using media queries
          "@media (max-width: 600px)": {
            width: "90%", // Adjust the width for smaller screens
          },
          "@media (min-width: 601px) and (max-width: 960px)": {
            width: "70%", // Adjust the width for medium-sized screens
          },
          // Adjust the max height to your liking
        }}
      >
        {children}
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            border: "none",
            fontSize: "20px",
            fontWeight: "600",
            background: "transparent",
            borderRadius: "50%",
            padding: "0",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "violet", 
            },
            "&:focus": {
              backgroundColor: "violet", // Change the background color on focus
              color: "white",
            },
            
          }}
          onClick={handleClose}
        >
          X
        </Button>
      </Box>
    </Modal>
  );
}
