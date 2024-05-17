import React from "react";
import { Box, Typography } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import Papel from "../Imagens/Papel_Textura.webp";
import LoginForm from "./Form/LoginForm";


function Login() {
  return (
    <Box width="100%" display="flex" alignItems="center" flexDirection="column" marginTop="50px" rowGap="30px" minHeight="90vh">
      <Typography
        fontFamily="Acidic"
        fontSize="clamp(20px,6vw,60px)"
        color="white"
      >
        Login
      </Typography>
      <Box
        width="clamp(0px,90%,500px)"
        height="400px"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
        border="1px solid white"
        sx={{
          background: `url(${Papel})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        padding="30px"
        rowGap="25px"
        borderRadius="3px"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          margin="10px"
          rowGap="30px"
        >
          <LoginForm/>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
