import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, Checkbox, FormControlLabel, Box, Container, createTheme, ThemeProvider, CssBaseline, Typography, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { ToastContext } from '../context/ToastContext';
import { Roles } from '../types';
import { userService } from '../_services/user.service';

function EditUserComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.user;
    const [username, setUsername] = useState(user.username)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [roles, setRoles] = useState(user.roles)
    const setToast = useContext(ToastContext);
    const rolesArray = Object.values(Roles);

    const handleRoleChange = (role: Roles) => {
        if (roles.includes(role)) {
            setRoles(roles.filter((r) => r !== role));
        } else {
            setRoles([...roles, role]);
        }
    };

    const saveUser = async (e) => {
        e.preventDefault();
        const editUser = { firstName, lastName, email, roles }
        try {
            await userService.update(username, editUser);
            setToast({ type: 'success', message: 'Updating user successful!' });
            navigate('/')
            return user;
        } catch (error) {
            setToast({ type: 'error', message: error.toString() });
        }
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit User
                    </Typography>
                    <Box component="form" onSubmit={saveUser} noValidate sx={{ mt: 1 }}>
                        <TextField name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" fullWidth margin="normal" />
                        <TextField name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" fullWidth margin="normal" />
                        <TextField name="email" value={email} onChange={e => setEmail(e.target.value)} label="Email" fullWidth margin="normal" />
                        <TextField name="username" value={username} disabled label="Username" fullWidth margin="normal" />
                        <FormControl fullWidth margin="normal">
                            {rolesArray.map((role, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={roles.includes(role)}
                                            onChange={() => handleRoleChange(role)}
                                            name={role}
                                        />
                                    }
                                    label={role}
                                />
                            ))}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Edit User
                        </Button>
                        <Button component={Link} to="/" variant="text" fullWidth>Cancel</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export { EditUserComponent };
