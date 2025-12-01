import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Orders Trend</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255, 255, 255, 0.23)" />
          <XAxis dataKey="date" stroke="#ffffffff" />
          <YAxis stroke="#ddddddff" />
          <Tooltip
            contentStyle={styles.tooltip}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#0cd5b3ff"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: {
    background: "#081415ff",
    padding: "25px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(8px)",
    boxShadow: "10px 14px 20px rgba(0, 0, 0, 0.67)",
    marginTop: "20px",
  },
  heading: {
    color: "#fff",
    marginBottom: "15px",
    fontSize: "18px",
    fontFamily: "'Poppins', sans-serif",
  },
  tooltip: {
    background: "rgba(20,20,22,0.9)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "10px",
  },
};
