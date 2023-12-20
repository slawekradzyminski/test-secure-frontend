import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { register } from '../../_actions/user.actions';
import { ToastContext } from '../../context/ToastContext';
import { useAppDispatch } from '../../_helpers/store';
import RegisterForm from './RegisterForm';
import { RootState } from '../../_reducers';

function RegisterPage() {
    const setToast = useContext(ToastContext);
    const registering = useSelector((state: RootState) => state.registration.registering);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    function handleSubmit(user: any) {
        dispatch(register({ user, setToast, navigate }))
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <RegisterForm onSubmit={handleSubmit} registering={registering} />
        </div>
    );
}

export { RegisterPage };