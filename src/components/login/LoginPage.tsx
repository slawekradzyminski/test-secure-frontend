import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { login, logout } from '../../_actions/user.actions';
import { useAppDispatch } from '../../_helpers/store';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const DEFAULT_PATH = "/";
const LOGIN = "Login";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn);

    useEffect(() => {
        if (loggedIn) {
            dispatch(logout());
        }
    }, [dispatch]);

    const handleSubmit = useCallback(({ username, password }) => {
        const { from } = location.state || { from: { pathname: DEFAULT_PATH } };
        dispatch(login({ username, password, from, navigate }));
    }, [dispatch, location, navigate]);

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>{LOGIN}</h2>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export { LoginPage };