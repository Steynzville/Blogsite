import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { installCommerceTracking } from './lib/commerce.mjs';
installCommerceTracking(document, window);

createRoot(document.getElementById("root")!).render(<App />);
