import { faker } from '@faker-js/faker';

export type Project = {
    name: string,
    prefix: string,
    description: string
}

export const getRandomProject = (): Project => {
    const name = faker.random.word()

    return {
        name: name,
        prefix: name.substring(0, 3),
        description: faker.lorem.paragraph()
    }
}