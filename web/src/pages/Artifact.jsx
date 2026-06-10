import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useRegistry } from "../hooks/useRegistry";
import Badge from "../components/Badge";
import EnvVarTable from "../components/EnvVarTable";
import ModelCardSection from "../components/ModelCardSection";
import CostDisplay from "../components/CostDisplay";

export default function Artifact() {
  const { slug } = useParams();
  const { data, loading, error } = useRegistry();
  const [copied, setCopied] = useState(false);

  if (loading) return <StateBox>Loading...</StateBox>;
  if (error) return <StateBox color="var(--danger)">Failed to load registry.</StateBox>;

  const artifact = data?.artifacts?.find(a => a.slug === slug);
  if (!artifact) return (
    <StateBox>
      Artifact not found. <Link to="/" style={{ color: "var(--accent)" }}>Browse all →</Link>
    </StateBox>
  );

  const {
    name, tagline, description, author, repo, version,
    compose_file = "docker-compose.yml",
    os_compatibility = [],
    hardware,
    category = [],
    tags = [],
    difficulty,
    cost,
    apis_required = [],
    env = [],
    services = [],
    media,
    model_card,
  } = artifact;

  const deployCmd = `# Clone the repo\ngit clone ${repo}\ncd ${repo.split("/").pop()}\n\n# Copy and fill in your env vars\ncp .env.example .env\n# Edit .env with your keys\n\n# Run\ndocker compose -f ${compose_file} up -d`;

  const handleCopy = () => {
    navigator.clipboard.writeText(deployCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={styles.root}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <Link to="/" style={styles.breadcrumbLink}>Browse</Link>
        <span style={styles.breadcrumbSep}>/</span>
        <span style={styles.breadcrumbCurrent}>{name}</span>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>{name}</h1>
          {author && (
            <div style={styles.authorRow}>
              <span style={styles.authorLabel}>by</span>
              <a
                href={`https://github.com/${author}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.authorLink}
              >
                {author}
              </a>
              {version && <span style={styles.version}>v{version}</span>}
            </div>
          )}
          {tagline && <p style={styles.tagline}>{tagline}</p>}

          <div style={styles.badgeRow}>
            {difficulty && <Badge type={difficulty} />}
            {category.map(c => <Badge key={c} type={c} />)}
            {os_compatibility.map(os => <Badge key={os} type={os} />)}
          </div>
        </div>

        <div style={styles.headerRight}>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.repoBtn}
          >
            View on GitHub ↗
          </a>
        </div>
      </div>

      {/* Two column layout */}
      <div style={styles.layout}>
        {/* Main content */}
        <div style={styles.main}>

          {description && (
            <section style={styles.section}>
              <h2 style={styles.sectionHeading}>About</h2>
              <p style={styles.body}>{description}</p>
            </section>
          )}

          {/* Deploy command */}
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Deploy</h2>
            <div style={styles.codeBlock}>
              <pre style={styles.pre}>{deployCmd}</pre>
              <button style={styles.copyBtn} onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </section>

          {/* Services */}
          {services.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionHeading}>
                Containers ({services.length})
              </h2>
              <div style={styles.services}>
                {services.map(s => (
                  <div key={s.name} style={styles.service}>
                    <code style={styles.serviceName}>{s.name}</code>
                    {s.image && (
                      <code style={styles.serviceImage}>{s.image}</code>
                    )}
                    {s.description && (
                      <p style={styles.serviceDesc}>{s.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Env vars */}
          {env.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionHeading}>
                Environment Variables ({env.length})
              </h2>
              <p style={styles.envNote}>
                Copy <code style={styles.inlineCode}>.env.example</code> to{" "}
                <code style={styles.inlineCode}>.env</code> and fill in the
                values below before running.
              </p>
              <EnvVarTable env={env} />
            </section>
          )}

          {/* Model card */}
          {model_card && (
            <section style={styles.section}>
              <h2 style={styles.sectionHeading}>Model Card</h2>
              <ModelCardSection modelCard={model_card} />
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sideCard}>
            <div style={styles.sideSection}>
              <div style={styles.sideLabel}>Cost</div>
              <CostDisplay cost={cost} />
            </div>

            {apis_required.length > 0 && (
              <div style={styles.sideSection}>
                <div style={styles.sideLabel}>APIs Required</div>
                <div style={styles.apiList}>
                  {apis_required.map(api => (
                    <code key={api} style={styles.apiChip}>{api}</code>
                  ))}
                </div>
              </div>
            )}

            {hardware && (
              <div style={styles.sideSection}>
                <div style={styles.sideLabel}>Hardware</div>
                <div style={styles.hwList}>
                  {hardware.min_ram_gb && (
                    <div style={styles.hwItem}>
                      <span style={styles.hwKey}>Min RAM</span>
                      <span style={styles.hwVal}>{hardware.min_ram_gb} GB</span>
                    </div>
                  )}
                  {hardware.min_storage_gb && (
                    <div style={styles.hwItem}>
                      <span style={styles.hwKey}>Min storage</span>
                      <span style={styles.hwVal}>{hardware.min_storage_gb} GB</span>
                    </div>
                  )}
                  {hardware.gpu_required && (
                    <div style={styles.hwItem}>
                      <span style={styles.hwKey}>GPU</span>
                      <span style={{ color: "var(--danger)", fontFamily: "var(--mono)", fontSize: "12px" }}>
                        Required {hardware.gpu_vram_gb ? `(${hardware.gpu_vram_gb}GB VRAM)` : ""}
                      </span>
                    </div>
                  )}
                  {hardware.note && (
                    <p style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic", marginTop: "6px" }}>
                      {hardware.note}
                    </p>
                  )}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div style={styles.sideSection}>
                <div style={styles.sideLabel}>Tags</div>
                <div style={styles.tagList}>
                  {tags.map(t => (
                    <Badge key={t} type="tag" label={t} small />
                  ))}
                </div>
              </div>
            )}

            <div style={styles.sideSection}>
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.fullRepoBtn}
              >
                View source on GitHub ↗
              </a>
              <a
                href={`${repo}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.issueLink}
              >
                Report an issue ↗
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StateBox({ children, color }) {
  return (
    <div style={{ padding: "80px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: "13px", color: color || "var(--text-2)" }}>
      {children}
    </div>
  );
}

const styles = {
  root: {
    paddingTop: "40px",
    paddingBottom: "80px",
    animation: "fadeUp 0.3s ease",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "32px",
  },
  breadcrumbLink: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-3)",
    textDecoration: "none",
  },
  breadcrumbSep: {
    color: "var(--text-3)",
    fontFamily: "var(--mono)",
    fontSize: "12px",
  },
  breadcrumbCurrent: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: "48px",
    paddingBottom: "48px",
    borderBottom: "1px solid var(--border)",
    flexWrap: "wrap",
  },
  headerLeft: {
    flex: 1,
    minWidth: "280px",
  },
  headerRight: {
    flexShrink: 0,
  },
  title: {
    fontFamily: "var(--display)",
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: 900,
    color: "var(--text)",
    marginBottom: "10px",
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  },
  authorLabel: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-3)",
  },
  authorLink: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent-2)",
    textDecoration: "none",
  },
  version: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
    background: "var(--bg-3)",
    padding: "2px 8px",
    borderRadius: "2px",
  },
  tagline: {
    fontSize: "16px",
    color: "var(--text-2)",
    lineHeight: 1.6,
    marginBottom: "20px",
    maxWidth: "560px",
  },
  badgeRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  repoBtn: {
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
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: "48px",
    alignItems: "start",
  },
  main: {
    minWidth: 0,
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
  body: {
    fontSize: "15px",
    color: "var(--text-2)",
    lineHeight: 1.7,
  },
  codeBlock: {
    position: "relative",
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
  },
  pre: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
    lineHeight: 1.8,
    padding: "20px",
    margin: 0,
    overflowX: "auto",
    whiteSpace: "pre",
  },
  copyBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "var(--bg-3)",
    border: "1px solid var(--border-2)",
    borderRadius: "var(--radius)",
    padding: "4px 12px",
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-2)",
    cursor: "pointer",
  },
  services: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  service: {
    padding: "14px 0",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  serviceName: {
    fontFamily: "var(--mono)",
    fontSize: "13px",
    color: "var(--accent)",
  },
  serviceImage: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
  serviceDesc: {
    fontSize: "13px",
    color: "var(--text-2)",
    marginTop: "4px",
  },
  envNote: {
    fontSize: "13px",
    color: "var(--text-2)",
    marginBottom: "20px",
  },
  inlineCode: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
    background: "var(--bg-3)",
    padding: "1px 6px",
    borderRadius: "2px",
  },
  sidebar: {
    position: "sticky",
    top: "80px",
  },
  sideCard: {
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sideSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingBottom: "20px",
    borderBottom: "1px solid var(--border)",
  },
  sideLabel: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-3)",
  },
  apiList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  apiChip: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-2)",
    background: "var(--bg-3)",
    padding: "3px 8px",
    borderRadius: "2px",
  },
  hwList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  hwItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hwKey: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
  hwVal: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  fullRepoBtn: {
    display: "block",
    textAlign: "center",
    padding: "10px",
    background: "var(--accent)",
    color: "#0e0e0e",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: "var(--radius)",
    textDecoration: "none",
  },
  issueLink: {
    display: "block",
    textAlign: "center",
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
    textDecoration: "none",
  },
};
