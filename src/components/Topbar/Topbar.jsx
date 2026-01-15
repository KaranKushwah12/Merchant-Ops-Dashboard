import { useState } from "react";
import "./Topbar.css";

export default function Topbar({ page, setPage }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="nav-left">Merchant Ops Dashboard</div>

      {/* Hamburger button (mobile) */}
      <button
        className="menu-btn"
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Navigation links */}
      <nav className={`nav-links  ${open ? "open" : ""}`}>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => {
            setPage("dashboard");
            setOpen(false);
          }}
        >
          Dashboard
        </button>

        <button
          className={page === "merchants" ? "active" : ""}
          onClick={() => {
            setPage("merchants");
            setOpen(false);
          }}
        >
          Merchants
        </button>
      </nav>
    </header>
  );
}
