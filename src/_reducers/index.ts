import { combineReducers } from '@reduxjs/toolkit';

import usersReducer, { UsersState } from './users.reducer';
import edituserReducer, { EditUserState } from "./edituser.reducer";
import authenticationReducer, { AuthenticationState } from './authentication.reducer';

export type RootState = {
    authentication: AuthenticationState
    edituser: EditUserState
    users: UsersState,
};

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    users: usersReducer,
    edituser: edituserReducer,
});

export default rootReducer;