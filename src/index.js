import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import App from './App'
import GlobalStyles from './components/GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Router>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Router>
    </React.StrictMode>,
)
