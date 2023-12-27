import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Roles } from '../../types';
import UserTable from './UserTable';
import { RootState } from '../../_reducers';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from "@mui/material";
import { userService } from '../../api/user.api';
import { ToastContext } from '../../context/ToastContext';
import ThemedContainer from '../core/ThemedContainer';

function HomePage() {
    const [users, setUsers] = useState([]);
    const user = useSelector((state: RootState) => state.authentication.user);
    const isAdmin = user.roles.includes(Roles.ROLE_ADMIN)
    const setToast = useContext(ToastContext)

    useEffect(() => {
        const fetchUsers = async () => {
            const usersFromApi = await userService.getAll();
            setUsers(usersFromApi);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (username: string) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            try {
                await userService.delete(username);
                const updatedUserList = users.filter(user => user.username !== username);
                setUsers(updatedUserList);
                setToast({ type: 'success', message: 'User deleted successfully' });
            } catch (error) {
                setToast({ type: 'error', message: error.toString() });
            }
        }
    }

    const defaultTheme = createTheme();

    return (
        <ThemedContainer maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in! Congratulations :)</p>
                <h3>All registered users:</h3>
                {users.length === 0 && <em>Loading users...</em>}
                {users && <UserTable users={users} handleDelete={handleDelete} isAdmin={isAdmin} />}
            </Box>
        </ThemedContainer>
    );
}

export { HomePage };

function setToast(arg0: { type: string; message: string; }) {
    throw new Error('Function not implemented.');
}
