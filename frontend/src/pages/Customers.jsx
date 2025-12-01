import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await api.get("/shopify/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("Customers fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <Layout>
      <h2 style={styles.heading}>Customers</h2>

      {loading && <p style={styles.loading}>Loading customers...</p>}

      <div style={styles.list}>
        {customers.map((c, index) => (
          <div key={index} style={styles.card}>
            
            {/* Avatar Circle */}
            <div style={styles.avatar}>
              {(c.first_name?.[0] || "U").toUpperCase()}
            </div>

            {/* Customer Info */}
            <div style={{ flex: 1 }}>
              <p style={styles.name}>
                {c.first_name || ""} {c.last_name || ""}
              </p>
              <p style={styles.email}>{c.email || "No email"}</p>
            </div>

            {/* Orders Count */}
            <div style={styles.ordersBox}>
              <p style={styles.ordersLabel}>Orders</p>
              <p style={styles.ordersValue}>{c.orders_count || 0}</p>
            </div>

            {/* Total Spend */}
            <div style={styles.spentBox}>
              <p style={styles.spentLabel}>Spent</p>
              <p style={styles.spentValue}>₹{c.total_spent || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const styles = {
  heading: {
    color: "#000000ff",
    marginBottom: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  loading: {
    color: "#000000ff",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginTop: "20px",
  },
  card: {
    background: "rgba(223, 223, 223, 1)",
    padding: "22px",
    borderRadius: "35px",
    border: "1px solid rgba(55, 52, 52, 0)",
    backdropFilter: "blur(8px)",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
    gap: "20px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(31, 64, 66, 0.72)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#00E5C0",
    fontWeight: "600",
    fontSize: "20px",
    marginLeft: "10px",
  },
  name: {
    color: "#000000ff",
    fontSize: "25px",
    marginBottom: "8px",
    fontWeight: "700",
    marginLeft: "30px",
    fontFamily: "'Poppins', sans-serif",
  },
  email: {
    color: "#5f5f5fff",
    fontSize: "17px",
    marginLeft: "30px",
  },
  ordersBox: {
    textAlign: "right",
    marginRight: "100px",
  },
  ordersLabel: {
    color: "#000000ff",
    fontSize: "20px",
  },
  ordersValue: {
    color: "#000000ff",
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: "'Poppins', sans-serif",
  },
  spentBox: {
    textAlign: "right",
    marginRight: "30px",
  },
  spentLabel: {
    color: "#000000ff",
    fontSize: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  spentValue: {
    color: "#000000ff",
    fontSize: "18px",
    fontWeight: "600",
  },
};
