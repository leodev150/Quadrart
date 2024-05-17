import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, useMediaQuery } from '@mui/material';
import Item from '../Props/Item';
import Papel from '../../Imagens/Papel_Textura.webp'
import axios from '../../../utils/API/axios';
import EditarQuadroForm from './EditarQuadroForm';


const EditarQuadro = () => {

  useEffect(() => {
    getQuadro();
  }, [])


  const { id } = useParams();
  const [quadro, setQuadro] = useState("");
  const below832 = useMediaQuery("(max-width:832px)");

  const getQuadro = async () => {
    const response = await axios.get(`/quadro/${id}`, {
      withCredentials: "true"
    });

    setQuadro(response.data)
  }

  return (
    <Box display="flex" width="100%" padding="0 30px" flexDirection="column" alignItems="center" marginTop="50px" rowGap="20px" columnGap="30px" minHeight="90vh">
      <Box width="100%" display="flex" justifyContent="center">
        <Typography fontFamily="Acidic" fontSize="clamp(20px,6vw,60px)" color="white">Editar Quadros</Typography>
      </Box>
      <Box
        width="100%"
        maxWidth="1400px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin="20px"
        columnGap={"20px"}
        flexDirection={below832 ? "column" : "none"}
      >
        {!below832 && <Box flex={1} dusokat>
          <Item quadro={quadro} />
        </Box>}
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="grey"
          flex={1.5}
          padding="30px"
          rowGap="30px"
          flexDirection="column"
          sx={{
            backgroundImage: `url(${Papel})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box width="100%" display="flex" flexDirection="column" rowGap="20px">
            <EditarQuadroForm/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default EditarQuadro