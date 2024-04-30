import ReactDOM from 'react-dom/client'
import './config/index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './store/context/AppContext'
import { Provider } from 'react-redux'
import { store } from './store/rtk/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppContext >
    <Provider store={store}>
      <RouterProvider router={routes} />
      <ToastContainer />
    </Provider>
  </AppContext>
)
