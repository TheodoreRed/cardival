import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import CardSetContextProvider from "./context/CardSetContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CardSetContextProvider>
        <App />
      </CardSetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
