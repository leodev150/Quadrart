import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PaginaNaoExiste = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0){
          navigate("/home");
        } else {
          return prevCount - 1;
        }
      });
    }, 1000)

    return () => clearInterval(timer);
  }, [])

  return (
    <Box width="100%" minHeight="80vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography
        fontFamily="Acidic"
        fontSize="5vw"
        color="white"
        textAlign="center"
      >
        Sentimos muito!
      </Typography>
      <Typography
        fontFamily="Acidic"
        fontSize="4vw"
        color="white"
        textAlign="center"
      >
        Essa rota é inexistente!
      </Typography>
      <Typography
        fontFamily="Acidic"
        fontSize="3vw"
        color="white"
        textAlign="center"
      >
        Redirecionando para a página inicial em {count} segundos.
      </Typography>
    </Box>
  )
}

export default PaginaNaoExiste;