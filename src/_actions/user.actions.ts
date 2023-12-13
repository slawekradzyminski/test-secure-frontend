import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendEmail } from '../_services/email.service';
import { Email, User } from '../types';
import { alertError, alertSuccess } from '../_reducers/alert.reducer';
import { userService } from '../_services/user.service';

export const login = createAsyncThunk<User,
    { username: string; password: string; from: string; navigate: Function },
    { rejectValue: string }>(
        'user/login',
        async ({ username, password, from, navigate }, { dispatch, rejectWithValue }) => {
            try {
                const user = await userService.login(username, password);
                navigate(from);
                return user;
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const refresh = createAsyncThunk<User,
    { },
    { rejectValue: string }>(
        'user/refresh',
        async ({ }, { dispatch, rejectWithValue }) => {
            try {
                const user = await userService.refresh();
                return user;
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const logout = createAsyncThunk<void,
    void,
    { rejectValue: string }>(
        'user/logout',
        async (_, { dispatch, rejectWithValue }) => {
            try {
                userService.logout();
            } catch (error) {
                return rejectWithValue(error.toString());
            }
        }
    );

export const register = createAsyncThunk<User,
    { user: User; setToast: Function; navigate: Function },
    { rejectValue: string }>(
        'user/register',
        async ({ user, setToast, navigate }, { dispatch, rejectWithValue }) => {
            try {
                await userService.register(user);
                setToast({ type: 'success', message: 'Registration successful!' });
                navigate('/login')
                return user;
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const getAll = createAsyncThunk<User[],
    void,
    { rejectValue: string }>(
        'users',
        async (_, { dispatch, rejectWithValue }) => {
            try {
                const users = await userService.getAll();
                return users;
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const update = createAsyncThunk<User,
    { user: User; setToast: Function, navigate: Function },
    { rejectValue: string }>(
        'user/update',
        async ({ user, setToast, navigate }, { dispatch, rejectWithValue }) => {
            try {
                await userService.update(user);
                setToast({ type: 'success', message: 'Updating user successful!' });
                navigate('/')
                return user;
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const handleEmail = createAsyncThunk<void,
    Email,
    { rejectValue: string }>(
        'user/handleEmail',
        async (email, { dispatch, rejectWithValue }) => {
            try {
                await sendEmail(email);
                dispatch(alertSuccess('Email was scheduled to be send'));
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const _delete = createAsyncThunk<string,
    string,
    { rejectValue: { username: string, error: any } }>(
        'user/delete',
        async (username, { dispatch, rejectWithValue }) => {
            try {
                await userService.delete(username);
                return username;
            } catch (error) {
                dispatch(alertError(error.toString()));
                return rejectWithValue({ username, error: error });
            }
        }
    );
