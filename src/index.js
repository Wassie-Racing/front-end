import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./utils/ContextProvider";
import { ToastContainer } from "react-toastify";
import App from "./app/App";
import 'react-toastify/dist/ReactToastify.css';

import bg1 from './assets/images/bg1.webp';

const preloadLink = document.createElement("link");
preloadLink.href = bg1;
preloadLink.rel = "preload";
preloadLink.as = "image";
document.head.appendChild(preloadLink);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </BrowserRouter>
  </ContextProvider>
);
