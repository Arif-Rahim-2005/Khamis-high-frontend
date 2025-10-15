import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AboutUs from './pages/About-us.jsx'
import Contacts from './pages/Contacts.jsx'
import Clubs from './pages/clubs.jsx'
import Academics from './pages/Academics.jsx'
import AdminPage from './pages/Admin.jsx'
import ProtectedAdminRoute from "./components/protectedAdminroute.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/academics", element: <Academics /> },
  { path: "/clubs", element: <Clubs /> },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminPage />
      </ProtectedAdminRoute>
    ),
  },
  { path: "/about-us", element: <AboutUs /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
