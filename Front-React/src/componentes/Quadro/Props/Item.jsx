import { Box, Typography, Skeleton, IconButton } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { HighlightOff, ModeEdit } from '@mui/icons-material';
import axios from "axios";
import { logout } from '../../../state/UserState';

const Item = ({ quadro, edit = false, deleteFunc, redirect = false }) => {

    useEffect(() => {
        if (quadro) {
            setIsLoading(false);
        }
    }, [quadro]);


    const navigate = useNavigate()
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Box
            width="clamp(0px,86vw,400px)"
            height="clamp(0px,129vw,600px)"
            backgroundColor="#eceae7"
            padding="30px 0px"
            display="flex"
            flexDirection="column"
            rowGap="clamp(0px, 4vw,30px)"
            boxSizing="content-box"
            border="1px solid black"
            alignItems="center"
            justifyContent="space-around"
            boxShadow="5px 5px 5px rgba(0,0,0,0.4)"
            position="relative"
            sx={{
                transition: "ease all 0.3s",
                "&:hover": {
                    cursor: "pointer",
                    scale: "1.2"
                }
            }}
            onClick={() => {
                if(!isLoading && redirect == true){
                    navigate(`/quadro/${quadro.id}`);
                }
            }}
        >
            {edit &&
                <Box
                    position="absolute"
                    display="flex"
                    flexDirection="column"
                    height="25%"
                    width="15%"
                    margin="auto"
                    top="0"
                    bottom="0"
                    right="0px"
                    justifyContent={"space-around"}
                >
                    <IconButton>
                        <HighlightOff onClick={deleteFunc} sx={{ fontSize: "clamp(0px, 8vw, 50px)", color: "red" }} />
                    </IconButton>
                    <IconButton>
                        <ModeEdit onClick={() => {navigate(`/editar-quadro/${quadro.id}`)}} sx={{ fontSize: "clamp(0px, 8vw, 50px)", color: "blue" }} />
                    </IconButton>
                </Box>
            }
            <Box width="100%" minHeight="10%" display="flex" justifyContent="center">
                <Box display="flex" width="70%" borderBottom="1px solid black" justifyContent="space-between" alignItems="center">
                    <Box display="flex" width="80%" sx={{ wordBreak: "break-word" }}>
                        {isLoading ?
                            (<Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>) :
                            (<Typography fontFamily="Inter" fontWeight="700" fontSize="clamp(0px, 4vw ,16px)">
                                {quadro.nomeArtista}
                            </Typography>)
                        }
                    </Box>
                    <Box width="10%" display="flex" justifyContent="end" alignItems="end">
                        <Typography fontFamily="Inter" fontWeight="700" fontSize="clamp(0px, 4vw ,16px)">{quadro.duracao}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="clamp(0px, 60vw, 260px)"
                    height="clamp(0px, 60vw, 260px)"
                    border="1.4px solid rgba(0,0,0,0.8)"
                >
                    {isLoading ?
                        (<Skeleton animation="wave" variant='rectangular' width="100%" height="100%" />)
                        : (<img width="100%" height="100%" src={`http://localhost:8080/quadro/image/${quadro.imagem}`} />)}
                </Box>
            </Box>
            <Box height="12%" width="90%" display="flex" justifyContent="center">
                {isLoading ? (
                    <Skeleton width="100%">
                        <Typography fontSize={`clamp(0px, 10vw, 40px)`}>.</Typography>
                    </Skeleton>
                ) : (
                    <Typography fontFamily="Inria Serif" fontSize={`clamp(0px, calc(10vw/${1 + Math.floor(4 * quadro.nomeAlbum.length / 12)}), 40px)`} fontWeight="700"
                        sx={{
                            textAlign: "center",
                            wordBreak: "break-word",
                            textShadow: "rgba(0,0,0,0.52) 1px 0px 0px, rgba(0,0,0,0.52) 0.540302px 0.841471px 0px, rgba(0,0,0,0.52) -0.416147px 0.909297px 0px, rgba(0,0,0,0.52) -0.989992px 0.14112px 0px, rgba(0,0,0,0.52) -0.653644px -0.756802px 0px, rgba(0,0,0,0.52) 0.283662px -0.958924px 0px, rgba(0,0,0,0.52) 0.96017px -0.279415px 0px",
                        }}
                    >
                        {quadro.nomeAlbum}
                    </Typography>
                )}
            </Box>

            <Box height="8%">

                <Typography fontFamily="Inknut Antiqua" fontSize="clamp(0px, calc(12vw/3) , calc(50px/3))" fontWeight="800" sx={{ borderBottom: "1px solid black" }}>{quadro.genero}</Typography>
            </Box>
            <Box height="8%">
                <Typography fontFamily="Ider" fontSize="clamp(0px,calc(12vw/6*5),calc(50px/6*5))" fontWeight="400">{quadro.ano}</Typography>
            </Box>
        </Box >
    )
}

export default Item

