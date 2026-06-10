import { useState, useMemo } from "react";
import { useRegistry } from "../hooks/useRegistry";
import ArtifactCard from "../components/ArtifactCard";
import Badge from "../components/Badge";

const CATEGORIES = [
  "business", "home", "creative", "productivity",
  "development", "education", "community",
];

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

export default function Browse() {
  const { data, loading, error } = useRegistry();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeDifficulty, setActiveDifficulty] = useState(null);

  const artifacts = useMemo(() => {
    if (!data?.artifacts) return [];
    return data.artifacts.filter(a => {
      const matchesSearch = !search ||
        a.name?.toLowerCase().includes(search.toLowerCase()) ||
        a.tagline?.toLowerCase().includes(search.toLowerCase()) ||
        a.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = !activeCategory ||
        a.category?.includes(activeCategory);

      const matchesDifficulty = !activeDifficulty ||
        a.difficulty === activeDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [data, search, activeCategory, activeDifficulty]);

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <p style={styles.heroEyebrow}>Community registry</p>
        <h1 style={styles.heroTitle}>
          AI that runs<br />on your own hardware.
        </h1>
        <p style={styles.heroSub}>
          Deployable stacks — Docker Compose, a .env file, and nothing else.
          No subscriptions. No lock-in. Yours to own.
        </p>
        <div style={styles.heroActions}>
          <a
            href="https://github.com/YOUR_ORG/aistack"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.btnPrimary}
          >
            View on GitHub ↗
          </a>
          <a href="#/submit" style={styles.btnSecondary}>
            Publish an artifact
          </a>
        </div>
      </div>

      {/* Search + filters */}
      <div style={styles.controls}>
        <input
          style={styles.search}
          type="text"
          placeholder="Search artifacts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Category</span>
            <div style={styles.filters}>
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  style={{
                    ...styles.filterBtn,
                    ...(activeCategory === c ? styles.filterBtnActive : {}),
                  }}
                  onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Difficulty</span>
            <div style={styles.filters}>
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  style={{
                    ...styles.filterBtn,
                    ...(activeDifficulty === d ? styles.filterBtnActive : {}),
                  }}
                  onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={styles.resultsMeta}>
        {!loading && !error && (
          <span style={styles.count}>
            {artifacts.length} artifact{artifacts.length !== 1 ? "s" : ""}
            {(activeCategory || activeDifficulty || search) ? " matched" : ""}
          </span>
        )}
        {(activeCategory || activeDifficulty || search) && (
          <button
            style={styles.clearBtn}
            onClick={() => {
              setSearch("");
              setActiveCategory(null);
              setActiveDifficulty(null);
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* States */}
      {loading && <LoadingState />}
      {error && <ErrorState error={error} />}
      {!loading && !error && artifacts.length === 0 && <EmptyState />}

      {/* Grid */}
      {!loading && !error && artifacts.length > 0 && (
        <div style={styles.grid}>
          {artifacts.map(a => (
            <ArtifactCard key={a.slug} artifact={a} />
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      {!loading && !error && (
        <div style={styles.cta}>
          <p style={styles.ctaText}>Built something with AI?</p>
          <a href="#/submit" style={styles.btnSecondary}>
            Publish your artifact →
          </a>
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div style={styles.stateBox}>
      <div style={{ fontFamily: "var(--mono)", color: "var(--text-3)", fontSize: "13px" }}>
        Loading registry...
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div style={styles.stateBox}>
      <div style={{ fontFamily: "var(--mono)", color: "var(--danger)", fontSize: "13px" }}>
        Failed to load registry. Check your connection or try again.
      </div>
      <div style={{ fontFamily: "var(--mono)", color: "var(--text-3)", fontSize: "11px", marginTop: "8px" }}>
        {error?.message}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={styles.stateBox}>
      <div style={{ fontFamily: "var(--mono)", color: "var(--text-3)", fontSize: "13px" }}>
        No artifacts match your filters.
      </div>
    </div>
  );
}

const styles = {
  hero: {
    padding: "80px 0 60px",
    borderBottom: "1px solid var(--border)",
    marginBottom: "40px",
    animation: "fadeUp 0.4s ease",
  },
  heroEyebrow: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--accent)",
    marginBottom: "16px",
  },
  heroTitle: {
    fontFamily: "var(--display)",
    fontSize: "clamp(36px, 6vw, 72px)",
    fontWeight: 900,
    lineHeight: 1.05,
    color: "var(--text)",
    marginBottom: "20px",
  },
  heroSub: {
    fontSize: "16px",
    color: "var(--text-2)",
    maxWidth: "520px",
    lineHeight: 1.7,
    marginBottom: "32px",
  },
  heroActions: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    display: "inline-block",
    padding: "10px 24px",
    background: "var(--accent)",
    color: "#0e0e0e",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    borderRadius: "var(--radius)",
    textDecoration: "none",
    border: "none",
  },
  btnSecondary: {
    display: "inline-block",
    padding: "10px 24px",
    background: "transparent",
    color: "var(--text-2)",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    letterSpacing: "0.06em",
    borderRadius: "var(--radius)",
    textDecoration: "none",
    border: "1px solid var(--border-2)",
  },
  controls: {
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  search: {
    width: "100%",
    maxWidth: "480px",
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "10px 16px",
    fontFamily: "var(--mono)",
    fontSize: "13px",
    color: "var(--text)",
    outline: "none",
  },
  filterRow: {
    display: "flex",
    gap: "32px",
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-3)",
  },
  filters: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  filterBtn: {
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "4px 12px",
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-2)",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  filterBtnActive: {
    background: "var(--bg-3)",
    borderColor: "var(--accent)",
    color: "var(--accent)",
  },
  resultsMeta: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  count: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-3)",
  },
  clearBtn: {
    background: "none",
    border: "none",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent-2)",
    cursor: "pointer",
    padding: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
    marginBottom: "60px",
  },
  stateBox: {
    padding: "60px 0",
    textAlign: "center",
  },
  cta: {
    borderTop: "1px solid var(--border)",
    padding: "48px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  ctaText: {
    fontFamily: "var(--display)",
    fontSize: "24px",
    color: "var(--text)",
  },
};
