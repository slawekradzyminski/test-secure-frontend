import { userConstants } from '../_constants';
import { User } from '../types';

export type AuthenticationState = {
  loggedIn?: boolean;
  loggingIn?: boolean;
  user?: User;
};
type Action = {
  type: string;
  user?: User;
};

let user: User = JSON.parse(localStorage.getItem('user'));
const initialState: AuthenticationState = user ? { loggedIn: true, user } : {};

export function authentication(state: AuthenticationState = initialState, action: Action): AuthenticationState {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}