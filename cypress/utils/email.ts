import { faker } from "@faker-js/faker"

export interface Email {
    subject: string,
    body: string
}

export const getRandomEmail = (): Email => {
    return {
        subject: faker.random.words(5),
        body: faker.lorem.paragraphs(2)
    }
}