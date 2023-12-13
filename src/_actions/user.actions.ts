import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../_services';
import { sendEmail } from '../_services/email.service';
import { Email, User } from '../types';
import alertActions from './alert.actions';

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
                dispatch(alertActions.actions.error(error.toString()));
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
    { user: User; navigate: Function },
    { rejectValue: string }>(
        'user/register',
        async ({ user, navigate }, { dispatch, rejectWithValue }) => {
            try {
                await userService.register(user);
                navigate('/');
                dispatch(alertActions.actions.success('Registration successful'));
                return user;
            } catch (error) {
                dispatch(alertActions.actions.error(error.toString()));
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
                dispatch(alertActions.actions.error(error.toString()));
                return rejectWithValue(error.toString());
            }
        }
    );

export const update = createAsyncThunk<User,
    { user: User; navigate: Function },
    { rejectValue: string }>(
        'user/update',
        async ({ user, navigate }, { dispatch, rejectWithValue }) => {
            try {
                await userService.update(user);
                navigate('/');
                dispatch(alertActions.actions.success('Updating user successful'));
                return user;
            } catch (error) {
                dispatch(alertActions.actions.error(error.toString()));
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
                dispatch(alertActions.actions.success('Email was scheduled to be send'));
            } catch (error) {
                dispatch(alertActions.actions.error(error.toString()));
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
                dispatch(alertActions.actions.error(error.toString()));
                return rejectWithValue({ username, error: error });
            }
        }
    );
