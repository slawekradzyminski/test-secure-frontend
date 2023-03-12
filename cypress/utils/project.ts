import { faker } from "@faker-js/faker"

export interface Project {
    name: string,
    prefix: string,
    description: string
}

export const getRandomProject = (): Project => {
    const randomWord = faker.random.word()
    return {
        name: randomWord,
        prefix: randomWord,
        description: faker.lorem.sentence()
    }
}