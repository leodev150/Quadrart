import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    login: yup.string().required("Email ou usuário é obrigatório!"),
    senha: yup.string().required("A senha é obrigatória")
})