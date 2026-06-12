import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>About</p>
        <h1 style={styles.title}>AI that belongs to you.</h1>
      </div>

      <div style={styles.body}>
        <p style={styles.lead}>
          portolan is a community registry of deployable AI stacks. Every artifact
          is a real GitHub repo with a working Docker Compose setup. You bring
          your own API keys, run it on your own hardware, and own everything.
        </p>

        <p style={styles.para}>
          Most AI tooling asks you to sign up, hand over your data, and pay a
          monthly fee for something you don't control. portolan is the opposite —
          a place where people who've built useful things can share them, and
          people who need useful things can find and run them without friction.
        </p>

        <p style={styles.para}>
          The non-coder experience is a first-class priority. A business owner
          in rural Vermont should be able to find a tool that solves their
          problem, understand what it does, what it costs, and what data it
          touches — and then run it. The technical complexity lives in the
          artifact, not on the person deploying it.
        </p>

        <div style={styles.divider} />

        <h2 style={styles.h2}>How it works</h2>
        <p style={styles.para}>
          The registry is a collection of JSON files in a GitHub repo. Each file
          describes an artifact — what it does, what containers it runs, what
          environment variables it needs, and what it costs. When someone submits
          a new artifact, CI validates it against the schema and a maintainer
          reviews the PR. The web marketplace is a static React app on GitHub
          Pages that fetches the registry at runtime. There is no backend, no
          database, no accounts.
        </p>

        <div style={styles.divider} />

        <h2 style={styles.h2}>Philosophy</h2>
        <div style={styles.principles}>
          {PRINCIPLES.map(({ title, body }) => (
            <div key={title} style={styles.principle}>
              <h3 style={styles.principleTitle}>{title}</h3>
              <p style={styles.principleBody}>{body}</p>
            </div>
          ))}
        </div>

        <div style={styles.divider} />

        <h2 style={styles.h2}>Get involved</h2>
        <p style={styles.para}>
          portolan is MIT licensed and community maintained. The best way to
          contribute is to publish an artifact, improve the schema, or improve
          the web experience.
        </p>
        <div style={styles.links}>
          <a
            href="https://github.com/justinatthebureau/portolan"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBtn}
          >
            GitHub ↗
          </a>
          <Link to="/submit" style={styles.linkBtn}>Publish an artifact</Link>
          <a
            href="https://github.com/justinatthebureau/portolan/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBtn}
          >
            Contributing guide ↗
          </a>
        </div>
      </div>
    </div>
  );
}

const PRINCIPLES = [
  {
    title: "Own your stack",
    body: "Every artifact runs on your hardware with your API keys. Nothing is hosted on our behalf. You can inspect every line of what runs.",
  },
  {
    title: "Non-coder first",
    body: "The env var table, the model card, the deploy command — all designed for someone who has never opened a terminal. The desktop app will take this further.",
  },
  {
    title: "Honest about cost",
    body: "Every artifact declares what it costs to run and which APIs are billed. No surprises.",
  },
  {
    title: "Honest about data",
    body: "Every artifact's model card declares what data leaves your machine and where it goes.",
  },
  {
    title: "Open forever",
    body: "MIT licensed. The registry is a folder of JSON files. Fork it, run your own instance, take the schema and build something else.",
  },
];

const styles = {
  root: {
    paddingTop: "60px",
    paddingBottom: "80px",
    maxWidth: "680px",
    animation: "fadeUp 0.3s ease",
  },
  header: {
    marginBottom: "48px",
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
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 900,
    color: "var(--text)",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  lead: {
    fontSize: "17px",
    color: "var(--text)",
    lineHeight: 1.75,
    marginBottom: "24px",
  },
  para: {
    fontSize: "15px",
    color: "var(--text-2)",
    lineHeight: 1.75,
    marginBottom: "20px",
  },
  divider: {
    borderTop: "1px solid var(--border)",
    margin: "40px 0",
  },
  h2: {
    fontFamily: "var(--display)",
    fontSize: "24px",
    fontWeight: 700,
    color: "var(--text)",
    marginBottom: "16px",
  },
  principles: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  principle: {
    padding: "20px 0",
    borderBottom: "1px solid var(--border)",
  },
  principleTitle: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
    letterSpacing: "0.04em",
    marginBottom: "6px",
  },
  principleBody: {
    fontSize: "14px",
    color: "var(--text-2)",
    lineHeight: 1.7,
  },
  links: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  linkBtn: {
    display: "inline-block",
    padding: "10px 20px",
    background: "var(--bg-2)",
    border: "1px solid var(--border-2)",
    borderRadius: "var(--radius)",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
    textDecoration: "none",
  },
};
