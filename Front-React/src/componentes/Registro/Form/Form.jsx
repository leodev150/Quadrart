import React from 'react'


import { useFormik, getIn, setIn } from "formik";
import { Schema } from "./Schema";
import { Box, useMediaQuery } from "@mui/material"
import FormField from '../../Global/Props/FormField';
import FormButton from '../../Global/Props/FormButton';
import { useDispatch } from 'react-redux';
import { login } from '../../../state/UserState';
import axios from '../../../utils/API/axios';
import { toast } from 'react-toastify';

const Form = () => {
    const dispatch = useDispatch();
    const below760 = useMediaQuery("(max-width:760px)");

    const onSubmit = async (values, action) => {
        try {
            const response = await axios.post("/auth/register", JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: "true"
            })
            dispatch(login(response.data))
            toast.success("Você conseguiu efetuar o registro");
        } catch (e) {
            toast.error("Houve um erro ao registrar seu usuário");
        }

    }

    function yupToFormErrors(yupError) {
        console.log(yupError.inner);
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


    const ValidateYupSchemaArrErrors = async (
        values,
    ) => {
        try {
            await Schema.validate(values, {
                abortEarly: false,
            });
            return {};
        } catch (e) {
            return yupToFormErrors(e);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, setValues } = useFormik({
        initialValues: {
            nome: "",
            checkUsername: false,
            username: "",
            email: "",
            checkEmail: false,
            senha: "",
            confirme_senha: "",
        },
        validate: values => ValidateYupSchemaArrErrors(values),
        onSubmit,
    });


    return (
        <Box component={"form"} onSubmit={handleSubmit} autoComplete='off'>
            <FormField
                value={values.nome}
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors.nome}
                touched={touched.nome}
                label={"Nome: "}
                name="nome"
            />
            <FormField
                value={values.username}
                onChange={handleChange}
                handleBlur={(e) => {
                    handleBlur(e);
                    if (!errors.username) {
                        setValues({
                            ...values,
                            checkUsername: true,
                        })
                    }
                }}
                error={errors.username}
                touched={touched.username}
                label="Username: "
                name="username"
            />
            <FormField
                value={values.email}
                onChange={handleChange}
                handleBlur={(e) => {
                    handleBlur(e);
                    if (!errors.email) {
                        setValues({
                            ...values,
                            checkEmail: true,
                        })
                    }
                }}
                error={errors.email}
                touched={touched.email}
                label="Email: "
                name="email"
            />
            <FormField
                value={values.senha}
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors.senha}
                touched={touched.senha}
                type="password"
                label="Senha: "
                name="senha"
            />
            <FormField
                value={values.confirme_senha}
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors.confirme_senha}
                touched={touched.confirme_senha}
                type="password"
                label="Confirme sua senha: "
                name="confirme_senha"
            />
            < Box
                display="flex"
                justifyContent="center"
                marginTop="40px"
                position={below760 ? "none" : "relative"}
                left="30%"
                sx={{
                    transform: below760 ? "" : "rotate(-10deg)"
                }}

            >
                <FormButton disabled={isSubmitting} />
            </Box>
        </Box>
    )
}

export default Form