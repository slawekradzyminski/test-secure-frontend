import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "./common/Input";
import {getHandleChange} from "./util/change";
import {DisabledInput} from "./common/DisabledInput";
import {PrimaryButton} from "./common/PrimaryButton";
import { RootState } from '../types';
import { userActions } from '../_actions/user.actions';
import { AppDispatch } from '../_helpers/store';

function EditUserComponent() {

    let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [username, setUsername] = useState(userToEdit.username)
    const [firstName, setFirstName] = useState(userToEdit.firstName)
    const [lastName, setLastName] = useState(userToEdit.lastName)
    const [email, setEmail] = useState(userToEdit.email)
    const [roles, setRoles] = useState(userToEdit.roles)
    const editing = useSelector((state: RootState) => state.edituser.loading);
    const [submitted, setSubmitted] = useState(false);

    const saveUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        const user = {firstName, lastName, username, email, roles}
        dispatch(userActions.update(user, navigate));
    };

    if (username === null) {
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>Something is no yes...</h2>
                <Link to="/" className="btn btn-link">Go back</Link>
            </div>
        );
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Edit user</h2>
            {username &&
            <form name="form" onSubmit={saveUser}>
                <Input name="firstName" value={firstName} submitted={submitted}
                       handleChange={getHandleChange(setFirstName)}/>
                <Input name="lastName" value={lastName} submitted={submitted}
                       handleChange={getHandleChange(setLastName)}/>
                <Input name="email" value={email} submitted={submitted}
                       handleChange={getHandleChange(setEmail)}/>
                <DisabledInput name="username" value={username}/>
                <DisabledInput name="roles" value={roles}/>
                <div className="form-group">
                    <PrimaryButton text="Edit User" isLoading={editing}/>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
            }
        </div>
    );
}

export {EditUserComponent};