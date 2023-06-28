import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import {Timer} from "./pages/Timer";
import {Settings} from "./pages/Settings";
import {Programs} from "./pages/Programs";
import {Root} from "./modules/Root";
import {About} from "./pages/About";

import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
              path: "/",
              element: <About/>
            },
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
            },
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
