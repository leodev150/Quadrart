import axios from "axios";
import * as yup from "yup";

const passwordRules = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const emailRules = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;


export const Schema = yup.object().shape({
    nome: yup.string().required("O nome é um campo obrigatório!"),
    checkUsername: yup.boolean(),
    username: yup.string().required("O usuario é um campo obrigatório!").when("checkUsername", {
        is: true,
        then: () => yup.string().required("O usuario é um campo obrigatório!").test({
            message: () => "O usuário já é existente",
            test: async (value) => {
                try{
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/existcheck`, {
                        username: value
                    }, {
                        withCredentials: "true"
                    })

                    return !response.data;
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }),
    checkEmail: yup.boolean(),
    email: yup.string().matches(emailRules , {message:"O e-mail é inválido"}).required("O e-mail é um campo obrigatório!").when("checkEmail", {
        is: true,
        then: () => yup.string().matches(emailRules , {message:"O e-mail é inválido"}).required("O e-mail é um campo obrigatório!").test({
            message: () => "O email já é existente",
            test: async (value) => {
                try{
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/existcheck`, {
                        email: value
                    }, {
                        withCredentials: "true"
                    })

                    return !response.data;
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }),
    senha: yup.string()
    .min(8, "A senha deve ter no minímo 8 caracteres")
    .matches(passwordRules, { message: "A senha deve ter no minímo 1 letra maiuscula, 1 minúscula,  1 Símbolo(@#$!) e 1 digíto"})
    .required("A senha é um campo obrigatório!"),
    confirme_senha: yup.string().oneOf([yup.ref('senha'), null], "As senhas não conferem").required("Confirme sua senha é um campo obrigatório!"),
})
