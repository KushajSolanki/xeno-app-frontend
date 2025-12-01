import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import OrdersChart from "../components/OrdersChart";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [ordersTrend, setOrdersTrend] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadDashboard = async () => {
    try {
      const s = await api.get("/shopify/summary");
      const t = await api.get("/shopify/orders/trend");
      const c = await api.get("/shopify/customers/top");

      setSummary(s.data);
      setOrdersTrend(t.data);
      setTopCustomers(c.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      await api.post("/shopify/sync/all");
      await loadDashboard();
      alert("Shopify data synced successfully!");
    } catch (err) {
      console.error("Sync error:", err);
      alert("Sync failed!");
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p style={{ color: "#fff" }}>Loading dashboard...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 style={styles.pageTitle}>Dashboard</h2>

      <button style={styles.syncButton} onClick={handleSync} disabled={syncing}>
        {syncing ? "Syncing..." : "Sync Shopify Data"}
      </button>

      <div style={styles.cardsRow}>
        <div style={styles.card}>Customers<br />{summary.customers}</div>
        <div style={styles.card}>Orders<br />{summary.orders}</div>
        <div style={styles.card}>Revenue<br />₹{summary.revenue}</div>
      </div>


      <h3 style={styles.subheading}>Top 5 Customers</h3>
      <div style={styles.table}>
        {topCustomers.map((c, idx) => (
          <div key={idx} style={styles.row}>
            <div>{c.name || "Unknown"}</div>
            <div>{c.email}</div>
            <div>₹{c.spend}</div>
          </div>
        ))}
      </div>

      <OrdersChart data={ordersTrend} />

    
    </Layout>
  );
}

const teal = "#1DCCA6";
const glass = "rgba(255,255,255,0.05)";
const borderLight = "rgba(255,255,255,0.1)";

const styles = {
  pageTitle: {
    color: "#000000ff",
    fontSize: "26px",
    fontWeight: "700",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "10px",
    marginTop: "-5px",
    letterSpacing: "1px",
  },

  syncButton: {
    background: teal,
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "0.5px",
    marginTop: "10px",
    marginBottom: "22px",
    boxShadow: `7px 7px 12px rgba(0, 0, 0, 0.67)`,
    transition: "0.3s",
  },

  cardsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#ffffffff",
    padding: "20px",
    borderRadius: "20px",
    border: `1px solid ${borderLight}`,
    color: "#000000fc",
    fontSize: "22px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    flex: 2,
    backdropFilter: "blur(8px)",
    boxShadow: "10px 15px 20px rgba(0, 0, 0, 0.23)",
  },

  subheading: {
    color: "#000000ff",
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "20px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  table: {
    background: "#ffffffff",
    padding: "35px",
    borderRadius: "12px",
    border: `1px solid ${borderLight}`,
    backdropFilter: "blur(6px)",
    boxShadow: "10px 15px 25px rgba(0, 0, 0, 0.45)",
    marginBottom: "30px",
    
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    color: "#000000ff",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "17px",
    borderBottom: `1px solid ${borderLight}`,
  },
};
