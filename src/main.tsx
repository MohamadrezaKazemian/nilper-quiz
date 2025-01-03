import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./fonts.css";
import App from "./App.tsx";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <DirectionProvider dir="rtl">
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </DirectionProvider>,
);
