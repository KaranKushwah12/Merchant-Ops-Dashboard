import { useMemo, useState } from "react";
import "./Merchants.css";

export default function Merchants({ merchants, setMerchants }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortKey, setSortKey] = useState("monthlyVolume");

  const filteredMerchants = useMemo(() => {
    return merchants
      .filter((m) => m.name.toLowerCase().includes(search))
      .filter((m) =>
        statusFilter === "all" ? true : m.status === statusFilter
      )
      .filter((m) => (riskFilter === "all" ? true : m.riskLevel === riskFilter))
      .sort((a, b) => b[sortKey] - a[sortKey]);
  }, [merchants, search, statusFilter, riskFilter, sortKey]);

  const updateMerchant = (id, updates) => {
    setMerchants((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return (
    <div className="page">
      <h2>Merchants</h2>

      <div className="controls">
        <input
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="blocked">Blocked</option>
        </select>

        <select onChange={(e) => setRiskFilter(e.target.value)}>
          <option value="all">All Risk</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select onChange={(e) => setSortKey(e.target.value)}>
          <option value="monthlyVolume">Sort by Volume</option>
          <option value="chargebackRatio">Sort by Chargeback</option>
        </select>
      </div>
      <div className="table-wrapper">
        <table className="merchant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Status</th>
              <th>Volume</th>
              <th>Chargeback %</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {filteredMerchants.length === 0 && (
              <tr>
                <td colSpan="6">No merchants found</td>
              </tr>
            )}
            {filteredMerchants.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.country}</td>
                <td>
                  <select
                    value={m.status}
                    onChange={(e) => {
                      if (
                        m.riskLevel === "high" &&
                        e.target.value === "active"
                      ) {
                        if (!confirm("High-risk merchant. Activate anyway?"))
                          return;
                      }
                      updateMerchant(m.id, { status: e.target.value });
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
                <td>${m.monthlyVolume}</td>
                <td className={m.chargebackRatio > 2 ? "warn" : ""}>
                  {m.chargebackRatio}%
                </td>
                <td>
                  <select
                    value={m.riskLevel}
                    onChange={(e) =>
                      updateMerchant(m.id, { riskLevel: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
