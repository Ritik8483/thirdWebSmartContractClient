import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Sepolia } from "@thirdweb-dev/chains";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="c51f4ecbb243c47146aa2dfb0cd7cbdf"
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();

// U5FWT8UBVhfUUdXC5SK4LQGvANXsZzaw9ZbD4jmIjjynXMZM9O222b8L8l4G4GcGt_XYwhcZTbiQO9chKirwew
