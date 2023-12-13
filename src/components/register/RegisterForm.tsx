import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "../common/Input";
import { getHandleChange } from "../util/change";
import { PrimaryButton } from "../common/PrimaryButton";
import { Roles } from '../../types';

interface Props {
    onSubmit: (user: any) => void;
    registering: boolean;
}

const RegisterForm: React.FC<Props> = ({ onSubmit, registering }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [roles, setRoles] = useState([Roles.ROLE_CLIENT])
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setSubmitted(true);
        const user = { firstName, lastName, username, password, roles, email }
        onSubmit(user);
    }

    return (
        <form name="form" onSubmit={handleSubmit}>
            <Input name="firstName" value={firstName} submitted={submitted}
                handleChange={getHandleChange(setFirstName)} />
            <Input name="lastName" value={lastName} submitted={submitted}
                handleChange={getHandleChange(setLastName)} />
            <Input name="username" value={username} submitted={submitted}
                handleChange={getHandleChange(setUsername)} />
            <Input name="password" value={password} submitted={submitted} type='password'
                handleChange={getHandleChange(setPassword)} />
            <Input name="email" value={email} submitted={submitted}
                handleChange={getHandleChange(setEmail)} />
            <div className="form-group">
                <PrimaryButton text="Register" isLoading={registering} />
                <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export default RegisterForm;