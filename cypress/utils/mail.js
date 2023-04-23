import { faker } from '@faker-js/faker';

export const getRandomEmail = () => {
    return {
        emailSubject: faker.lorem.sentence(3),
        emailMessage: faker.lorem.words(10),
    }
}
