import React from 'react'
import { Box, Card, CardMedia } from '@mui/material'
import video from "./Videos/background.mp4"

const MainBackground = () => {
    return (
        <Box position="fixed" width="100%" height="100%" zIndex="-10" overflow="hidden">
            <video className='videoTag' autoPlay loop muted style={{objectFit:"cover", width:"100%", height:"100vh"}}>
                <source src={video} type='video/mp4' />
            </video>
        </Box>
    )
}

export default MainBackground