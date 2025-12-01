import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("xeno_token");
    navigate("/signup");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h3 style={styles.title}>Xeno Ingestion App</h3>
        <Link style={styles.link} to="/dashboard">Dashboard</Link>
        <Link style={styles.link} to="/products">Products</Link>
        <Link style={styles.link} to="/orders">Orders</Link>
        <Link style={styles.link} to="/customers">Customers</Link>
      </div>

      <button style={styles.logoutBtn} onClick={logout}>Logout</button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    background: "#102628ff",
    padding: "12px 20px",
    color: "white",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontFamily: "'Poppins', sans-serif",
  },
  logoutBtn: {
    background: "#ff4d4d",
    border: "none",
    padding: "8px 14px",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
  },
  title: {
    margin: 0,
    fontSize: "17px",
    fontFamily: "'Poppins', sans-serif",
  },
};
