import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { sendEmail } from '../_services/email.service';
import { Email, User } from '../types';

export const userActions = {
    login,
    logout,
    register,
    saveEditDetails,
    update,
    getAll,
    delete: _delete,
    handleEmail
};

function login(username: string, password: string, from: string, navigate: Function) {
    return dispatch => {
        dispatch(request(username));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    navigate(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(username: string) { return { type: userConstants.LOGIN_REQUEST, username } }
    function success(user: User) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error: string) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user: User, navigate: Function) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                () => {
                    dispatch(success(user));
                    navigate('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user: User) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user: User) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error: string) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users: User[]) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error: string) { return { type: userConstants.GETALL_FAILURE, error } }
}

function saveEditDetails(user: User) {
    return dispatch => {
        dispatch(request(user));
    }

    function request(user: User) { return { type: userConstants.SAVE_USER, user } }
}

function update(user: User, navigate: Function) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                () => {
                    dispatch(success(user));
                    navigate('/');
                    dispatch(alertActions.success('Updating user successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user: User) { return { type: userConstants.UPDATE_USER_REQUEST, user } }
    function success(user: User) { return { type: userConstants.UPDATE_USER_SUCCESS, user } }
    function failure(error: string) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}

function handleEmail(email: Email) {
    return dispatch => {
        sendEmail(email)
            .then(
                () => {
                    dispatch(alertActions.success('Email was scheduled to be send'));
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function _delete(username: string) {
    return dispatch => {
        dispatch(request(username));

        userService.delete(username)
            .then(
                () => dispatch(success(username)),
                error => dispatch(failure(username, error.toString()))
            );
    };

    function request(username: string) { return { type: userConstants.DELETE_REQUEST, username } }
    function success(username: string) { return { type: userConstants.DELETE_SUCCESS, username } }
    function failure(username: string, error: string) { return { type: userConstants.DELETE_FAILURE, username, error } }
}