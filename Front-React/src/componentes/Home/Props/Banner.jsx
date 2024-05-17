import React from 'react'
import { Box, Typography } from '@mui/material'
import banner from "../Images/banner.png";
import styled from '@emotion/styled';

const BannerTypography = styled(Typography)`
    transition: all 0.3s ease;
    font-family: ASpaceLighht;
    color: white;

    &:hover {
        cursor: pointer;
        scale: 1.2;
    }
    `;

const Banner = () => {
    return (
        <Box width="100%" height="400px" display="flex" justifyContent="center" paddingBottom="40px" sx={{maskImage: "linear-gradient(to bottom, rgba(0,0,0, 0) 0%, rgba(0,0,0, 1) 15%, rgba(0,0,0,1) 50%, rgba(0,0,0, 1) 85%, rgba(0,0,0,0) 100%)", background: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%), url(${banner})`, backgroundPosition: "center", backgroundSize: "cover" }}>
            <Box width="100%" height="100%"
                maxWidth="1680px"
                display="flex"
                justifyContent="flex-end"
                alignItems="start"
                flexDirection="column"
                paddingLeft="4vw"
                >
                <BannerTypography fontSize="clamp(10px, 8vw, 70px)" letterSpacing="clamp(2px, 6vw, 20px)">Quadrart</BannerTypography>
            </Box>
        </Box>
    )
}

export default Banner