/* Importação do YUP para criação de schemas que servem */
import * as yup from "yup";

/* Schema de verificações do formulário */
export const CriarQuadroSchema = yup.object().shape({
    nomeArtista: yup.string().max(40).required("O nome do artista é obrigatório!"),
    nomeAlbum: yup.string().max(40).required("O nome do album é obrigatório!"),
    genero: yup.string().max(20).required("O campo genêro é obrigatório!"),
    duracao: yup.string().max(3).required("O campo de duração é obrigatório!"),
    ano: yup.string().min(4, "Ano inválido").required("O campo ano é obrigatório!"),
})