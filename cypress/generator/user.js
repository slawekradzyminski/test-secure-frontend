export const getRandomUser = () => {
    return {
        firstName: generateRandomString(6),
        lastName: generateRandomString(6),
        email: getRandomEmail(),
        password: generateRandomString(6),
        username: generateRandomString(6),
        roles: [ 'ROLE_ADMIN', 'ROLE_CLIENT' ]
    }
}

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 1; i <= length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

const getRandomEmail = () => `${generateRandomString(10)}@cantest.it`