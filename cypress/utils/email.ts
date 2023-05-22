import { faker } from '@faker-js/faker';

export interface Email {
    subject: string,
    message: string
}

export const getEmail = (): Email => {
    return {
        subject: faker.lorem.words(3),
        message: faker.lorem.sentence()
    }
}