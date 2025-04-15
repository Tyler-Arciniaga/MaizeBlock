"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Buy.css";

function Buy() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [walletConnected, setWalletConnected] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Mock data for available games
  const games = [
    "vs. Ohio State",
    "vs. Michigan State",
    "vs. Penn State",
    "vs. Washington",
    "vs. Minnesota",
    "vs. UNLV",
  ];

  // Mock data for tickets
  const allTickets = [
    {
      id: 1,
      game: "vs. Ohio State",
      section: "23",
      row: "A",
      seat: "15",
      price: 299.99,
      seller: "GoBlueFan",
      rating: 4.8,
    },
    {
      id: 2,
      game: "vs. Ohio State",
      section: "23",
      row: "A",
      seat: "16",
      price: 315.0,
      seller: "WolverineAlum",
      rating: 4.9,
    },
    {
      id: 3,
      game: "vs. Michigan State",
      section: "18",
      row: "C",
      seat: "42",
      price: 175.0,
      seller: "UMichStudent22",
      rating: 4.7,
    },
    {
      id: 4,
      game: "vs. Penn State",
      section: "15",
      row: "F",
      seat: "8",
      price: 220.0,
      seller: "MaizeAndBlue",
      rating: 5.0,
    },
    {
      id: 5,
      game: "vs. Washington",
      section: "30",
      row: "D",
      seat: "25",
      price: 150.0,
      seller: "AnnArborFan",
      rating: 4.6,
    },
    {
      id: 6,
      game: "vs. Minnesota",
      section: "27",
      row: "B",
      seat: "11",
      price: 125.0,
      seller: "BigHouseFan",
      rating: 4.5,
    },
    {
      id: 7,
      game: "vs. UNLV",
      section: "14",
      row: "E",
      seat: "22",
      price: 90.0,
      seller: "MGoBlue",
      rating: 4.8,
    },
    {
      id: 8,
      game: "vs. Michigan State",
      section: "20",
      row: "D",
      seat: "10",
      price: 185.0,
      seller: "UMFan1817",
      rating: 4.9,
    },
    {
      id: 9,
      game: "vs. Penn State",
      section: "11",
      row: "C",
      seat: "3",
      price: 210.0,
      seller: "WolverineNation",
      rating: 4.7,
    },
  ];

  // Filter tickets based on selected game
  const filteredTickets =
    selectedGame === "all"
      ? allTickets
      : allTickets.filter((ticket) => ticket.game === selectedGame);

  // Sort tickets based on selection
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "section") return a.section.localeCompare(b.section);
    return 0;
  });

  const handleBuyClick = (ticket) => {
    if (!walletConnected) {
      alert("Please connect your wallet to purchase tickets");
    } else {
      setSelectedTicket(ticket);
      setShowPurchaseModal(true);
    }
  };

  const completePurchase = () => {
    // In a real application, this would trigger the Solana transaction
    alert(
      `Purchase successful! Your NFT ticket for ${selectedTicket.game} has been transferred to your wallet.`
    );
    setShowPurchaseModal(false);
  };

  const connectWallet = () => {
    // In a real application, this would connect to Phantom or Metamask
    setWalletConnected(true);
  };

  return (
    <div className="buy-container">
      <div className="buy-header">
        <h1 className="buy-title">Michigan Football Tickets</h1>
        <p className="buy-subtitle">
          Browse and purchase tickets for upcoming games
        </p>
      </div>

      <div className="filters-section">
        <div className="game-filter">
          <label htmlFor="game-select">Select Game:</label>
          <select
            id="game-select"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="all">All Games</option>
            {games.map((game, index) => (
              <option key={index} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-filter">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="section">Section</option>
          </select>
        </div>

        {!walletConnected && (
          <button className="wallet-connect-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {walletConnected && (
          <div className="wallet-status">
            <span className="wallet-indicator"></span>
            Wallet Connected
          </div>
        )}
      </div>

      <div className="tickets-grid">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <div className="ticket-header">
                <h3 className="ticket-game">{ticket.game}</h3>
                <span className="ticket-price">${ticket.price.toFixed(2)}</span>
              </div>
              <div className="ticket-details">
                <div className="ticket-location">
                  <span className="detail-label">Section:</span>
                  <span className="detail-value">{ticket.section}</span>
                </div>
                <div className="ticket-location">
                  <span className="detail-label">Row:</span>
                  <span className="detail-value">{ticket.row}</span>
                </div>
                <div className="ticket-location">
                  <span className="detail-label">Seat:</span>
                  <span className="detail-value">{ticket.seat}</span>
                </div>
              </div>
              <div className="ticket-seller">
                <div className="seller-info">
                  <span className="seller-name">{ticket.seller}</span>
                  <div className="seller-rating">
                    <span className="rating-stars">
                      {"★".repeat(Math.floor(ticket.rating))}
                    </span>
                    <span className="rating-value">
                      {ticket.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <button
                  className="buy-button"
                  onClick={() => handleBuyClick(ticket)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-tickets-message">
            <p>No tickets available for the selected game.</p>
          </div>
        )}
      </div>

      <div className="stadium-info">
        <h2 className="stadium-title">Michigan Stadium Seating</h2>
        <div className="stadium-diagram">
          <div className="stadium-field">Field</div>
          <div className="stadium-sections">
            <div className="section-row section-1-10">Sections 1-10</div>
            <div className="section-row section-11-20">Sections 11-20</div>
            <div className="section-row section-21-30">Sections 21-30</div>
            <div className="section-row section-31-40">Sections 31-40</div>
          </div>
        </div>
        <p className="stadium-note">
          The Big House has a capacity of 107,601, making it the largest stadium
          in the United States.
        </p>
      </div>

      {showPurchaseModal && selectedTicket && (
        <div className="modal-overlay">
          <div className="purchase-modal">
            <h2 className="modal-title">Confirm Purchase</h2>
            <div className="modal-content">
              <div className="purchase-details">
                <h3>Ticket Details</h3>
                <div className="purchase-detail-row">
                  <span className="detail-label">Game:</span>
                  <span className="detail-value">{selectedTicket.game}</span>
                </div>
                <div className="purchase-detail-row">
                  <span className="detail-label">Section:</span>
                  <span className="detail-value">{selectedTicket.section}</span>
                </div>
                <div className="purchase-detail-row">
                  <span className="detail-label">Row:</span>
                  <span className="detail-value">{selectedTicket.row}</span>
                </div>
                <div className="purchase-detail-row">
                  <span className="detail-label">Seat:</span>
                  <span className="detail-value">{selectedTicket.seat}</span>
                </div>
              </div>
              <div className="purchase-summary">
                <h3>Payment Summary</h3>
                <div className="summary-row">
                  <span>Ticket Price:</span>
                  <span>${selectedTicket.price.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Service Fee:</span>
                  <span>${(selectedTicket.price * 0.05).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Network Fee:</span>
                  <span>$0.01</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>
                    ${(selectedTicket.price * 1.05 + 0.01).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="purchase-notice">
              <p>
                By completing this purchase, you agree to our terms of service.
                Your ticket will be delivered to your umich.edu account with
                payment via your connected wallet.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowPurchaseModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-button" onClick={completePurchase}>
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Buy;
