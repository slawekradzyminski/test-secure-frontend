import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../_reducers';
import DesktopView from './DesktopView';
import React from 'react';

const renderWithRedux = (
    component,
    { initialState = {}, store = configureStore({ reducer: rootReducer, preloadedState: initialState }) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};

describe('DesktopView', () => {

    test('renders without crashing', () => {
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders DesktopToolbar when loggedIn is true', () => {
        const initialState = { authentication: { loggedIn: true } };
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>, { initialState });
        expect(screen.getByText('QR Codes')).toBeInTheDocument();
    });

});