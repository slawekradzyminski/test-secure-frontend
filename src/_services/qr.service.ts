import { handleImageResponse } from "./responseHandler";

export type CreateQrDto = {
    text: string
}

export const generateQrCode = async (createQrDto: CreateQrDto) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify(createQrDto)
    };

    const response = await fetch(`${process.env.API_URL}/qr/create`, requestOptions);
    const blob = await handleImageResponse(response);
    const url = URL.createObjectURL(blob);
    return url;
}

