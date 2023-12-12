import { userConstants } from '../_constants';
import { User } from '../types';

export type EditUserState = User | {
  loading?: boolean;
  edituser?: User;
  error?: any; 
}

type Action = {
  type: string;
  user?: User;
  error?: any; 
};

export function edituser(state: EditUserState = {}, action: Action): EditUserState {
    switch (action.type) {
        case userConstants.SAVE_USER:
            return action.user;

        case userConstants.UPDATE_USER_REQUEST:
            return {
                loading: true
            };
        case userConstants.UPDATE_USER_SUCCESS:
            return {
                edituser: action.user
            };
        case userConstants.UPDATE_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}