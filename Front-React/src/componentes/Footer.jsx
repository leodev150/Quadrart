import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box width="100%" display="flex" height="60px" padding="10px 0" justifyContent="center" alignItems="center" backgroundColor="rgba(0,0,0, 0)" color="white">
      <Box padding="0 5%">
        <Typography textAlign="center">© 2024 Quadrart. Todos os direitos reservados.</Typography>
      </Box>
    </Box>
  )
}

export default Footer