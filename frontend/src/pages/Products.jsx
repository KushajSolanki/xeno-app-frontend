import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/shopify/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Products fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <Layout>
      <h2 style={styles.heading}>Products</h2>

      {loading && <p style={styles.loading}>Loading products...</p>}

      <div style={styles.grid}>
        {products.map((p) => {
          const img = p.image?.src || p.images?.[0]?.src || "https://via.placeholder.com/160";
          const price = p.variants?.[0]?.price || "0";

          return (
            <div key={p.id} style={styles.card}>
              <img src={img} alt={p.title} style={styles.image} />

              <div style={styles.info}>
                <p style={styles.title}>{p.title}</p>
                <p style={styles.price}>₹{price}</p>
              </div>
            </div>
          );
        })}
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
    color: "#bbb",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    padding: "16px",
    borderRadius: "18px",
    boxShadow: "10px 14px 20px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "160px",
    borderRadius: "14px",
    objectFit: "cover",
    marginBottom: "12px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#040404ff",
    fontSize: "15px",
    fontWeight: "600",
    maxWidth: "150px",
    fontFamily: "'Poppins', sans-serif",
  },
  price: {
    color: "#000000ff",
    fontWeight: "600",
    fontSize: "16px",
  },
};
