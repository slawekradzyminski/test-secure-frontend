import { Roles } from "./roles";
import { faker } from '@faker-js/faker';

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        roles: [ Roles.ROLE_ADMIN, Roles.ROLE_CLIENT ]
    }
}
