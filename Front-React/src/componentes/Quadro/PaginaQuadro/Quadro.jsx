import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Box } from '@mui/material';
import useAxiosPrivate from '../../../utils/API/useAxiosPrivate';
import Item from '../Props/Item';

const Quadro = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [quadro, setQuadro] = useState();
    let { id } = useParams();

    useEffect(() => {
        axiosPrivate.get(`quadro/${id}`)
            .then(response => {
                setQuadro(response.data);
            })
            .catch(error => {
                navigate("/naoexiste")
            });
    }, []);

    return (
        quadro && 
            <Box display="flex" justifyContent="center" height="80vh" alignItems="center">
                <Item quadro={quadro} nomeArtista={quadro.nomeArtista} nomeAlbum={quadro.nomeAlbum} ano={quadro.ano} genero={quadro.genero} duracao={quadro.duracao} />
            </Box>
    )
}

export default Quadro