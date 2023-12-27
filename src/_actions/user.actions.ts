import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types';
import { userService } from '../api/user.api';

export const login = createAsyncThunk<User,
    { username: string; password: string; from: string; navigate: Function, setToast: Function },
    { rejectValue: string }>(
        'user/login',
        async ({ username, password, from, navigate, setToast }, { rejectWithValue }) => {
            try {
                const user = await userService.login(username, password);
                navigate(from);
                return user;
            } catch (error) {
                setToast({ type: 'error', message: error.toString() });
                return rejectWithValue(error.toString());
            }
        }
    );

export const refresh = createAsyncThunk<User,
    {},
    { rejectValue: string }>(
        'user/refresh',
        async ({ }, { rejectWithValue }) => {
            try {
                const user = await userService.refresh();
                return user;
            } catch (error) {
                return rejectWithValue(error.toString());
            }
        }
    );

export const logout = createAsyncThunk<void,
    void,
    { rejectValue: string }>(
        'user/logout',
        async (_, { rejectWithValue }) => {
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
        async ({ user, setToast, navigate }, { rejectWithValue }) => {
            try {
                await userService.register(user);
                setToast({ type: 'success', message: 'Registration successful!' });
                navigate('/login')
                return user;
            } catch (error) {
                setToast({ type: 'error', message: error.toString() });
                return rejectWithValue(error.toString());
            }
        }
    );

