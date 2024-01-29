import { User, Roles } from '../../src/types'
import { faker } from '@faker-js/faker';
import { fakeToken } from '../config/constants';

export const getRandomUser = (): User => {
    return {
        username: faker.internet.userName(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT, Roles.ROLE_DOCTOR],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        token: fakeToken,
        email: faker.internet.email(),
        password: faker.internet.password(),
        doctorTypes: [{
            id: 0,
            doctorType: faker.person.jobTitle()
        }]
    }
}