type RegisterResponse = {
    timestamp: string,
    status: number,
    error: string,
    message: string,
    path: string
}

export const errorMessage = "Username is already in use"

export const generateRegisterResponse = (): RegisterResponse => {
    return {
        "timestamp": "2022-10-22T14:00:35.985+00:00",
        "status": 422,
        "error": "Unprocessable Entity",
        "message": errorMessage,
        "path": "/users/signup"
    }
}