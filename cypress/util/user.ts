import { Roles } from "./roles"
import { faker } from '@faker-js/faker';

export type User = {
    firstName: string,
    lastName: string,
    roles: Roles[],
    username: string,
    password: string,
    email: string
}

export const getRandomUser = (): User => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        roles: [Roles.ROLE_ADMIN]
    }
}