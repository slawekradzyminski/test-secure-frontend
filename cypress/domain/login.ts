import { Roles } from "./roles";

export interface LoginResponse {
    username: string,
    roles: Roles[],
    firstName: string,
    lastName: string,
    email: string,
    token: string
}

export const getLoginResponse = (): LoginResponse => {
    return {
        username: "admin",
        roles: [
            Roles.ROLE_ADMIN,
            Roles.ROLE_CLIENT
        ],
        firstName: "Slawomir",
        lastName: "Radzyminski",
        token: "fakeToken",
        email: "admin@email.com"
    }
}