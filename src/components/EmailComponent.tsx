import React, { useContext, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { TextField, Button, Typography, Box, Container, CssBaseline, Avatar, FormHelperText, TextareaAutosize } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import { Email } from '../types';
import { handleEmail } from '../_actions/user.actions';
import { useAppDispatch } from '../_helpers/store';
import { ToastContext } from '../context/ToastContext';

function EmailComponent() {
    const location = useLocation()
    const dispatch = useAppDispatch();
    const user = location.state.user;
    const [to, setTo] = useState(user.email)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const setToast = useContext(ToastContext);

    const [subjectError, setSubjectError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSubmitted(true)
        setSubjectError(subject.length < 3);
        setMessageError(message.length < 3);

        if (subject.length < 3 || message.length < 3) {
            return;
        }

        const email: Email = { to, subject, message }
        dispatch(handleEmail({ email, setToast }));
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
                        <EmailIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Email user
                    </Typography>
                    <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1 }}>
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
            </Container>
        </ThemeProvider>
    );
}

export { EmailComponent };