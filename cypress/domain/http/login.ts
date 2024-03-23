import { Roles } from "../roles"
import { User } from "../user"

interface LoginResponse {
    username: string,
    roles: Roles[],
    firstName: string,
    lastName: string,
    email: string,
    token: string
}

export const getLoginResponseFor = (user: User): LoginResponse => {
    return {
        username: user.username,
        roles: user.roles,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: 'fakeToken'
    }
}