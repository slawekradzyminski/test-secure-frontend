import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { EditUserComponent } from "../EditUserComponent";
import { EmailComponent } from '../EmailComponent';
import { RootState } from '../../types';
import { alertClear } from '../../_reducers/alert.reducer';

function PrivateRouteWrapper({ children }) {
    const location = useLocation();

    return (
        localStorage.getItem('user')
            ? children
            : <Navigate to="/login" replace state={{ from: location }} />
    );
}

function RoutesComponent() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(alertClear());
    }, [location, dispatch]);

    return (
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
    );
}

function App() {
    const alert = useSelector((state: RootState) => state.alert);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router>
                        <RoutesComponent />
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };