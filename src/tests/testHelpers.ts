import { useDispatch } from 'react-redux';

export function setupMockDispatch() {
    const mockDispatch = jest.fn().mockImplementation(() => Promise.resolve());
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    return mockDispatch;
}