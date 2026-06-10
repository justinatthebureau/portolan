import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function ArtifactCard({ artifact }) {
  const {
    slug,
    name,
    tagline,
    author,
    difficulty,
    cost,
    category = [],
    services = [],
    apis_required = [],
  } = artifact;

  const containerCount = services.length;

  return (
    <Link
      to={`/artifact/${slug}`}
      style={styles.card}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-2)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.nameRow}>
          <span style={styles.name}>{name}</span>
          {author && (
            <span style={styles.author}>by {author}</span>
          )}
        </div>
        <div style={styles.badges}>
          {difficulty && <Badge type={difficulty} small />}
          {cost && <Badge type={cost.tier} small />}
        </div>
      </div>

      {/* Tagline */}
      {tagline && (
        <p style={styles.tagline}>{tagline}</p>
      )}

      {/* Footer meta */}
      <div style={styles.footer}>
        <div style={styles.categories}>
          {category.slice(0, 2).map(c => (
            <Badge key={c} type={c} small />
          ))}
        </div>
        <div style={styles.meta}>
          {containerCount > 0 && (
            <span style={styles.metaItem}>
              {containerCount} container{containerCount !== 1 ? "s" : ""}
            </span>
          )}
          {apis_required.length > 0 && (
            <span style={styles.metaItem}>
              {apis_required.join(", ")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    display: "block",
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    textDecoration: "none",
    color: "inherit",
    transition: "border-color 0.15s",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "10px",
  },
  nameRow: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  name: {
    fontFamily: "var(--sans)",
    fontWeight: 500,
    fontSize: "15px",
    color: "var(--text)",
  },
  author: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
  badges: {
    display: "flex",
    gap: "6px",
    flexShrink: 0,
  },
  tagline: {
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.5,
    marginBottom: "16px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "auto",
    paddingTop: "14px",
    borderTop: "1px solid var(--border)",
  },
  categories: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  meta: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  metaItem: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
};
