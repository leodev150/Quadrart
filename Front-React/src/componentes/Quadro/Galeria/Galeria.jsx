import React, { useState, useEffect } from 'react';
import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material';
import useAxiosPrivate from '../../../utils/API/useAxiosPrivate';
import Item from '../Props/Item';
import { toast } from 'react-toastify';

const Galeria = () => {
  const [isLoading, setLoading] = useState(true);
  const [quadros, setQuadros] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const below1300 = useMediaQuery("(max-width:1300px)");
  const below870 = useMediaQuery("(max-width:870px)");

  const getQuadros = async () => {
    try {
      const response = await axiosPrivate.get('/quadro')
      setQuadros(response.data);
      setLoading(false);
    } catch (e) {
      toast.error("Houve um erro buscando os quadros");
      setLoading(false)
    }
  }
  useEffect(() => {
    getQuadros();
  }, []);

  return (
    <Box width="100%" display="flex" flexDirection="column" marginTop="50px" rowGap="20px" minHeight="90vh">
      <Box width="100%" display="flex" justifyContent="center">
        <Typography fontFamily="Acidic" fontSize="clamp(20px,6vw,60px)" color="white">Galeria</Typography>
      </Box>
      {isLoading ?
        <Skeleton variant='rectangle' height="100%"/>
        :
        <Box
          width="100%"
          height="100%"
          display="grid"
          justifyItems="center"
          alignItems="center"
          sx={{
            gridTemplateColumns: below870 ? "1fr" : below1300 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            columnGap: "20px",
            rowGap: "20px"
          }}
        >
          {quadros.map(quadro => (
            <Item key={quadro.id} quadro={quadro} redirect={true} />
          ))}
          {/* Mantendo os elementos Item no final do componente */}
        </Box>}
    </Box>
  );
}

export default Galeria;
