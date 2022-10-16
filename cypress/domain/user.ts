import { Roles } from "./roles"
import { faker } from '@faker-js/faker';

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
        firstName: faker.name.firstName() + "a",
        lastName: faker.name.lastName() + "a",
        username: faker.internet.userName() + "a",
        password: faker.internet.password(),
        email: faker.internet.email(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}