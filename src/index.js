import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"
import "./resources/style/index.css"
import { BrowserRouter } from "react-router-dom";


const root = createRoot(document.getElementById('root'));
root.render(
    // <span className='test' >o</span>
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
