import React from 'react';
import { User } from '../../types';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Email as EmailIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface UserTableProps {
    users: User[];
    handleDelete: (username: string) => Promise<void>;
    isAdmin: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleDelete, isAdmin }) => {
    const navigate = useNavigate();

    const editUser = (user: User) => {
        navigate('/edit-user', { state: { user } });
    }

    const emailUser = (user: User) => {
        navigate('/email', { state: { user } });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) =>
                        <TableRow key={user.id}>
                            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                            <TableCell>
                                {isAdmin &&
                                    <IconButton onClick={() => handleDelete(user.username)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                <IconButton onClick={() => editUser(user)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => emailUser(user)} color="primary">
                                    <EmailIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;