import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App />   
    </BrowserRouter>
  </StrictMode>,
)
// wrapped the entire app inside <BrowserRouter>
// entire vs code is built using electron.js