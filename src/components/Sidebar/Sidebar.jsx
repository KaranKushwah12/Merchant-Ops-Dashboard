import "./Sidebar.css";

export default function Sidebar({ page, setPage }) {
  return (
    <div className="sidebar">
      <h3>Merchant Ops</h3>
      <button
        className={page === "dashboard" ? "active" : ""}
        onClick={() => setPage("dashboard")}
      >
        Dashboard
      </button>
      <button
        className={page === "merchants" ? "active" : ""}
        onClick={() => setPage("merchants")}
      >
        Merchants
      </button>
    </div>
  );
}
