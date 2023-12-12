import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../_actions';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { EditUserComponent } from "../EditUserComponent";
import { EmailComponent } from '../EmailComponent';

function PrivateRouteWrapper({ children }) {
    const location = useLocation();

    return (
        localStorage.getItem('user')
            ? children
            : <Navigate to="/login" replace state={{ from: location }} />
    );
}

function  App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(alertActions.clear());
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