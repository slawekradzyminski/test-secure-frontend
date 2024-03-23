import { Roles } from "./roles";

export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    roles: Roles[]
}