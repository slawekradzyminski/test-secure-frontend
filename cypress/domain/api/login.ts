import { Roles, User } from "../user";

interface LoginResponse {
    firstName: string,
    lastName: string,
    username: string,
    token: string,
    email: string,
    roles: Roles[]
}

export const getLoginResponseFrom = (user: User): LoginResponse => {
    const { password, ...userWithoutPassword } = user
    return {
        ...userWithoutPassword,
        token: 'fakeToken'
    }
}