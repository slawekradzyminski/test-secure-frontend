import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { EditUserComponent } from "../EditUserComponent";
import { EmailComponent } from '../EmailComponent';
import { RootState } from '../../types';
import { clear } from '../../_actions/alert.actions';

function PrivateRouteWrapper({ children }) {
    const location = useLocation();

    return (
        localStorage.getItem('user')
            ? children
            : <Navigate to="/login" replace state={{ from: location }} />
    );
}

function  App() {
    const alert = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clear());
    }, []);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router>
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
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };