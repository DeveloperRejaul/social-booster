import React from 'react'
import ReactDOM from 'react-dom/client'
import './config/index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContext >
      <RouterProvider router={routes} />
      <ToastContainer />
    </AppContext>
  </React.StrictMode>
)
