export const handleResponse = async (response: Response) => {
    const text = await response.text();
    const data = parseText(text)
    if (!response.ok) {
        if (response.status === 403) {
            window.location.href = '/login';
            throw new Error('Not authenticated');
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}

const parseText = (text: string) => {
    if (text) {
        try {
            return JSON.parse(text)
        } catch (error) {
            return text
        }
    }
}