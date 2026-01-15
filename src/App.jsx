import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Merchants from "./components/Merchants/Merchants.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";
import { merchantData } from "./data/merchants";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [merchants, setMerchants] = useState(merchantData);

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} />
      <div className="main">
        <Topbar page={page} setPage={setPage} />
        {page === "dashboard" && <Dashboard merchants={merchants} />}
        {page === "merchants" && (
          <Merchants merchants={merchants} setMerchants={setMerchants} />
        )}
      </div>
    </div>
  );
}
