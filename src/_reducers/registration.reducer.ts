import { createSlice } from '@reduxjs/toolkit';
import { register } from '../_actions/user.actions';

export type RegistrationState = {
    registering?: boolean;
};

const initialState: RegistrationState = {};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.registering = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.registering = false;

            })
            .addCase(register.rejected, (state) => {
                state.registering = false;
            })
    }
});

export default registrationSlice.reducer;