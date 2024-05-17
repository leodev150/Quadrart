import React, { lazy, Suspense } from 'react'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

/* Website Props */


import { PrivateRoutes } from './utils/PrivateRoutes';

import { OpenRoutes } from "./utils/OpenRoutes";

import Loading from "./componentes/Loading";

import Galeria from './componentes/Quadro/Galeria/Galeria';

import CriarQuadro from './componentes/Quadro/CriarQuadro/CriarQuadro';

import MeusQuadros from './componentes/Quadro/MeusQuadros/MeusQuadros';

import Quadro from './componentes/Quadro/PaginaQuadro/Quadro';

import PaginaNaoExiste from './componentes/PaginaNaoExiste/PaginaNaoExiste';

import EditarQuadro from './componentes/Quadro/EditarQuadro/EditarQuadro';

const MainBackground = lazy(() => import('./componentes/MainBackground'));

const Navbar = lazy(() => import("./componentes/Navbar"));

const Home = lazy(() => import('./componentes/Home/Home'));

const Registro = lazy(() => import('./componentes/Registro/Registro'));

const Login = lazy(() => import('./componentes/Login/Login'));

const Footer = lazy(() => import('./componentes/Footer'));




const App = () => {
  return (
    <Box overflow="hidden">
      <Suspense fallback={<Loading />}>
        <MainBackground />
        <ToastContainer 
        theme='dark'
        pauseOnHover="false"
        autoClose={4000}
        />
        <Navbar />
        <Box margin="40px 0">
          <Routes>
            <Route element={<PrivateRoutes to="/login" />}>
              <Route path="/upload-quadro" element={<CriarQuadro />}></Route>
              <Route path="/meus-quadros" element={<MeusQuadros />}></Route>
              <Route path="/editar-quadro/:id" element={<EditarQuadro />}></Route>
            </Route>
            <Route element={<OpenRoutes to="/home"/>}>
              <Route path="/registro" element={<Registro />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/galeria" element={<Galeria />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/quadro/:id" element={<Quadro />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<PaginaNaoExiste />}></Route>
          </Routes>
        </Box>
        <Footer />
      </Suspense>
    </Box>
  )
}

export default App