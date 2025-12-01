import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [apiToken, setApiToken] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password || !shopUrl || !apiToken) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        shopUrl,
        apiToken,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div style={{ ...styles.container }}>
      <div style={styles.authCard}>

        {/* LEFT SIGNUP PANEL */}
        <div style={styles.signupPanel}>
          <div style={styles.header}>
            <div style={styles.logo}>
              <span style={styles.logoDot}></span>
              <span style={styles.logoV}>V</span>
            </div>
            <h2 style={styles.title}>SIGN UP</h2>
          </div>

          <div style={styles.formContainer}>

            {/* Full Name */}
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div style={styles.inputUnderline} />
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={styles.inputUnderline} />
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={styles.inputUnderlineActive} />
            </div>

            {/* Shopify Store URL */}
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Shopify Store URL (example.myshopify.com)"
                value={shopUrl}
                onChange={(e) => setShopUrl(e.target.value)}
              />
              <div style={styles.inputUnderline} />
            </div>

            {/* Shopify API Token */}
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Shopify Admin API Token"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
              />
              <div style={styles.inputUnderline} />
            </div>

            <button style={styles.button} onClick={handleSignup}>
              CREATE ACCOUNT
            </button>
          </div>

          <div style={styles.socialSignup}>
            <p style={styles.socialText}>Or sign up with:</p>
            <div style={styles.socialIcons}>
              <div style={styles.socialIcon}>G</div>
              <div style={styles.socialIcon}>T</div>
              <div style={styles.socialIcon}>O</div>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN PANEL */}
        <div style={styles.loginPanel}>
          <h2 style={styles.title}>LOG IN</h2>

          <div style={styles.formContainer}>
            <div style={styles.inputGroup}>
              <input style={styles.input} type="email" placeholder="Email Address" />
              <div style={styles.inputUnderlineActive} />
            </div>

            <button
              style={styles.loginButtonPlaceholder}
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>

          <p style={styles.forgotPassword}>Forgot Password?</p>

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

const tealColor = "#1DCCA6";
const darkBg = "#202528";
const darkPanelBg = "#252B2F";

const styles = {
  /* MAIN CONTAINER */
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    /** FIXED: replaced invalid 8-digit hex **/
    backgroundColor: "#c6e3e9ff",

    backgroundImage:
      "radial-gradient(circle at 100% 20%, rgba(12, 181, 159, 0.03), transparent 60%)",

    overflow: "hidden",
  },

  /* MAIN CARD */
  authCard: {
    display: "flex",
    width: "750px",
    minHeight: "450px",
    borderRadius: "12px",
    background: darkBg,

    boxShadow: `
      10px 10px 30px rgba(0, 0, 0, 0.76),
      -20px -20px -20px ${tealColor}125`,

    border: `3px solid ${tealColor}70`,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },

  signupPanel: {
    flex: 1,
    padding: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    borderRight: "1px solid #1d1f21ff",
  },

  loginPanel: {
    flex: 1,
    padding: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    background: darkPanelBg,
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "100px",
    marginBottom: "5px",
  },

  logo: {
    position: "relative",
    fontSize: "28px",
    fontWeight: "700",
    color: tealColor,
    display: "inline-block",
    lineHeight: "1",
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

  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flexGrow: 1,
  },

  inputGroup: {
    position: "relative",
    marginBottom: "10px",
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
  },

  loginButtonPlaceholder: {
    width: "100%",
    padding: "12px",
    background: tealColor,
    color: "#fff",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    border: `1px solid ${tealColor}20`,
  },

  socialSignup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "auto",
  },

  socialText: {
    color: "#bbb",
    fontSize: "12px",
    marginBottom: "10px",
  },

  socialIcons: {
    display: "flex",
    gap: "15px",
  },

  socialIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    cursor: "pointer",
    border: "1px solid #555",
  },

  forgotPassword: {
    color: "#aaa",
    fontSize: "12px",
    textAlign: "center",
    marginTop: "15px",
  },
};


