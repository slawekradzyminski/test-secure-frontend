import { combineReducers } from '@reduxjs/toolkit';

import usersReducer, { UsersState } from './users.reducer';
import authenticationReducer, { AuthenticationState } from './authentication.reducer';

export type RootState = {
    authentication: AuthenticationState
    users: UsersState,
};

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    users: usersReducer,
});

export default rootReducer;