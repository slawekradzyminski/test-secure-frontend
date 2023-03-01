import { Roles } from "./roles";

export interface LoginResponse {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    token: string,
    roles: Roles[]
}