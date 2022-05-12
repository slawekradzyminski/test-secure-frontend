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
        firstName: faker.name.firstName() + faker.random.alpha(1),
        lastName: faker.name.lastName() + faker.random.alpha(1),
        username: faker.internet.userName() + faker.random.alpha(1),
        password: faker.internet.password() + faker.random.alpha(1),
        email: faker.internet.email(),
        roles: [Roles.ROLE_ADMIN]
    }
}