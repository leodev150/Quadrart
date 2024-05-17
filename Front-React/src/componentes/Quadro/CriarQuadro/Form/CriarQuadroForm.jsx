import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useMediaQuery } from "@mui/material"
import Identidade from "../Images/Quadrart_License.webp"
import Identidade_90DEG from "../Images/Quadrart_License_90DEG.webp"
import PlaceHolder from "../Images/Placeholder.webp"
import FormButton from '../../../Global/Props/FormButton'
import FormField from '../../../Global/Props/FormField'
import { getIn, setIn, useFormik } from "formik"
import { CriarQuadroSchema } from './CriarQuadroSchema'
import ImageCropper from './ImageCropper';
import axios from "axios";
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import useAxiosPrivate from '../../../../utils/API/useAxiosPrivate'

const CriarQuadroForm = () => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const below760 = useMediaQuery("(max-width:760px)");
    const [image, setImage] = useState();
    const [cropperOpen, setcropperOpen] = useState(false);

    const handlePaste = (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file') {
                const blob = item.getAsFile();
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
                setcropperOpen(true);
            }
        }
    };

    const handleFileInputChange = (event) => {
        if (event.target.files.length) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setcropperOpen(true);
        }
    };

    const onSubmit = async (values) => {
        const fetchImageAsBlob = async (imageUrl) => {
            const response = await axios.get(imageUrl, { responseType: 'blob' });
            return response.data;
        };


        try {
            const imageBlob = await fetchImageAsBlob(image);
            const file = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });
            values.file = file
            const response = await axiosPrivate.post("/quadro", values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            navigate(`/quadro/${response.data.id}`)
            toast.success("Seu quadro foi criado com sucesso");

        } catch (e) {
            toast.error("Houve um erro na criação do seu quadro");
        }

    }


    /* Converte o objeto de erros do Yup para uma array */
    function yupToFormErrors(yupError) {
        let errors = {};

        for (let err of yupError.inner) {
            let fieldErrors = getIn(errors, err.path);
            if (!fieldErrors) {
                fieldErrors = [];
            }
            if (!fieldErrors.includes(err.message)) {
                fieldErrors.push(err.message);
            }
            errors = setIn(errors, err.path, fieldErrors);
        }
        return errors;
    }


    /* Função de validação de erros */
    const ValidateYupSchemaArrErrors = async (
        values
    ) => {
        try {
            await CriarQuadroSchema.validate(values, {
                abortEarly: false,
            });
            return {};
        } catch (e) {
            return yupToFormErrors(e);
        }
    };

    /* Variáveis obtidas pelo formik, para validação e construção de lógica do formulário */
    const { values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting } = useFormik({
        initialValues: {
            nomeArtista: "",
            nomeAlbum: "",
            ano: "",
            genero: "",
            duracao: "",
            file: "",
        },
        validate: values => ValidateYupSchemaArrErrors(values),
        onSubmit
    })

    /**
     * HTML + CSS
     */
    return (
        <Box
            display="flex"
            flexDirection="column"
            component={"form"}
            onSubmit={handleSubmit}
            autoComplete='off'
            rowGap="40px"
        >
            <ImageCropper
                image={image}
                setImage={setImage}
                isOpen={cropperOpen}
                setOpen={setcropperOpen}
            />
            <Box
                display="flex"
                justifyContent="end"
                width={below760 ? "clamp(0px,92vw, 800px)" : "clamp(0px,95.2vw,calc(800px*1.6))"}
                height={below760 ? "clamp(0px,146vw, 1200px)" : "clamp(0px,60vw, 800px)"}
                sx={{
                    background: below760 ? `url(${Identidade_90DEG})` : `url(${Identidade})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                }}
            >
                <Box
                    display="flex"
                    width="100%"
                    flexWrap={below760 ? "nowrap" : "wrap"}
                    alignItems={below760 ? "center" : "end"}
                    flexDirection={below760 ? "column" : "none"}
                >
                    <Box display="flex"
                        alignItems={below760 ? "end" : "none"}
                        justifyContent="end"
                        left={below760 ? "-1.2%" : "0%"}
                        width={below760 ? "54%" : "34%"}
                        height={below760 ? "50.5%" : "72.5%"}
                        position="relative"
                    >
                        <Box
                            backgroundColor="rgba(0,0,0,1)"
                            width={below760 ? "95.5%" : "91%"}
                            border="8px dashed grey"
                            height={below760 ? "65%" : "71%"}

                            onClick={() => document.querySelector('input[type=file]').click()}
                            onPaste={handlePaste}
                            sx={{
                                background: `url(${image}), url(${PlaceHolder}), linear-gradient(to right, white 0%, white 100%)`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        >
                            <input
                                type="file"
                                onChange={handleFileInputChange}
                                style={{ display: "none" }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        width={below760 ? "95%" : "65%"}
                        height={below760 ? "49.5%" : "68%"}
                        pt={below760 ? "3%" : ""}
                        pl={below760 ? "11%" : "3%"}
                    >
                        <Box width="100%" display="flex" flexDirection="column" rowGap="5%">
                            <Box>
                                <FormField
                                    wacky={true}
                                    multiline={true}
                                    label={"NOME DO ARTISTA: "}
                                    value={values.nomeArtista}
                                    onChange={handleChange}
                                    handleBlur={handleBlur}
                                    name={"nomeArtista"}
                                    touched={touched.nomeArtista}
                                    error={errors.nomeArtista}
                                    fontFamily={"Trebuchet MS"}
                                    fontSize={below760 ? "clamp(0px, 4.3vw, 35px)" : "clamp(15px,3vw,35px)"}
                                    underline={false}
                                    maxLength={32}
                                    textTransform="uppercase"

                                />
                                <FormField
                                    wacky={true}
                                    multiline={true}
                                    label={"NOME DO ALBUM: "}
                                    value={values.nomeAlbum}
                                    onChange={handleChange}
                                    handleBlur={handleBlur}
                                    name={"nomeAlbum"}
                                    touched={touched.nomeAlbum}
                                    error={errors.nomeAlbum}
                                    fontFamily={"Trebuchet MS"}
                                    fontSize={below760 ? "clamp(0px, 4.3vw, 35px)" : "clamp(15px,3vw,35px)"}
                                    underline={false}
                                    maxLength={40}
                                    textTransform="uppercase"

                                />
                                <FormField
                                    wacky={true}
                                    multiline={true}
                                    label={"GENÊRO: "}
                                    value={values.genero}
                                    onChange={handleChange}
                                    handleBlur={handleBlur}
                                    name={"genero"}
                                    touched={touched.genero}
                                    error={errors.genero}
                                    fontFamily={"Trebuchet MS"}
                                    fontSize={below760 ? "clamp(0px, 4.3vw, 35px)" : "clamp(15px,3vw,35px)"}
                                    underline={false}
                                    maxLength={20}
                                    textTransform="uppercase"
                                />
                                <Box display="flex" flexDirection={below760 ? "column" : ""} columnGap="20px">
                                    <Box width="100%" flex={1}>
                                        <FormField
                                            wacky={true}
                                            multiline={true}
                                            label={"DURAÇÃO: "}
                                            value={values.duracao}
                                            onChange={handleChange}
                                            handleBlur={handleBlur}
                                            name={"duracao"}
                                            touched={touched.duracao}
                                            error={errors.duracao}
                                            fontFamily={"Trebuchet MS"}
                                            fontSize={below760 ? "clamp(0px, 4.3vw, 35px)" : "clamp(15px,3vw,35px)"}
                                            underline={false}
                                            maxLength={3}
                                            textTransform="uppercase"

                                        />
                                    </Box>
                                    <Box width="100%" flex={1}>
                                        <FormField
                                            wacky={true}
                                            label={"ANO: "}
                                            value={values.ano}
                                            onChange={handleChange}
                                            handleBlur={handleBlur}
                                            name={"ano"}
                                            touched={touched.ano}
                                            error={errors.ano}
                                            fontFamily={"Trebuchet MS"}
                                            fontSize={below760 ? "clamp(0px, 4.3vw, 35px)" : "clamp(15px,3vw,35px)"}
                                            underline={false}
                                            maxLength={4}
                                            textTransform="uppercase"

                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center">
                <FormButton disabled={isSubmitting} />
            </Box>
        </Box>
    )
}

export default CriarQuadroForm;