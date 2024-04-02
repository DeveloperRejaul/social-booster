import { createBrowserRouter } from 'react-router-dom';
import Main from './main';
import Login from '../features/login/Login';
import Protected from './Protected';
import Home from '../features/home/Home';
import Gmail from '../features/gmail/Gmail';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Protected> <Main /> </Protected>,
        children: [
            {
                element: <Protected> <Home /> </Protected>,
                path: "/",
            }, {
                element: <Protected> <Gmail /> </Protected>,
                path: "/gmail",
            },
        ]

    },
    {
        path: "/login",
        element: <Login />
    }
])