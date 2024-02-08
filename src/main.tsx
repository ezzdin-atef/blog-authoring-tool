import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EditorContextProvider } from "./Context";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <EditorContextProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </EditorContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
