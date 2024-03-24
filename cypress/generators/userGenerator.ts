import { Roles } from "../domain/roles";
import { User } from "../domain/user";
import { fakerPL as faker } from '@faker-js/faker'

export const getRandomUser = (): User => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        roles: [Roles.ROLE_CLIENT, Roles.ROLE_ADMIN]
    }
}

export const getRandomUserWithFirstName = (firstName: string): User => {
    return {
        firstName: firstName,
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        roles: [Roles.ROLE_CLIENT, Roles.ROLE_ADMIN]
    }
}