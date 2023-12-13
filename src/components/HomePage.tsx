import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'

import { Roles, RootState, User } from '../types';
import { _delete, getAll } from '../_actions/user.actions';

function HomePage() {
    const navigate = useNavigate();
    const users = useSelector((state: RootState) => state.users);
    const user = useSelector((state: RootState) => state.authentication.user);
    const isAdmin = user.roles.includes(Roles.ROLE_ADMIN)
    const dispatch = useDispatch();
    const tokenCookie = 'token'

    useEffect(() => {
        dispatch(getAll());
    }, []);

    useEffect(() => {
        readCookie()
    }, []);

    const readCookie = () => {
        if (!Cookies.get(tokenCookie)) {
            navigate('/login');
        }
    }

    const handleDeleteUser = username => dispatch(_delete(username))

    const editUser = (user: User) => {
        console.log(user)
        navigate('/edit-user', { state: { user } });
    }

    const emailUser = () => {
        navigate('/email');
    }

    const displayDeleteSection = user => {
        const displayLoading = () => <em> - Deleting...</em>
        const displayDeleteError = () => <span className="text-danger"> - ERROR: {user.deleteError}</span>
        const handleDeleteClick = () => window.confirm("Are you sure you wish to delete this item?") && handleDeleteUser(user.username)
        const displayDeleteButton = () => <span> - <a onClick={handleDeleteClick} className="text-primary delete">Delete</a></span>

        return user.deleting ? displayLoading()
            : user.deleteError ? displayDeleteError()
                : displayDeleteButton();
    }

    const displayUsers = () => {
        return <ul>
            {users.items.map((user) =>
                <li key={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                    {isAdmin && displayDeleteSection(user)}
                    {<span> - <a onClick={() => editUser(user)} className="text-primary edit">Edit</a></span>}
                    {<span> - <a onClick={() => emailUser()} className="text-primary email">Email</a></span>}
                </li>
            )}
        </ul>;
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in! Congratulations :)</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items && displayUsers()}
            <p>
                <Link id="logout" to="/login" onClick={() => Cookies.remove('token')}>Logout</Link>
            </p>
            <p>
                <Link id="addmore" to="/add-user">Add more users</Link>
            </p>
        </div>
    );
}

export { HomePage };