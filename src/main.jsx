import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Buy from "./pages/Buy.jsx";
import Sell from "./pages/Sell.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" index={true} element={<App />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/sell" element={<Sell />} />
    </Routes>
  </BrowserRouter>
);
