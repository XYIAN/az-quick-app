import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.scss";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-teal/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
