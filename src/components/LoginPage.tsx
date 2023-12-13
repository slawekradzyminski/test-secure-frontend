import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from "./common/Input";
import { getHandleChange } from "./util/change";
import { PrimaryButton } from "./common/PrimaryButton";
import { RootState } from '../types';
import { login, logout } from '../_actions/user.actions';

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector((state: RootState) => state.authentication.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(logout());
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        const { from } = location.state || { from: { pathname: "/" } };
        dispatch(login({ username, password, from, navigate }));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <Input name="username" value={username} submitted={submitted}
                    handleChange={getHandleChange(setUsername)} />
                <Input name="password" value={password} submitted={submitted} type='password'
                    handleChange={getHandleChange(setPassword)} />
                <div className="form-group">
                    <PrimaryButton text="Login" isLoading={loggingIn} />
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };