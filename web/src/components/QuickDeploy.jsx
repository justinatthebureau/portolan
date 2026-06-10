import { useState } from "react";
import { Link } from "react-router-dom";

export default function QuickDeploy({ repo, composFile = "docker-compose.yml", env = [] }) {
  const [open, setOpen] = useState(false);
  const [copiedStep, setCopiedStep] = useState(null);

  const repoName = repo?.split("/").pop() || "the-repo";
  const sensitiveEnv = env.filter(e => e.required && e.sensitive);
  const requiredEnv = env.filter(e => e.required);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStep(key);
      setTimeout(() => setCopiedStep(null), 2000);
    });
  };

  const steps = [
    {
      key: "docker",
      n: "1",
      title: "Install Docker Desktop",
      body: "Free software that runs the tool on your machine. Download it once, it works for every artifact.",
      cmd: null,
      link: { label: "Download Docker Desktop →", href: "https://www.docker.com/products/docker-desktop/" },
    },
    {
      key: "clone",
      n: "2",
      title: "Download this artifact",
      body: "Open a terminal and run:",
      cmd: `git clone ${repo}\ncd ${repoName}`,
    },
    {
      key: "env",
      n: "3",
      title: "Set up your keys",
      body: requiredEnv.length > 0
        ? `Copy the example settings file and fill in your values. You'll need: ${requiredEnv.map(e => e.key).join(", ")}.`
        : "Copy the example settings file.",
      cmd: "cp .env.example .env\n# Open .env in a text editor and fill in your values",
      link: sensitiveEnv.length > 0
        ? { label: "See where to get each key ↓", href: "#env-vars" }
        : null,
    },
    {
      key: "run",
      n: "4",
      title: "Run it",
      body: "One command starts everything:",
      cmd: `docker compose -f ${composFile} up -d`,
    },
    {
      key: "stop",
      n: "5",
      title: "To stop it",
      body: "Run this any time:",
      cmd: "docker compose down",
    },
  ];

  return (
    <div style={styles.root}>
      {/* Collapsed state — teaser */}
      <button style={styles.toggle} onClick={() => setOpen(!open)}>
        <div style={styles.toggleLeft}>
          <span style={styles.toggleIcon}>{open ? "▼" : "▶"}</span>
          <div>
            <div style={styles.toggleTitle}>New to this? How to deploy</div>
            <div style={styles.toggleSub}>
              Step-by-step guide — no coding required
            </div>
          </div>
        </div>
        <Link
          to="/how-it-works"
          style={styles.fullGuideLink}
          onClick={e => e.stopPropagation()}
        >
          Full guide →
        </Link>
      </button>

      {/* Expanded steps */}
      {open && (
        <div style={styles.steps}>
          {steps.map(({ key, n, title, body, cmd, link }) => (
            <div key={key} style={styles.step}>
              <div style={styles.stepNumber}>{n}</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>{title}</div>
                <p style={styles.stepBody}>{body}</p>
                {cmd && (
                  <div style={styles.cmdBlock}>
                    <pre style={styles.pre}>{cmd}</pre>
                    <button
                      style={styles.copyBtn}
                      onClick={() => copy(cmd, key)}
                    >
                      {copiedStep === key ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
                {link && (
                  link.href.startsWith("#") ? (
                    <a href={link.href} style={styles.stepLink}>{link.label}</a>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.stepLink}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          ))}

          <div style={styles.footer}>
            <span style={styles.footerText}>Need more help?</span>
            <Link to="/how-it-works" style={styles.footerLink}>
              Read the full guide →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    marginBottom: "32px",
  },
  toggle: {
    width: "100%",
    background: "var(--bg-2)",
    border: "none",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
    gap: "16px",
  },
  toggleLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  toggleIcon: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    color: "var(--accent)",
    flexShrink: 0,
  },
  toggleTitle: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
    letterSpacing: "0.04em",
  },
  toggleSub: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    color: "var(--text-3)",
    marginTop: "2px",
  },
  fullGuideLink: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--accent-2)",
    textDecoration: "none",
    flexShrink: 0,
  },
  steps: {
    borderTop: "1px solid var(--border)",
    padding: "8px 20px 0",
    background: "var(--bg)",
  },
  step: {
    display: "flex",
    gap: "16px",
    padding: "16px 0",
    borderBottom: "1px solid var(--border)",
  },
  stepNumber: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
    flexShrink: 0,
    width: "20px",
    paddingTop: "1px",
  },
  stepContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  stepTitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--text)",
  },
  stepBody: {
    fontSize: "12px",
    color: "var(--text-2)",
    lineHeight: 1.6,
  },
  cmdBlock: {
    position: "relative",
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
  },
  pre: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-2)",
    lineHeight: 1.8,
    padding: "12px 48px 12px 14px",
    margin: 0,
    overflowX: "auto",
    whiteSpace: "pre",
  },
  copyBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "var(--bg-3)",
    border: "1px solid var(--border-2)",
    borderRadius: "var(--radius)",
    padding: "3px 10px",
    fontFamily: "var(--mono)",
    fontSize: "10px",
    color: "var(--text-2)",
    cursor: "pointer",
  },
  stepLink: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--accent-2)",
    textDecoration: "none",
    alignSelf: "flex-start",
  },
  footer: {
    padding: "16px 0",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  footerText: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
  footerLink: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--accent-2)",
    textDecoration: "none",
  },
};
