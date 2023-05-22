import { Roles } from "./roles"
import { faker } from '@faker-js/faker';

export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    roles: Roles[],
    email: string
}

export const getUser = (): User => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        roles: [ Roles.ROLE_ADMIN, Roles.ROLE_CLIENT ]
    }
}