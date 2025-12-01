import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>

        {/* LEFT PANEL - LOGIN */}
        <div style={styles.loginPanel}>
          <div style={styles.header}>
            <div style={styles.logo}>
              <span style={styles.logoDot}></span>
              <span style={styles.logoV}>V</span>
            </div>
            <h2 style={styles.title}>LOG IN</h2>
          </div>

          <div style={styles.formContainer}>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={styles.inputUnderlineActive}></div>
            </div>

            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={styles.inputUnderline}></div>
            </div>

            <button style={styles.button} onClick={handleLogin}>
              LOGIN
            </button>
          </div>

          <p style={styles.forgotPassword}>Forgot Password?</p>

          <p style={styles.switchText}>
            Don't have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>

        {/* RIGHT PANEL - STATIC */}
        <div style={styles.infoPanel}>
          <h2 style={styles.sideTitle}>WELCOME BACK</h2>

          <p style={styles.sideText}>
            Access your Xeno Dashboard, sync store data, and view insights.
          </p>

          <div style={styles.appIcons}>
            <span style={styles.appIcon}></span>
            <span style={styles.appIcon}>⬇</span>
            <span style={styles.appIcon}>◻</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SAME COLORS FROM SIGNUP PAGE */
const tealColor = "#1DCCA6";
const darkBg = "#202528";
const darkPanelBg = "#252B2F";

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bccfd2ff",
    backgroundImage:
      "radial-gradient(circle at 100% 20%, rgba(12,181,159,0.03), transparent 60%)",
    overflow: "hidden",
    
  },

  authCard: {
    display: "flex",
    width: "750px",
    minHeight: "450px",
    borderRadius: "12px",
    background: darkBg,
    boxShadow: `
      40px 40px 40px rgba(0, 0, 0, 0.76),
      -20px -20px -20px ${tealColor}25`,
    border: `3px solid ${tealColor}70`,
    overflow: "hidden",
  },

  loginPanel: {
    flex: 1,
    padding: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    background: darkBg,
    borderRight: "1px solid #2c3135ff",
    
  },

  infoPanel: {
    flex: 1,
    padding: "40px",
    background: darkPanelBg,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "90px",
  },

  logo: {
    position: "relative",
    fontSize: "28px",
    fontWeight: "700",
    color: tealColor,
  },
  logoV: { fontStyle: "italic" },
  logoDot: {
    position: "absolute",
    top: "0",
    right: "-5px",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: tealColor,
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "2px",
    color: "#fff",
  },

  sideTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "2px",
  },

  sideText: {
    color: "#aaa",
    fontSize: "14px",
    lineHeight: "1.6",
    marginTop: "5px",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    position: "relative",
  },

  input: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid #444",
    background: "transparent",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  },

  inputUnderline: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "0%",
    height: "2px",
    backgroundColor: tealColor,
  },

  inputUnderlineActive: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    backgroundColor: tealColor,
  },

  button: {
    width: "100%",
    padding: "12px",
    background: tealColor,
    color: "#fff",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
    border: "none",
    textTransform: "uppercase",
    boxShadow: `0 4px 10px ${tealColor}40`,
  },

  forgotPassword: {
    color: "#aaa",
    fontSize: "12px",
    textAlign: "right",
    cursor: "pointer",
  },

  switchText: {
    color: "#bbb",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "-10px",
  },

  link: {
    color: tealColor,
    cursor: "pointer",
    fontWeight: "600",
  },

  appIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  appIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    border: "1px solid #555",
  },
};
