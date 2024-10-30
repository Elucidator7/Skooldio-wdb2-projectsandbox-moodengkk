import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Page_ProductDetail from "./pages/Page_ProductDetail";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page_ProductDetail />
  </StrictMode>
);
