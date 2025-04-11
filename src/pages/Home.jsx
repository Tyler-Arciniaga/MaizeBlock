"use client";
import { useState } from "react";
import "./Home.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const navAway = (desination) => {
    console.log(desination);
    navigate(`/${desination}`);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="hero-section">
          <h2 className="hero-title">
            Michigan Student Tickets on the Blockchain
          </h2>
          <p className="hero-description">
            Buy and sell University of Michigan sports tickets securely using
            cryptocurrency
          </p>
          <div className="hero-buttons">
            <button className="cta-primary" onClick={() => navAway("buy")}>
              Browse Tickets
            </button>
            <button className="cta-secondary" onClick={() => navAway("sell")}>
              Sell Your Tickets
            </button>
          </div>
        </section>

        <section className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Upcoming Games</h3>
            <ul className="game-list">
              {[
                "vs. Ohio State",
                "vs. Michigan State",
                "vs. Penn State",
                "vs. Washington",
                "vs. Minnesota",
                "vs. UNLV",
              ].map((game, index) => (
                <li key={index} className="game-item">
                  <span>{game}</span>
                  <button className="ticket-button">View Tickets</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">How It Works</h3>
            <ol className="how-it-works-list">
              <li className="how-it-works-item">Connect your Solana wallet</li>
              <li className="how-it-works-item">
                Browse available tickets for Michigan games
              </li>
              <li className="how-it-works-item">
                Purchase tickets securely with cryptocurrency
              </li>
              <li className="how-it-works-item">Receive your ticket</li>
              <li className="how-it-works-item">
                Show your ticket at the game or resell it on our platform
              </li>
            </ol>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>
            © 2023 MaizeBlock - University of Michigan Student Ticket Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
