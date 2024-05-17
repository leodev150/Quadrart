import React from 'react'

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";

export const OpenRoutes = ({ to }) => {
    const user = useSelector((state) => state.user.user);
    return (
        user ? <Navigate to={to} /> : <Outlet />
    )
}
