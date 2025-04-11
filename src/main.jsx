import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Buy from "./pages/Buy.jsx";
import Sell from "./pages/Sell.jsx";

function Layout() {
  const navigate = useNavigate();

  const navAway = (destination) => {
    console.log(destination);
    navigate(`/${destination}`);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <h1 className="site-title" onClick={() => navigate("/")}>
            MaizeBlock
          </h1>
          <div className="header-buttons">
            <button className="primary-button" onClick={() => navAway("buy")}>
              Tickets
            </button>
            <button className="primary-button" onClick={() => navAway("sell")}>
              Sell Tickets
            </button>
            <button className="secondary-button">Connect Wallet</button>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" inde={true} element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </>
  );
}

// Render the app with the BrowserRouter wrapping everything
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
