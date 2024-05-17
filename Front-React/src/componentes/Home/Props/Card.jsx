import React from 'react'
import { Box, Typography, Button, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const Card = (props) => {
    const navigate = useNavigate();
    const isSmall = useMediaQuery("(max-width:768px)")
    const { background, title, description, buttonTitle, buttonLink } = props;


    return (
        <Box
            width={isSmall ? "80%":"30%"}
            color="White"
            display="flex"
            minHeight="200px"
            flexDirection="column"
            alignItems="center"
            padding="30px 20px"
            rowGap="30px"
            borderRadius="20px"
            sx={{
                background: `url(${background})`,
                backgroundColor: "rgba(0,0,0,0.4)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}>
            <Typography fontFamily="Acidic">{title}</Typography>
            <Box width="80%">
                <Typography fontFamily="RockBold" textAlign="center">{description}</Typography>
            </Box>
            <Button onClick={() => navigate(buttonLink)} variant="outlined" sx={{color: "white", borderColor: "white"}}>
                <Typography>{buttonTitle}</Typography>
            </Button>
        </Box>
    )
}

export default Card