import { createStore, applyMiddleware, Action } from 'redux';
import { ThunkAction, thunk } from 'redux-thunk';
import rootReducer from '../_reducers/index';

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk
    )
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;