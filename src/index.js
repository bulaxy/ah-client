import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"
import "./resources/style/index.css"
import "./resources/style/arkham.css"
import { BrowserRouter } from "react-router-dom";


const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
