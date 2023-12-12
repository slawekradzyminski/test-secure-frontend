import { AlertState } from './_reducers/alert.reducer';
import { AuthenticationState } from './_reducers/authentication.reducer';
import { EditUserState } from './_reducers/edituser.reducer';
import { RegistrationState } from './_reducers/registration.reducer';
import { UsersState } from './_reducers/users.reducer';

export type RootState = {
    authentication: AuthenticationState;
    alert: AlertState
    edituser: EditUserState
    registration: RegistrationState
    users: UsersState
};

export type User = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles[];
    deleting?: boolean; 
};

export enum Roles {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_CLIENT = 'ROLE_CLIENT'
}