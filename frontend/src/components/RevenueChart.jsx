import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Revenue Trend</h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={styles.tooltip} />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3D7CFF"
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
    background: "rgba(255,255,255,0.04)",
    padding: "20px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(8px)",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.35)",
    marginTop: "20px",
  },
  heading: {
    color: "#fff",
    marginBottom: "15px",
  },
  tooltip: {
    background: "rgba(20,20,22,0.9)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  },
};
