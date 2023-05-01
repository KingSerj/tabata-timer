import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Timer} from "./pages/Timer";
import {Settings} from "./pages/Settings";
import {Programs} from "./pages/Programs";
import {Root} from "./components/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            // {
            //   index: true,
            //   element: <App/>
            // },
            {
                path: "timer",
                element: <Timer/>
            },
            {
                path: "settings",
                element: <Settings/>
            },
            {
                path: "programs",
                element: <Programs/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
