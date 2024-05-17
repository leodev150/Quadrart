import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, IconButton, useMediaQuery, Divider } from '@mui/material'
import { Menu, Close } from "@mui/icons-material"
import { styled } from "@mui/system"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import {
    logout
} from "../state/UserState";


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const below420 = useMediaQuery("(max-width:420px)");
    const [isOpen, setOpen] = useState(false);



    const UnderlinedTypography = styled(Typography)`
    transition: all 0.3s ease;
    font-family: Acidic;
    color: white;
    text-transform: uppercase;

    &:hover {
        color: rgba(255,255,255,1);
        border-bottom: 1px solid white;
        border-top: 1px solid white;
        cursor: pointer;
        scale: 1.2;
    }
    `;

    const Logo = styled(Typography)`
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        scale: 1.2;
    }
    `;

    const onClick = (path) => {
        setOpen(false);
        navigate(path);
    }

    const submitLogout = () => {
        setOpen(false);
        dispatch(logout());
        toast.success("Você deslogou com sucesso");
    }


    return (
        <Box width="100%" display="flex" height="60px" padding="10px 0" flexDirection="column" alignItems="center">
            {below420 ?

                <>
                    <Box width="90%" display="flex" justifyContent="space-between">
                        <IconButton sx={{ color: "white" }} onClick={() => { setOpen(true) }}><Menu /></IconButton>
                        {isOpen &&
                            <Box width="100%" height="100%" position="fixed" display="flex" alignItems="center" backgroundColor="rgba(0,0,0,0.95)" top="0" right="0" zIndex="3" flexDirection="column">
                                <Box width="100%" display="flex" justifyContent="end">
                                    <IconButton onClick={() => { setOpen(false) }}>
                                        <Close sx={{ color: "white", fontSize: "40px" }} />
                                    </IconButton>
                                </Box>
                                <Box display="flex" ml="6%" width="100%" flexDirection="column" justifyItems="center" rowGap="3vh" padding="6vw">
                                    <UnderlinedTypography onClick={() => onClick("/galeria")} sx={{ fontSize: "clamp(0px, 11vw, 35px)" }}>Galeria</UnderlinedTypography>

                                    {user ? (
                                        <>
                                            <UnderlinedTypography onClick={() => onClick("/meus-quadros")} sx={{ fontSize: "clamp(0px, 10vw, 35px)" }}>
                                                Meus Quadros
                                            </UnderlinedTypography>
                                            <UnderlinedTypography onClick={() => onClick("/upload-quadro")} sx={{ fontSize: "clamp(0px, 10vw, 35px)" }}>
                                                Fazer Quadros
                                            </UnderlinedTypography>
                                            <UnderlinedTypography onClick={submitLogout} sx={{ fontSize: "clamp(0px, 11vw, 35px)" }}>
                                                Sair
                                            </UnderlinedTypography>
                                        </>


                                    ) :
                                        (<>
                                            <UnderlinedTypography onClick={() => onClick("/registro")} sx={{ fontSize: "clamp(0px, 11vw, 35px)" }}>
                                                Registro
                                            </UnderlinedTypography>
                                            <UnderlinedTypography onClick={() => onClick("/login")} sx={{ fontSize: "clamp(0px, 11vw, 35px)" }}>
                                                Login
                                            </UnderlinedTypography>
                                        </>
                                        )
                                    }
                                </Box>
                            </Box>
                        }
                        <Logo onClick={() => navigate("/home")} fontFamily="Brushot" color="white" fontSize="23px">Quadrart</Logo>
                    </Box>
                </>

                :


                <>
                    <Box>
                        <Logo onClick={() => navigate("/home")} fontFamily="Brushot" color="white" fontSize="23px">Quadrart</Logo>
                    </Box>
                    <Box display="flex" columnGap="20px" color="rgba(255,255,255,0.85)">

                        <UnderlinedTypography onClick={() => navigate("/galeria")}>Galeria</UnderlinedTypography>

                        {user ? (
                            <>
                                <UnderlinedTypography onClick={() => navigate("/meus-quadros")}>Meus Quadros</UnderlinedTypography>
                                <UnderlinedTypography onClick={() => navigate("/upload-quadro")}>Fazer Quadros</UnderlinedTypography>
                                <UnderlinedTypography onClick={submitLogout}>Sair</UnderlinedTypography>
                            </>


                        ) :
                            (<>
                                <UnderlinedTypography onClick={() => navigate("/registro")}>Registro</UnderlinedTypography>
                                <UnderlinedTypography onClick={() => navigate("/login")}>Login</UnderlinedTypography>
                            </>
                            )
                        }

                    </Box>
                </>


            }
        </Box>
    )
}

export default Navbar