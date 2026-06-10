import { Link, useLocation } from "react-router-dom";

const NAV = [
  { to: "/", label: "Browse" },
  { to: "/submit", label: "Publish" },
  { to: "/about", label: "About" },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoMark}>▲</span>
            <span style={styles.logoText}>AIStack</span>
          </Link>
          <nav style={styles.nav}>
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  ...styles.navLink,
                  ...(pathname === to ? styles.navLinkActive : {}),
                }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/YOUR_ORG/aistack"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.navLink}
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-3)" }}>
            AIStack — MIT License — Community maintained
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="https://github.com/YOUR_ORG/aistack" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>GitHub</a>
            <Link to="/submit" style={styles.footerLink}>Publish an artifact</Link>
            <Link to="/about" style={styles.footerLink}>About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  header: {
    borderBottom: "1px solid var(--border)",
    background: "var(--bg)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "0 24px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  logoMark: {
    color: "var(--accent)",
    fontSize: "16px",
  },
  logoText: {
    fontFamily: "var(--mono)",
    fontWeight: 500,
    fontSize: "15px",
    letterSpacing: "0.08em",
    color: "var(--text)",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  navLink: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    letterSpacing: "0.06em",
    color: "var(--text-2)",
    textTransform: "uppercase",
    transition: "color 0.15s",
  },
  navLinkActive: {
    color: "var(--accent)",
  },
  main: {
    flex: 1,
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    width: "100%",
    padding: "0 24px",
  },
  footer: {
    borderTop: "1px solid var(--border)",
    marginTop: "80px",
    padding: "24px",
  },
  footerInner: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  footerLink: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-3)",
    letterSpacing: "0.04em",
  },
};
