import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AboutUs from './pages/About-us.jsx'
import Contacts from './pages/Contacts.jsx'
import Academics from './pages/Academics.jsx'
const router = createBrowserRouter(
  [
  { path: "/", element: <App /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/academics", element: <Academics /> },
  { path: "/about-us", element: <AboutUs /> }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
