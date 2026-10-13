import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "app/App";
import "shared/theme/index.css";
import { applyTheme, readTheme } from "shared/lib";

applyTheme(readTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
