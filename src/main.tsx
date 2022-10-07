import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./infrastructure/ui/App/App";
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
