import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { TextField, Button, FormControl, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Roles, EditUser } from '../../types';

interface Props {
    user: EditUser;
    onSubmit: (user: EditUser) => void;
}

const EditUserForm: React.FC<Props> = ({ user, onSubmit }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [roles, setRoles] = useState(user.roles);
    const rolesArray = Object.values(Roles);

    const handleRoleChange = (role: Roles) => {
        if (roles.includes(role)) {
            setRoles(roles.filter((r) => r !== role));
        } else {
            setRoles([...roles, role]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ firstName, lastName, email, roles });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" fullWidth margin="normal" />
            <TextField name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" fullWidth margin="normal" />
            <TextField name="email" value={email} onChange={e => setEmail(e.target.value)} label="Email" fullWidth margin="normal" />
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
    );
};

export default EditUserForm;