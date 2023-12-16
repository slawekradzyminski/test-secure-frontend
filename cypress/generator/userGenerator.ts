import { faker } from '@faker-js/faker';
import { Roles, User } from '../domain/user';

export const getRandomUser = (): User => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        roles: [ Roles.ROLE_ADMIN, Roles.ROLE_CLIENT ]
    }
}
