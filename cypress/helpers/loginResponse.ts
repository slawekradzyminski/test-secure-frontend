import { User } from "../utils/user"

export const buildLoginResponseBody = (user: User) => {
    const { password, ...userWithoutPassword } = user
    return {
        ...userWithoutPassword,
        token: 'fakeToken'
    }
}