import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import App from "./App.tsx";
import "@fontsource/coming-soon";

import amplifyconfig from "../amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
