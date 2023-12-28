import React, { useContext, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { TextField, Button, Typography, Box, CssBaseline, Avatar, FormHelperText, TextareaAutosize } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { Email } from '../types';
import { ToastContext } from '../context/ToastContext';
import { sendEmail } from '../api/email.api';
import ThemedContainer from './core/ThemedContainer';

function EmailComponent() {
    const location = useLocation()
    const user = location.state.user;
    const to = user.email
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const setToast = useContext(ToastContext);

    const [subjectError, setSubjectError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        setSubjectError(subject.length < 3);
        setMessageError(message.length < 3);

        if (subjectError || messageError) {
            return;
        }

        const email: Email = { to, subject, message }
        try {
            await sendEmail(email);
            setToast({ type: 'success', message: 'Email scheduled to be send' });
            setSubject('')
            setMessage('')
        } catch (error) {
            setToast({ type: 'error', message: error.toString() });
        }
    };

    return (
        <ThemedContainer maxWidth="xs">
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
                    <EmailIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Email user
                </Typography>
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                    <TextField disabled fullWidth name="email" value={to} label="Email" margin="normal" />
                    <TextField name="subject" value={subject} error={submitted && subjectError}
                        onChange={(e) => setSubject(e.target.value)} label="Subject" fullWidth margin="normal" />
                    {subjectError && <FormHelperText error>Subject must be at least 3 characters long</FormHelperText>}
                    <TextareaAutosize
                        minRows={5}
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '500px', marginBottom: '1rem' }}
                    />
                    {messageError && <FormHelperText error>Message must be at least 3 characters long</FormHelperText>}
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Send email</Button>
                        <Button component={Link} to="/" variant="text" fullWidth>Cancel</Button>
                    </Box>
                </Box>
            </Box>
        </ThemedContainer>
    );
}

export { EmailComponent };