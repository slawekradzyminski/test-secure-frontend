import { Roles } from "../domain/roles"
import { faker } from '@faker-js/faker';

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string,
    roles: Roles[]
}

export const getRandomUser = (): User => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}