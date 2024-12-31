import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client"; // Import hydrateRoot et createRoot (nouveautés de React 18 et +, à la place de hydrate et render )
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  // To use hydrateRoot to attach React to pre-rendered HTML generated by react-snap
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
} else {
  // To use createRoot to render the app without pre-rendered content (ex: in development mode)
  createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
}
