import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootState } from '../../types';
import RoutesComponent from './RouterComponent';
import { ToastProvider } from '../common/ToastProvider';

function App() {
    const alert = useSelector((state: RootState) => state.alert);

    return (
        <ToastProvider>
            <div className="jumbotron">
                <div className="container">
                    <div className="col-md-8 offset-md-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router>
                            <RoutesComponent />
                        </Router>
                    </div>
                </div>
            </div>
        </ToastProvider>
    );
}

export { App };