import { combineReducers } from '@reduxjs/toolkit';

import registrationReducer, { RegistrationState } from './registration.reducer';
import usersReducer, { UsersState } from './users.reducer';
import edituserReducer, { EditUserState } from "./edituser.reducer";
import authenticationReducer, { AuthenticationState } from './authentication.reducer';
import qrReducer, { QrState } from './qr.reducer';

export type RootState = {
    authentication: AuthenticationState
    edituser: EditUserState
    registration: RegistrationState
    users: UsersState,
    qr: QrState
};

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    registration: registrationReducer,
    users: usersReducer,
    edituser: edituserReducer,
    qr: qrReducer
});

export default rootReducer;