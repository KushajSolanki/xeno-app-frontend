import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await api.get("/shopify/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Orders fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <Layout>
      <h2 style={styles.heading}>Orders</h2>

      {loading && <p style={styles.loading}>Loading orders...</p>}

      <div style={styles.list}>
        {orders.map((order) => (
          <div key={order.id} style={styles.card}>
            
            {/* Order Info */}
            <div style={{ flex: 1 }}>
              <p style={styles.orderId}>{order.name}</p>
              <p style={styles.customer}>
                {order.customer?.first_name || "Unknown"} {order.customer?.last_name || ""}
              </p>
            </div>

            {/* Price */}
            <div>
              <p style={styles.price}>₹{order.total_price}</p>
            </div>

            {/* Status */}
            <div>
              <span
                style={{
                  ...styles.status,
                  background: getStatusColor(order.financial_status),
                }}
              >
                {order.financial_status}
              </span>
            </div>

          </div>
        ))}
      </div>
    </Layout>
  );
}

function getStatusColor(status = "") {
  switch (status.toLowerCase()) {
    case "paid":
      return "rgba(0, 0, 0, 1)";
    case "pending":
      return "rgba(7, 7, 7, 1)";
    case "refunded":
    case "voided":
      return "rgba(0, 0, 0, 1)";
    default:
      return "rgba(0, 0, 0, 1)";
  }
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
    gap: "25px",
    marginTop: "20px",
  },
  card: {
    background: "rgba(236, 236, 236, 1)",
    padding: "25px",
    borderRadius: "35px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.24)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderId: {
    color: "#000000ff",
    fontSize: "18px",
    marginBottom: "4px",
    fontFamily: "'Poppins', sans-serif",
    marginLeft: "30px",
  },
  customer: {
    color: "#000000ff",
    fontSize: "17px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "800",
    marginLeft: "30px",
  },
  price: {
    color: "#1d1d1dff",
    fontSize: "18px",
    fontWeight: "600",
    marginRight: "40px",
  },
  status: {
    padding: "6px 12px",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "14px",
    textTransform: "capitalize",
    border: "1px solid rgba(255,255,255,0.12)",
  },
};
