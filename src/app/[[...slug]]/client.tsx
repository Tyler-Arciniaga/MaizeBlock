// app/[[...slug]]/client.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Home from "../../pages/Home";
import Buy from "../../pages/Buy";
import Sell from "../../pages/Sell";

// Header component to be used across all pages
function Header() {
  const router = useRouter();

  const navAway = (destination: string) => {
    console.log(destination);
    router.push(`/${destination}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="site-title" onClick={() => router.push("/")}>
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
  );
}

// Main client component that handles routing
export function ClientOnly({ slug }: { slug?: string[] }) {
  // Determine which page to render based on the slug
  const renderPage = () => {
    // If slug is undefined or empty array, render the home page
    if (!slug || slug.length === 0 || (slug.length === 1 && slug[0] === "")) {
      return <Home />;
    }

    // Otherwise route based on the first part of the slug
    switch (slug[0]) {
      case "buy":
        return <Buy />;
      case "sell":
        return <Sell />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header />
      {renderPage()}
    </>
  );
}
