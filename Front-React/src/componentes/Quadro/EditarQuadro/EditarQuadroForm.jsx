import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, useMediaQuery } from "@mui/material"
import FormButton from '../../Global/Props/FormButton'
import FormField from '../../Global/Props/FormField'
import { getIn, setIn, useFormik } from "formik"
import { CriarQuadroSchema } from '../CriarQuadro/Form/CriarQuadroSchema'
import useAxiosPrivate from '../../../utils/API/useAxiosPrivate'
import ImageCropper from '../CriarQuadro/Form/ImageCropper'
import { toast } from 'react-toastify'
import axios from "axios";

const EditarQuadroForm = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const [image, setImage] = useState();
    const [cropperOpen, setcropperOpen] = useState(false);
    const below832 = useMediaQuery("(max-width:832px)");


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
            const response = await axiosPrivate.put(`/quadro/${id}`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            navigate(`/quadro/${id}`);
            toast.success("Você editou seu quadro com sucesso");

        } catch (e) {
            toast.error("Houve um erro ao editar seu quadro");
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
            <Box display="flex" flexDirection="column" alignItems="center" rowGap="40px">
                <Box sx={{
                    backgroundColor: "white",
                    width: below832 ? "clamp(0px, 50vw,318px)" : "clamp(0px, 23vw,254px)",
                    height: below832 ? "clamp(0px, 50vw,318px)" : "clamp(0px, 23vw,254px)",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.4)",
                    border: "4px solid white",
                    background: `url(${image}), linear-gradient(to right, white 0%, white 100%)`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
                    onClick={() => document.querySelector('input[type=file]').click()}
                    onPaste={handlePaste}
                >
                    <input
                        type="file"
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                    />
                </Box>
                <Box width="100%" display="flex" flexDirection="column" rowGap="20px">
                    <FormField
                        label="Nome do artista: "
                        value={values.nomeArtista}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        name={"nomeArtista"}
                        touched={touched.nomeArtista}
                        error={errors.nomeArtista}
                        maxLength={32}
                    />
                    <FormField
                        label="Duracao em minutos: "
                        value={values.duracao}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        name={"duracao"}
                        touched={touched.duracao}
                        error={errors.duracao}
                        maxLength={3}
                    />
                    <FormField
                        label="Nome do Album: "
                        value={values.nomeAlbum}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        name={"nomeAlbum"}
                        touched={touched.nomeAlbum}
                        error={errors.nomeAlbum}
                        maxLength={40}
                    />
                    <FormField
                        label="Genêro: "
                        value={values.genero}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        name={"genero"}
                        touched={touched.genero}
                        error={errors.genero}
                        maxLength={40}
                    />
                    <FormField
                        label="Ano: "
                        value={values.ano}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        name={"ano"}
                        touched={touched.ano}
                        error={errors.ano}
                        maxLength={40}
                    />
                </Box>
                <Box display="flex" justifyContent="center">
                    <FormButton disabled={isSubmitting} />
                </Box>
            </Box>
        </Box>
    )
}

export default EditarQuadroForm;