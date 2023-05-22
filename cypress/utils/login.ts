import { User } from "./user";

export const buildLoginResponse = ({ password, ...userWithoutPassword }: User) => ({
    ...userWithoutPassword,
    token: 'fakeToken'
})