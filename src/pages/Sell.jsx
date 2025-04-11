"use client";
import { useState } from "react";
import "./Sell.css";

function Sell() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [listedTickets, setListedTickets] = useState([
    {
      id: 1,
      game: "vs. Ohio State",
      section: "23",
      seat: "A15",
      price: 299.99,
      email: "student@umich.edu",
      status: "Active",
    },
    {
      id: 2,
      game: "vs. Michigan State",
      section: "18",
      seat: "C42",
      price: 175.0,
      email: "student@umich.edu",
      status: "Active",
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    game: "",
    section: "",
    seat: "",
    price: "",
    email: "",
  });

  // Simulate login for demo purposes
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({
      ...newTicket,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicketWithId = {
      ...newTicket,
      id: listedTickets.length + 1,
      status: "Active",
    };

    setListedTickets([...listedTickets, newTicketWithId]);
    setShowSellForm(false);
    setNewTicket({
      game: "",
      section: "",
      seat: "",
      price: "",
      email: "",
    });
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      newTicket.game &&
      newTicket.section &&
      newTicket.seat &&
      newTicket.price &&
      newTicket.email
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="sell-container">
        <div className="auth-container">
          <h2 className="auth-title">Sign In Required</h2>
          <p className="auth-message">
            You need to sign in to list and manage your tickets.
          </p>
          <div className="auth-buttons">
            <button className="auth-button" onClick={handleLogin}>
              Sign In with University ID
            </button>
            <button className="connect-wallet-button">Connect Wallet</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-container">
      <div className="sell-header">
        <h1 className="sell-title">Sell Your Tickets</h1>
        <p className="sell-subtitle">
          List your Michigan tickets and set your own price
        </p>
      </div>

      {!showSellForm ? (
        <div className="current-listings">
          <div className="listings-header">
            <h2 className="listings-title">Your Current Listings</h2>
            <button
              className="add-ticket-button"
              onClick={() => setShowSellForm(true)}
            >
              + List New Ticket
            </button>
          </div>

          {listedTickets.length > 0 ? (
            <div className="tickets-table-container">
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th>Section</th>
                    <th>Seat</th>
                    <th>Price</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listedTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.game}</td>
                      <td>{ticket.section}</td>
                      <td>{ticket.seat}</td>
                      <td>${ticket.price.toFixed(2)}</td>
                      <td>{ticket.email}</td>
                      <td>
                        <span className="status-badge">{ticket.status}</span>
                      </td>
                      <td>
                        <button className="action-button edit">Edit</button>
                        <button className="action-button delete">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-tickets">
              <p>You don't have any tickets listed yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="sell-form-container">
          <div className="form-header">
            <h2 className="form-title">List a New Ticket</h2>
            <button
              className="back-button"
              onClick={() => setShowSellForm(false)}
            >
              Back to Listings
            </button>
          </div>

          <form className="sell-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="game">Game</label>
              <select
                id="game"
                name="game"
                value={newTicket.game}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Game</option>
                <option value="vs. Ohio State">vs. Ohio State</option>
                <option value="vs. Michigan State">vs. Michigan State</option>
                <option value="vs. Penn State">vs. Penn State</option>
                <option value="vs. Washington">vs. Washington</option>
                <option value="vs. Minnesota">vs. Minnesota</option>
                <option value="vs. UNLV">vs. UNLV</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="section">Section</label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  placeholder="e.g. 23"
                  value={newTicket.section}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="seat">Seat Number</label>
                <input
                  type="text"
                  id="seat"
                  name="seat"
                  placeholder="e.g. A15"
                  value={newTicket.seat}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (USD)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  value={newTicket.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="student@umich.edu"
                  value={newTicket.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <p className="form-info">
                By listing your ticket, you agree to our terms and conditions.
                Your ticket will be minted as an NFT on the Solana blockchain.
              </p>

              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowSellForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={!isFormValid()}
                >
                  List Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="info-section">
        <h3 className="info-title">How Ticket Selling Works</h3>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-number">1</div>
            <h4>List Your Ticket</h4>
            <p>Enter your ticket details and set your price</p>
          </div>
          <div className="info-card">
            <div className="info-card-number">2</div>
            <h4>Get Paid</h4>
            <p>When sold, receive payment directly to your linked wallet</p>
          </div>
          <div className="info-card">
            <div className="info-card-number">3</div>
            <h4>Secure Transfer</h4>
            <p>Smart contracts ensure safe ticket transfer to buyer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sell;
