import React from 'react';

import RootProvider from './shared/store';
import RootRouter from "./Router";
import RoutesPage from "./routes-page/RoutesPage";
import Navbar from "./shared/components/Navbar";
import ErrorModal from "./shared/components/modals/ErrorModal";

import './App.css';

function App() {
    return (
        <RootRouter>
            <RootProvider>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <RoutesPage />
                    </div>
                    <ErrorModal />
                </div>
            </RootProvider>
        </RootRouter>
    );
}

export default App;
