import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { useThemeStore } from './stores/useThemeStore.js'

// Apply the persisted theme to the <html> element before the app paints,
// preventing a flash of the wrong theme on load.
const initialTheme = useThemeStore.getState().theme
document.documentElement.classList.toggle('dark', initialTheme === 'dark')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
