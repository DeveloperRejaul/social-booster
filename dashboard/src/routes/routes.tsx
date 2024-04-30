import { createBrowserRouter } from 'react-router-dom';
import Main from './main';
import Login from '../features/login/Login';
import Protected from './Protected';
import Facebook from '../features/fb/fb';
import Gmail from '../features/gmail/Gmail';
import Terminal from '../features/terminal/Terminal';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Protected> <Main /> </Protected>,
        children: [
            {
                element: <Protected> <Facebook /> </Protected>,
                path: "/",
            },
            {
                element: <Protected> <Gmail /> </Protected>,
                path: "/gmail",
            },
            {
                element: <Protected> <Terminal /> </Protected>,
                path: "/terminal",
            },
        ]

    },
    {
        path: "/login",
        element: <Login />
    }
])