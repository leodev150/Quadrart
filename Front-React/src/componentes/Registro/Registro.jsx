import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, useMediaQuery, Button, Input } from '@mui/material'
import Form from "./Form/Form"


/* Backgrounds */
import Pasta from "../Imagens/Pasta.webp"
import Pasta90Deg from "../Imagens/Pasta90Deg.webp"
import Papel from "../Imagens/Papel_Textura.webp"
import Foto from "../Imagens/Foto.webp"
import Logo from "../Imagens/QuadrartLogo.webp"

const Registro = () => {
    /* Responsivity Variables */
    const below760 = useMediaQuery("(max-width:760px)");
    const below466 = useMediaQuery("(max-width:466px)");


    /* Form camp */

    return (
        <Box width="100%" display="flex" alignItems="center" flexDirection="column" marginTop="50px" rowGap="20px">
            <Box width="100%" display="flex" justifyContent="center">
                <Typography fontFamily="Acidic" fontSize="clamp(20px,6vw,60px)" color="white">Registro</Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={below760 ? "clamp(0px, 100vw, 760px)" : "clamp(0px,100vw,1400px)"}
                height={below466 ? "none" : below760 ? "clamp(0px,153vw,1400px)" : "clamp(0px, 66.2vw, 913px)"}
                sx={{
                    background: below466 ? "" : below760 ? `url(${Pasta90Deg})` : `url(${Pasta})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                }}
            >
                <Box
                    sx={{
                        background: `url(${Papel})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "clamp(300px, 85% ,1400px)",
                        maxHeight: "auto",
                        padding: "0 30px 30px 30px",
                    }}
                >
                    <Box display="flex" justifyContent="space-between">
                        <Box
                            position="relative"
                            top="50px"
                            left="10px"
                            width={below760 ? "clamp(0px, 50vw,318px)" : "clamp(0px, 23vw,318px)"}
                            height={below760 ? "clamp(0px, 41vw,268px)" : "clamp(0px, 19vw,268px)"}
                            sx={{
                                background: `url(${Logo})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                            }}
                        >

                        </Box>
                    </Box>
                    {/*It seems that when rotating an Input, its Caret disappears.*/}
                    <Box flexDirection={'column'} rowGap={below760 ? "20px" : "6px"} display={'flex'} sx={{ transform: 'rotate(0.0deg)' }} color={'#848484'}>
                        <Form />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Registro   