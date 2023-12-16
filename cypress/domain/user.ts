export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    roles: Roles[]
}

export enum Roles {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_CLIENT = 'ROLE_CLIENT'
}