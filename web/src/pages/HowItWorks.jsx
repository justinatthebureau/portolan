import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "01",
    title: "Install Docker Desktop",
    body: "Docker is free software that runs applications in isolated containers — think of it like a self-contained box that has everything an app needs to run, without touching the rest of your computer. Download it once and every artifact on this site will work.",
    link: { label: "Download Docker Desktop →", href: "https://www.docker.com/products/docker-desktop/" },
    note: "Available for Mac, Windows, and Linux. Free for personal use.",
  },
  {
    n: "02",
    title: "Find an artifact",
    body: "Browse the marketplace and find a tool that solves your problem. Each listing tells you what it does, what it costs to run, what data it sends anywhere, and how hard it is to set up. Read the model card before you commit.",
    link: { label: "Browse artifacts →", href: "#/" },
    note: null,
  },
  {
    n: "03",
    title: "Get your API keys",
    body: "Most AI tools need an API key — a password that lets the tool talk to a service like Anthropic or Gmail on your behalf. Each artifact lists exactly which keys you need and links you to where to get them. Most have a free tier to start.",
    link: null,
    note: "API keys stay on your machine. They go in a text file called .env that never gets shared.",
  },
  {
    n: "04",
    title: "Fill in your .env file",
    body: "Every artifact comes with a file called .env.example that lists every setting the tool needs. You copy it, rename it to .env, and fill in your keys. Each line has a plain-English description of what it does. No coding required.",
    link: null,
    note: "The .env file is just a text file. Open it in Notepad, TextEdit, or any text editor.",
  },
  {
    n: "05",
    title: "Run one command",
    body: "Open a terminal, navigate to the folder you downloaded, and run docker compose up -d. Docker downloads everything the tool needs and starts it. That's it. The tool runs in the background until you tell it to stop.",
    link: null,
    note: "Never used a terminal? See the guide below.",
  },
];

const TERMINAL_STEPS = [
  { os: "Mac", how: "Press Cmd + Space, type Terminal, press Enter." },
  { os: "Windows", how: "Press Win + R, type cmd, press Enter. Or search for Windows Terminal." },
  { os: "Linux", how: "Ctrl + Alt + T on most distributions." },
];

const FAQS = [
  {
    q: "Does this run on my computer or somewhere in the cloud?",
    a: "On your computer — or any server you own. Nothing runs on Portolan's infrastructure. You download the tool, you run it, you control it.",
  },
  {
    q: "What does it cost?",
    a: "Docker is free. The tools themselves are free. Most use external APIs (like Anthropic for AI features) that charge based on usage — usually a few dollars a month for typical use. Every artifact lists its estimated cost before you start.",
  },
  {
    q: "Is my data safe?",
    a: "Your data stays on your machine except where an artifact explicitly sends it to an external API (like sending text to Anthropic for analysis). Every artifact's model card describes exactly what leaves your machine and where it goes.",
  },
  {
    q: "What if I want to stop running something?",
    a: "Run docker compose down in the artifact's folder. Everything stops. Run docker compose up -d to start it again.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You need to be comfortable opening a terminal and editing a text file. If you can follow a recipe, you can deploy an artifact.",
  },
  {
    q: "What's a terminal?",
    a: "A text-based window where you type commands. It looks intimidating but you only need two: one to navigate to a folder (cd foldername) and one to start the tool (docker compose up -d). That's the whole vocabulary.",
  },
];

