import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../home/HomePage';
import { LoginPage } from '../login/LoginPage';
import { RegisterPage } from '../register/RegisterPage';
import { EditUserComponent } from "../edit/EditUserComponent";
import { EmailComponent } from '../email/EmailComponent';
import PrivateRouteWrapper from './PrivateRouteWrapper';
import QrComponent from '../qr/QrComponent';
import DoctorTypesComponent from '../doctortypes/DoctorTypes';
import SlotComponent from '../slots/SlotComponent';

function RoutesComponent() {
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
                <Route path="/qr" element={
                    <PrivateRouteWrapper>
                        <QrComponent />
                    </PrivateRouteWrapper>
                } />
                <Route path="/email" element={
                    <PrivateRouteWrapper>
                        <EmailComponent />
                    </PrivateRouteWrapper>
                } />
                <Route path="/doctortypes" element={
                    <PrivateRouteWrapper>
                        <DoctorTypesComponent />
                    </PrivateRouteWrapper>
                } />
                <Route path="/openslots" element={
                    <PrivateRouteWrapper>
                        <SlotComponent />
                    </PrivateRouteWrapper>
                } />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default RoutesComponent;