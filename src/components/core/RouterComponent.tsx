import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { alertClear } from '../../_reducers/alert.reducer';
import { HomePage } from '../HomePage';
import { LoginPage } from '../login/LoginPage';
import { RegisterPage } from '../register/RegisterPage';
import { EditUserComponent } from "../EditUserComponent";
import { EmailComponent } from '../EmailComponent';
import PrivateRouteWrapper from './PrivateRouteWrapper';

function RoutesComponent() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(alertClear());
    }, [location, dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <PrivateRouteWrapper>
                        <HomePage />
                    </PrivateRouteWrapper>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/edit-user" element={
                    <PrivateRouteWrapper>
                        <EditUserComponent />
                    </PrivateRouteWrapper>
                } />
                <Route path="/email" element={
                    <PrivateRouteWrapper>
                        <EmailComponent />
                    </PrivateRouteWrapper>
                } />
                <Route path="/add-user" element={
                    <PrivateRouteWrapper>
                        <RegisterPage />
                    </PrivateRouteWrapper>
                } />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default RoutesComponent;