import { userConstants } from '../_constants';

export type RegistrationState = {
  registering?: boolean;
};
type Action = {
  type: string;
};

export function registration(state: RegistrationState = {}, action: Action): RegistrationState {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}