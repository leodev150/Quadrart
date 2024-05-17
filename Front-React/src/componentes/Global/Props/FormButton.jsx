import React from 'react'
import { Button } from "@mui/material"
import Botao from "./Imagens/botao_enviar.webp"


const FormButton = ({ disabled }) => {
    return (
        <Button
            disabled={disabled}
            type='submit'
            sx={{
                height: "clamp(0px, 25vw , 80px)",
                width: "clamp(0px, 90vw , 312px)",
                background: `linear-gradient(to right, #11160d, #11160d)`,
                maskSize: 'contain',
                maskImage: `url(${Botao})`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                '&:hover': {
                    background: `linear-gradient(to right, #ff110d, #ff110d), url(${Botao})`,
                    cursor: 'pointer',
                },
            }}
        />
    )
}

export default FormButton