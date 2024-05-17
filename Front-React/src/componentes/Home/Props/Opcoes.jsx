import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Card from './Card'

const Opcoes = () => {
    const isSmall = useMediaQuery("(max-width:768px)")

    const infoCards = {
        c1: {
            t: "Explore",
            d: "Descubra uma ampla variedade de quadros de diferentes artistas",
            b: "",
            bt: "Explorar"
        },
        c2: {
            t: "Registre-se",
            d: "Cadastre suas próprias obras de arte para compartilhar com a comunidade.",
            b: "",
            bt: "Registrar-se"
        },
        c3: {
            t: "Conecte-se",
            d: "Faça parte de uma comunidade apaixonada por arte.",
            b: "",
            bt: "Conectar-se"
        }
    }


    return (
        <Box width="100%" display="flex" justifyContent="center" minHeight="300px"  margin="80px 0">
            <Box width="100%" maxWidth="1600px" display="flex" justifyContent="center">
                <Box display="flex" justifyContent="space-around" padding="0px 20px" alignItems="center" columnGap="20px" flexDirection={isSmall ? "column":""} rowGap="30px">
                    <Card title={infoCards.c1.t} description={infoCards.c1.d} buttonTitle={infoCards.c1.bt} buttonLink={"/galeria"}></Card>
                    <Card title={infoCards.c2.t} description={infoCards.c2.d} buttonTitle={infoCards.c2.bt} buttonLink={"/registro"}></Card>
                    <Card title={infoCards.c3.t} description={infoCards.c3.d} buttonTitle={infoCards.c3.bt} buttonLink={"/login"}></Card>
                </Box>
            </Box>
        </Box>

    )
}

export default Opcoes