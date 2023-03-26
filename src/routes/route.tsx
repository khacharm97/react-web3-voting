import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transaction";
import Voting from "../pages/Voting";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
               path: '/transactions',
               element: <Transaction />
            },
            {
               path: '/voting',
               element: <Voting />
            }
        ]
    },
]);
