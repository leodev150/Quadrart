import React from 'react'
import { Box, Typography } from '@mui/material'
import CriarQuadroForm from "./Form/CriarQuadroForm"


const CriarQuadro = () => {
    /* HTML + CSS da Rota */
    return (
        <Box width="100%" display="flex" alignItems="center" flexDirection="column" marginTop="50px" rowGap="30px">
            <Typography
                fontFamily="Acidic"
                fontSize="clamp(20px,6vw,60px)"
                color="white"
            >
                Criar Quadro
            </Typography>
            <CriarQuadroForm/>
        </Box>

    )
}

export default CriarQuadro;