import { Roles } from "./roles"
import { faker } from '@faker-js/faker';

export type User = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        username: faker.internet.userName() + faker.random.alpha(1),
        firstName: faker.name.firstName() + faker.random.alpha(1),
        lastName: faker.name.lastName() + faker.random.alpha(1),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}