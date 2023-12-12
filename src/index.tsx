import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './components/core/App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);