export default function HowItWorks() {
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>How it works</p>
        <h1 style={styles.title}>From zero to running<br />in about ten minutes.</h1>
        <p style={styles.sub}>
          Every artifact on Portolan is a self-contained tool that runs on your
          own computer or server. You don't need to code. You need Docker,
          a text editor, and an API key.
        </p>
      </div>

      {/* Steps */}
      <div style={styles.steps}>
        {STEPS.map(({ n, title, body, link, note }) => (
          <div key={n} style={styles.step}>
            <div style={styles.stepNumber}>{n}</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>{title}</h3>
              <p style={styles.stepBody}>{body}</p>
              {note && <p style={styles.stepNote}>{note}</p>}
              {link && (
                link.href.startsWith("#") ? (
                  <a href={link.href} style={styles.stepLink}>{link.label}</a>
                ) : (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={styles.stepLink}>
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal guide */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Opening a terminal</h2>
        <div style={styles.terminalTable}>
          {TERMINAL_STEPS.map(({ os, how }) => (
            <div key={os} style={styles.terminalRow}>
              <span style={styles.terminalOs}>{os}</span>
              <span style={styles.terminalHow}>{how}</span>
            </div>
          ))}
        </div>
        <p style={styles.terminalNote}>
          Once it's open, you navigate to a folder with{" "}
          <code style={styles.code}>cd path/to/folder</code> and run commands
          by typing them and pressing Enter.
        </p>
      </div>

      {/* What a .env looks like */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>What a .env file looks like</h2>
        <p style={styles.para}>
          It's a plain text file. Each line is a setting name, an equals sign,
          and your value. Nothing more complicated than that.
        </p>
        <pre style={styles.pre}>{`# Your Anthropic API key — get it from console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Email address to send alerts to
ALERT_EMAIL=you@youremail.com

# How often to check for new data (in hours)
CHECK_INTERVAL_HOURS=6`}</pre>
        <p style={styles.terminalNote}>
          Lines starting with <code style={styles.code}>#</code> are comments — they explain what the line below does. You don't need to change them.
        </p>
      </div>

      {/* FAQ */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Common questions</h2>
        <div style={styles.faqs}>
          {FAQS.map(({ q, a }) => (
            <div key={q} style={styles.faq}>
              <h3 style={styles.faqQ}>{q}</h3>
              <p style={styles.faqA}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <p style={styles.ctaText}>Ready to try it?</p>
        <Link to="/" style={styles.ctaBtn}>Browse artifacts →</Link>
      </div>
    </div>
  );
}

const styles = {
  root: {
    paddingTop: "60px",
    paddingBottom: "80px",
    maxWidth: "720px",
    animation: "fadeUp 0.3s ease",
  },
  header: {
    marginBottom: "56px",
  },
  eyebrow: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--accent)",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "var(--display)",
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 900,
    color: "var(--text)",
    lineHeight: 1.1,
    marginBottom: "20px",
  },
  sub: {
    fontSize: "16px",
    color: "var(--text-2)",
    lineHeight: 1.7,
    maxWidth: "560px",
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "56px",
  },
  step: {
    display: "flex",
    gap: "24px",
    padding: "28px 0",
    borderBottom: "1px solid var(--border)",
  },
  stepNumber: {
    fontFamily: "var(--mono)",
    fontSize: "13px",
    color: "var(--accent)",
    flexShrink: 0,
    width: "32px",
    paddingTop: "2px",
  },
  stepContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  stepTitle: {
    fontWeight: 500,
    fontSize: "17px",
    color: "var(--text)",
  },
  stepBody: {
    fontSize: "14px",
    color: "var(--text-2)",
    lineHeight: 1.75,
  },
  stepNote: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
    background: "var(--bg-2)",
    padding: "8px 12px",
    borderRadius: "var(--radius)",
    borderLeft: "2px solid var(--border-2)",
  },
  stepLink: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent-2)",
    textDecoration: "none",
    alignSelf: "flex-start",
  },
  section: {
    marginBottom: "48px",
  },
  sectionHeading: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-3)",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "1px solid var(--border)",
  },
  para: {
    fontSize: "14px",
    color: "var(--text-2)",
    lineHeight: 1.7,
    marginBottom: "16px",
  },
  terminalTable: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  terminalRow: {
    display: "grid",
    gridTemplateColumns: "80px 1fr",
    gap: "16px",
    padding: "12px 0",
    borderBottom: "1px solid var(--border)",
    alignItems: "start",
  },
  terminalOs: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
  },
  terminalHow: {
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.5,
  },
  terminalNote: {
    fontSize: "13px",
    color: "var(--text-3)",
    lineHeight: 1.6,
    marginTop: "12px",
  },
  pre: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
    lineHeight: 1.9,
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    overflowX: "auto",
    whiteSpace: "pre",
    margin: 0,
  },
  code: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
    background: "var(--bg-3)",
    padding: "1px 6px",
    borderRadius: "2px",
  },
  faqs: {
    display: "flex",
    flexDirection: "column",
  },
  faq: {
    padding: "20px 0",
    borderBottom: "1px solid var(--border)",
  },
  faqQ: {
    fontSize: "15px",
    fontWeight: 500,
    color: "var(--text)",
    marginBottom: "8px",
  },
  faqA: {
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.7,
  },
  cta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "40px",
    borderTop: "1px solid var(--border)",
    flexWrap: "wrap",
    gap: "16px",
  },
  ctaText: {
    fontFamily: "var(--display)",
    fontSize: "24px",
    color: "var(--text)",
  },
  ctaBtn: {
    display: "inline-block",
    padding: "10px 24px",
    background: "var(--accent)",
    color: "#0e0e0e",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: "var(--radius)",
    textDecoration: "none",
  },
};
