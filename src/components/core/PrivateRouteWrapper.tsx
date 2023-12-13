import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRouteWrapper({ children }) {
    const location = useLocation();

    return (
        localStorage.getItem('user')
            ? children
            : <Navigate to="/login" replace state={{ from: location }} />
    );
}

export default PrivateRouteWrapper;