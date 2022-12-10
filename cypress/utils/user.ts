import { faker } from '@faker-js/faker';
import { Roles } from './roles';

export type User = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        roles: [ Roles.ROLE_ADMIN, Roles.ROLE_CLIENT ]
    }
}