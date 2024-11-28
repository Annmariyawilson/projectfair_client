import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './Context/Contextapi.jsx'
import TokenContext from './Context/TokenContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Contextapi>
        <TokenContext>
        <App />
        </TokenContext>
      </Contextapi>
    </BrowserRouter>
  </StrictMode>,
)
