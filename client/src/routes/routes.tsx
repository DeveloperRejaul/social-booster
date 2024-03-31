import { createBrowserRouter } from 'react-router-dom';
import Main from './main';
import Login from '../features/login/Login';
import Protected from './Protected';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Protected>
            <Main />
        </Protected>
    },
    {
        path: "/login",
        element: <Login />
    }
])