import { faker } from '@faker-js/faker';

// Upublicznienie (udostępnienie) tej funkcji dla innych plików w projekcie
// Słówko export powoduje ze zaczynając pisać getR... Visual Studio Code nam to podpowie
// W innych plikach mozna tą funkcję zaimporotować i jej uzywać
// Import powinniśmy robić zawsze przez IDE o ile się da.
export const getRandomUser = () => {
    return {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        roles: ['ROLE_ADMIN', 'ROLE_CLIENT']
    }
}