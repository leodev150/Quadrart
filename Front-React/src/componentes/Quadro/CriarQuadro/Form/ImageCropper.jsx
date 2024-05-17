import React, { useState } from 'react';

import { Box, IconButton, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import Cropper from "react-easy-crop" ;

const ImageCropper = ({ image, setImage, isOpen, setOpen }) => {

    /* Variáveis necessárias para o Cropper */
    /* Coordenadas do crop em relação á imagem */
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    /* Coordenadas do zoom em relação á imagem */
    const [zoom, setZoom] = useState(1);
    /* Informações relacionadas a área cortada */
    const [croppedArea, setCroppedArea] = useState({});
    /* Informações relacionadas a área cortada dimensionada a pixels */
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

    /* Função que define a lógica do cropping */
    const HandleCrop = () => {
        try {
            /* Se não houver a área cortada em pixels, não prossiga */
            if (!croppedAreaPixels) return;
            /* Crie um canvas para desenhar a imagem inicial */
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            /* Caso haja erro na procura do canvas, não prossiga */
            if (!ctx) return;

            /* Crie uma variável do tipo imagem */
            const imageL = new Image();
            /* Defina o crossOrigin para anonymous, para não haver
            problemas com imagens de outras sources */
            imageL.crossOrigin = "anonymous";

            /**
             * Através da função onload do objeto imagem, 
             * podemos aguardar o carregamento de uma imagem
             * antes de executar um código que necessite de partes
             * relacionadas ao painting de dada imagem.
             */
            imageL.onload = () => {
                /**
                 * Pegue o canvas inicial e defina sua largura e altura
                 * baseada na imagem inicial.
                 */
                canvas.width = imageL.width;
                canvas.height = imageL.height;

                /**
                 * Desenhe a imagem no canvas.
                 */
                ctx.drawImage(imageL, 0, 0);

                /**
                 * Agora que você tem uma imagem desenhada em um canvas,
                 * crie um outro canvas e pegue seu contexto.
                 */
                const croppedCanvas = document.createElement("canvas");
                const croppedCtx = croppedCanvas.getContext("2d");

                /**
                 * Se o contexto do segundo canvas não for obtido,
                 * não prossiga.
                 */
                if (!croppedCtx) return;

                /**
                 * Desestruture o objeto croppedAreaPixels,
                 * pois há informações como coordenadas,
                 * largura e altura que necessitaseremos.
                 */
                const { x, y, width, height } = croppedAreaPixels;

                /**
                 * Defina a largura e altura do canvas secundário
                 * baseado na altura e largura da área cortada.
                 */
                croppedCanvas.width = width;
                croppedCanvas.height = height;

                /**
                 * Desenhe a imagem, no segundo canvas
                 */
                croppedCtx.drawImage(
                    canvas,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );

                /**
                 * Após desenhado no canvas, converta a imagem para blob e obtenha um link de acesso.
                 */
                croppedCanvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        console.log("test");
                        setImage(url);
                    }
                }, "image/png")
            };

            /**
             * Isso aqui é executado antes do image.onload, pois quando o código chega aqui
             * a imagem ainda não carregou, pois, não definimos a source da imagem.
             * Logo, image.onload só será executado após a definição de uma source.
             */
            imageL.src = image
        } catch (error) {
            /**
             * Em caso de erro, retorne, um erro.
             */
            return error;
        }
    }

    /**
     * Função necessária para a lógica do cropper, e que define o que fazer quando
     * o usuário termina de mexer na moldura do cropper. Que no caso, seria definir
     * as duas variáveis, croppedArea e croppedAreaPixels, que são passadas a função
     * logo quando o cropper chama essa função.
     */
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedArea)
        setCroppedAreaPixels(croppedAreaPixels)
    };

    /**
     * HTML + CSS Image Cropper
     */
    return (
        <Box
            position="fixed"
            top='0'
            left='0'
            width="100%"
            height="100%"
            zIndex="5"
            display={isOpen ? "flex" : "none"}
            backgroundColor="rgba(0,0,0,0.5)"
            flexDirection="column"
            justifyContent={"center"}
        >
            <Box
                display="flex"
                height="80%"
                width="100%"
                position="absolute"
                backgroundColor="white"
                flexDirection="column"
                justifyContent="center"
            >
                <Box
                    position="absolute"
                    justifyContent="end"
                    alignItems="baseline"
                    top={0}
                    right={0}
                    margin="8px"
                >
                    <IconButton onClick={() => { setOpen(false) }}>
                        <Close />
                    </IconButton>
                </Box>
                <Box
                    width="100%"
                    height="70%"
                    position="relative"
                    padding="3%"
                >
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onZoomChange={setZoom}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        style={{
                            backgroundColor: "transparent"
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center" position="relative" margin="30px">
                    <Button
                        sx={{
                            backgroundColor: "green",
                            color: "white"
                        }}
                        onClick={() => { setOpen(false); HandleCrop(); }}>
                        Cortar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ImageCropper