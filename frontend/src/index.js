import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux";
import Dashdata from "./Dashboard/Dashdata";
import Users from "./Dashboard/Users";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>

    <Route path="/Dashdata" element={<Dashdata />}/>
    <Route path="/users" element={<Users />}/>

  </Route>
));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
