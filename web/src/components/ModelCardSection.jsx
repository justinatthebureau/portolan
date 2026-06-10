function Section({ label, children }) {
  if (!children) return null;
  return (
    <div style={styles.section}>
      <div style={styles.label}>{label}</div>
      <div style={styles.content}>{children}</div>
    </div>
  );
}

export default function ModelCardSection({ modelCard }) {
  if (!modelCard) return null;

  const {
    intended_use,
    not_for,
    limitations,
    privacy,
    getting_started,
    known_issues = [],
  } = modelCard;

  const hasContent = intended_use || not_for || limitations ||
    privacy || getting_started || known_issues.length > 0;

  if (!hasContent) return null;

  return (
    <div style={styles.root}>
      <h3 style={styles.heading}>Model Card</h3>

      <Section label="Intended use">{intended_use}</Section>
      <Section label="Not intended for">{not_for}</Section>
      <Section label="Limitations">{limitations}</Section>
      <Section label="Privacy & data">
        {privacy && (
          <span style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={styles.privacyIcon}>🔒</span>
            <span>{privacy}</span>
          </span>
        )}
      </Section>

      {getting_started && (
        <div style={styles.section}>
          <div style={styles.label}>Getting started</div>
          <pre style={styles.pre}>{getting_started}</pre>
        </div>
      )}

      {known_issues.length > 0 && (
        <div style={styles.section}>
          <div style={styles.label}>Known issues</div>
          <ul style={styles.list}>
            {known_issues.map((issue, i) => (
              <li key={i} style={styles.listItem}>
                <span style={styles.bullet}>—</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  heading: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-3)",
    marginBottom: "4px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--accent)",
    letterSpacing: "0.04em",
  },
  content: {
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.6,
  },
  privacyIcon: {
    fontSize: "13px",
    flexShrink: 0,
    marginTop: "1px",
  },
  pre: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
    lineHeight: 1.8,
    background: "var(--bg-3)",
    borderRadius: "var(--radius)",
    padding: "16px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
  },
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  listItem: {
    display: "flex",
    gap: "10px",
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.5,
  },
  bullet: {
    color: "var(--text-3)",
    flexShrink: 0,
    fontFamily: "var(--mono)",
  },
};
