import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
    let mockSubmit: jest.Mock;

    beforeEach(() => {
        mockSubmit = jest.fn();
    });

    test('renders correctly', async () => {
        // ARRANGE
        render(<LoginForm onSubmit={mockSubmit} />);

        // ACT
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        // ASSERT
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test('validates inputs and allows form submission', async () => {
        // ARRANGE
        render(<LoginForm onSubmit={mockSubmit} />);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByText('Sign In');

        // ACT
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpass');
        await userEvent.click(submitButton);

        // ASSERT
        expect(mockSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
    });

    test('shows error when username is less than 3 characters', async () => {
        // ARRANGE
        render(<LoginForm onSubmit={mockSubmit} />);
        const usernameInput = screen.getByLabelText(/username/i);
        const submitButton = screen.getByText('Sign In');

        // ACT
        await userEvent.type(usernameInput, 'te');
        userEvent.click(submitButton);

        // ASSERT
        expect(screen.getByText('Username must be at least 3 characters long')).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });
});
