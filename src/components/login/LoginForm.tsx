import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Input } from "../common/Input";
import { getHandleChange } from "../util/change";
import { PrimaryButton } from "../common/PrimaryButton";
import { RootState } from '../../_reducers';

const LOGIN = "Login";
const REGISTER = "/register";

function LoginForm({ onSubmit }) {
    const loggingIn = useSelector((state: RootState) => state.authentication.loading);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setSubmitted(true);
        onSubmit({ username, password });
    }, [username, password, onSubmit]);

    return (
        <form name="form" onSubmit={handleSubmit}>
            <Input name="username" value={username} submitted={submitted}
                handleChange={getHandleChange(setUsername)} />
            <Input name="password" value={password} submitted={submitted} type='password'
                handleChange={getHandleChange(setPassword)} />
            <div className="form-group">
                <PrimaryButton text={LOGIN} isLoading={loggingIn} />
                <Link to={REGISTER} className="btn btn-link">Register</Link>
            </div>
        </form>
    );
}

export default LoginForm