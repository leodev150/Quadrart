import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import useAxiosPrivate from '../../../utils/API/useAxiosPrivate';
import { Box, Typography, useMediaQuery } from '@mui/material'
import Item from '../Props/Item';
import { toast } from 'react-toastify';

const MeusQuadros = () => {
    const axiosPrivate = useAxiosPrivate();
    const [quadros, setQuadros] = useState([]);
    const below1300 = useMediaQuery("(max-width:1300px)");
    const below870 = useMediaQuery("(max-width:870px)");

    const deleteQuadro = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/quadro/${id}`, {
                withCredentials: "true"
            })

            getQuadros();
            toast.success("Seu quadro foi deletado com sucesso");
        } catch {
            toast.error("Houve um erro ao excluir este quadro");
        }
    }

    const getQuadros = async () => {
        try {

            const response = await axiosPrivate.get("http://localhost:8080/quadro/meusquadros");

            setQuadros(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getQuadros();
    }, []);

    return (
        <Box width="100%" display="flex" flexDirection="column" marginTop="50px" rowGap="20px" minHeight="90vh">
            <Box width="100%" display="flex" justifyContent="center">
                <Typography fontFamily="Acidic" fontSize="clamp(20px,6vw,60px)" color="white">Meus Quadros</Typography>
            </Box>
            <Box
                width="100%"
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
                    <Box key={quadro.id}>
                        <Item quadro={quadro} edit={true} deleteFunc={() => deleteQuadro(quadro.id)} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default MeusQuadros