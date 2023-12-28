import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types';
import { userService } from '../api/user.api';
import { setDoctorTypes } from '../api/doctorTypes.api';

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

export const updateDoctorTypes = createAsyncThunk<User,
    { selectedIds: number[], setToast: Function  },
    { rejectValue: string }>(
        'users/doctortypes',
        async ( {selectedIds, setToast } , { rejectWithValue }) => {
            try {
                const user = await setDoctorTypes({ doctorTypeIds: selectedIds });
                setToast({ open: true, message: 'Doctor types updated successfully!', type: 'success' });
                return user;
            } catch (error) {
                setToast({ open: true, message: 'Failed to update doctor types!', type: 'error' });
                return rejectWithValue(error.toString());
            }
        }
    );
