export default function EnvVarTable({ env = [] }) {
  if (env.length === 0) return null;

  // Group by group field, ungrouped goes under "General"
  const groups = {};
  for (const v of env) {
    const g = v.group || "General";
    if (!groups[g]) groups[g] = [];
    groups[g].push(v);
  }

  return (
    <div style={styles.root}>
      {Object.entries(groups).map(([group, vars]) => (
        <div key={group} style={styles.group}>
          <div style={styles.groupLabel}>{group}</div>
          <div style={styles.table}>
            {vars.map(v => (
              <EnvRow key={v.key} v={v} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EnvRow({ v }) {
  return (
    <div style={styles.row}>
      <div style={styles.keyCol}>
        <code style={styles.key}>{v.key}</code>
        <div style={styles.pills}>
          {!v.required && (
            <span style={styles.optional}>optional</span>
          )}
          {v.sensitive && (
            <span style={styles.sensitive}>sensitive</span>
          )}
        </div>
      </div>

      <div style={styles.descCol}>
        {v.description && (
          <p style={styles.desc}>{v.description}</p>
        )}
        <div style={styles.hints}>
          {v.default && (
            <span style={styles.hint}>
              default: <code style={styles.hintCode}>{v.default}</code>
            </span>
          )}
          {v.example && !v.default && (
            <span style={styles.hint}>
              example: <code style={styles.hintCode}>{v.example}</code>
            </span>
          )}
          {v.validation && (
            <span style={styles.hint}>⚠ {v.validation}</span>
          )}
          {v.obtain_url && (
            <a
              href={v.obtain_url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.obtainLink}
            >
              Get this key ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  group: {},
  groupLabel: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--text-3)",
    marginBottom: "8px",
    paddingBottom: "6px",
    borderBottom: "1px solid var(--border)",
  },
  table: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "16px",
    padding: "12px 0",
    borderBottom: "1px solid var(--border)",
    alignItems: "start",
  },
  keyCol: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  key: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
    wordBreak: "break-all",
  },
  pills: {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
  },
  optional: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    color: "var(--text-3)",
    background: "var(--bg-3)",
    padding: "1px 6px",
    borderRadius: "2px",
  },
  sensitive: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    color: "#c86e6e",
    background: "#2a1a1a",
    padding: "1px 6px",
    borderRadius: "2px",
  },
  descCol: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  desc: {
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.5,
  },
  hints: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
  },
  hint: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
  hintCode: {
    color: "var(--text-2)",
    fontFamily: "var(--mono)",
  },
  obtainLink: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--accent-2)",
    textDecoration: "none",
  },
};
