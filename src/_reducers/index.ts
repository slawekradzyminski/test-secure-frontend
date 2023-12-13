import { combineReducers } from '@reduxjs/toolkit';

import registrationReducer from './registration.reducer';
import usersReducer from './users.reducer';
import alertReducer from './alert.reducer';
import edituserReducer from "./edituser.reducer";
import authenticationReducer from './authentication.reducer';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    registration: registrationReducer,
    users: usersReducer,
    alert: alertReducer,
    edituser: edituserReducer
});

export default rootReducer;