import React from 'react'
import { Box } from '@mui/material'
import ClimbingBoxLoader from 'react-spinners/ClipLoader'

const Loading = () => {
    return (
        <Box
            display="flex"
            position="fixed"
            height="100%"
            width="100%"
            top="0"
            left="0"
            backgroundColor="rgba(0,0,0, 1)"
            justifyContent="center"
            alignItems="center">
            <ClimbingBoxLoader
                color={"white"}
                loading={true}
                size={150}
            >

            </ClimbingBoxLoader>
        </Box>
    )
}

export default Loading;