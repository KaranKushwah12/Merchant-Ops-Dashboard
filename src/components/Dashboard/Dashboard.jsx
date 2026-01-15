import "./Dashboard.css";

export default function Dashboard({ merchants }) {
  const totalVolume = merchants.reduce((sum, m) => sum + m.monthlyVolume, 0);
  const activeMerchants = merchants.filter((m) => m.status === "active").length;
  const avgChargeback = (
    merchants.reduce((sum, m) => sum + m.chargebackRatio, 0) / merchants.length
  ).toFixed(2);

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <div className="stats">
        <StatCard label="Total Volume" value={`$${totalVolume}`} />
        <StatCard label="Active Merchants" value={activeMerchants} />
        <StatCard label="Avg Chargeback %" value={`${avgChargeback}%`} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}
