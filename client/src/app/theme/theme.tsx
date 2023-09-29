"use client"
import { createTheme } from "@mui/material/styles";
import { dark } from "@mui/material/styles/createPalette";

export const DarkTheme= createTheme({
palette:{
    mode:"dark",
    primary:{
        main:"#1F6FFF"
    }
}
    }
);
export const LightTheme=createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#FFFFFF"
        }
    } 
})