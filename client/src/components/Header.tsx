"use client";
import {InputBase,  Button,Paper, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../app/context/SearchContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";


const Header = () => {
  const { setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To keep track of login status
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    router.push('/'); 
  };

  return (
    <Box
      component="header"
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  bgcolor="transparent"
  width="100%"
  p={4}
>
      {isLoggedIn && (
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      )}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          background: "transparent",
        }}
      >
        <InputBase
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm(inputValue);
            }
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="search your title"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="button"
          onClick={() => setSearchTerm(inputValue)}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};
export default Header;
