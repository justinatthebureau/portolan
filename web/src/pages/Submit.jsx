const SAMPLE_MANIFEST = `{
  "name": "My AI Tool",
  "tagline": "One sentence describing what it does.",
  "description": "Longer description for the artifact page.",
  "author": "your-github-username",
  "repo": "https://github.com/your-username/my-ai-tool",
  "version": "1.0.0",
  "category": ["business"],
  "tags": ["anthropic", "monitoring"],
  "difficulty": "beginner",
  "cost": {
    "tier": "low",
    "max_monthly_usd": 5.00,
    "apis_billed": ["anthropic"],
    "note": "Scales with usage"
  },
  "apis_required": ["anthropic"],
  "env": [
    {
      "key": "ANTHROPIC_API_KEY",
      "description": "Your Anthropic API key.",
      "required": true,
      "sensitive": true,
      "type": "string",
      "validation": "Must start with sk-ant-",
      "obtain_url": "https://console.anthropic.com/keys",
      "group": "AI Provider"
    }
  ],
  "services": [
    {
      "name": "app",
      "image": "python:3.11-slim",
      "description": "Main application"
    }
  ],
  "model_card": {
    "intended_use": "Who this is for and what problem it solves.",
    "not_for": "Explicit out-of-scope uses.",
    "limitations": "Known failure modes.",
    "privacy": "What data leaves the user's machine.",
    "getting_started": "1. Copy .env.example to .env\\n2. Fill in your keys\\n3. Run docker compose up -d",
    "known_issues": []
  }
}`;

const STEPS = [
  {
    n: "01",
    title: "Build your artifact",
    body: "Your project needs a working docker-compose.yml and a .env.example with all required variables documented. Users should be able to run it by filling in the .env and running docker compose up -d.",
  },
  {
    n: "02",
    title: "Add marketplace.json to your repo root",
    body: "Create a marketplace.json file at the root of your GitHub repo following the schema below. Only name and repo are required — add as much or as little as you like.",
  },
  {
    n: "03",
    title: "Fork this registry and add your artifact",
    body: "Fork the portolan repo on GitHub. Add a file to registry/artifacts/ named your-artifact-slug.json containing your marketplace.json content. The slug becomes the URL on the marketplace.",
  },
  {
    n: "04",
    title: "Open a pull request",
    body: "Open a PR against the main portolan repo. CI will automatically validate your manifest against the schema. If it passes, a maintainer will review and merge. Once merged, your artifact appears on the marketplace within minutes.",
  },
];

export default function Submit() {
  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Publish</p>
        <h1 style={styles.title}>Share your artifact</h1>
        <p style={styles.sub}>
          Publishing is a GitHub pull request. No accounts, no forms.
          If your Docker Compose stack works, it belongs here.
        </p>
      </div>

      {/* Steps */}
      <div style={styles.steps}>
        {STEPS.map(({ n, title, body }) => (
          <div key={n} style={styles.step}>
            <div style={styles.stepNumber}>{n}</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>{title}</h3>
              <p style={styles.stepBody}>{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.prLink}>
        <a
          href="https://github.com/justinatthebureau/portolan/fork"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.primaryBtn}
        >
          Fork the registry on GitHub ↗
        </a>
      </div>

      {/* Schema reference */}
      <div style={styles.schemaSection}>
        <h2 style={styles.sectionHeading}>Sample marketplace.json</h2>
        <p style={styles.schemaSub}>
          Drop this file at the root of your repo and customize it.
          See the{" "}
          <a
            href="https://github.com/justinatthebureau/portolan/blob/main/registry/schema.py"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.inlineLink}
          >
            full schema →
          </a>
        </p>
        <pre style={styles.pre}>{SAMPLE_MANIFEST}</pre>
      </div>

      {/* Quick field reference */}
      <div style={styles.schemaSection}>
        <h2 style={styles.sectionHeading}>Field reference</h2>
        <div style={styles.fieldTable}>
          {FIELDS.map(({ field, required, desc }) => (
            <div key={field} style={styles.fieldRow}>
              <div style={styles.fieldLeft}>
                <code style={styles.fieldName}>{field}</code>
                {required && <span style={styles.required}>required</span>}
              </div>
              <p style={styles.fieldDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FIELDS = [
  { field: "name", required: true, desc: "Display name of your artifact." },
  { field: "repo", required: true, desc: "Full https:// URL of your GitHub repo." },
  { field: "tagline", required: false, desc: "One sentence shown in the browse card (~80 chars)." },
  { field: "description", required: false, desc: "Longer description shown on the artifact page." },
  { field: "author", required: false, desc: "Your GitHub username." },
  { field: "version", required: false, desc: "Semver string e.g. 1.0.0. Must match a git tag." },
  { field: "compose_file", required: false, desc: "Path to your compose file. Defaults to docker-compose.yml." },
  { field: "category", required: false, desc: "One or more of: business, home, creative, productivity, development, education, community." },
  { field: "tags", required: false, desc: "Freeform technical tags e.g. [\"rag\", \"langchain\"]." },
  { field: "difficulty", required: false, desc: "beginner / intermediate / advanced." },
  { field: "cost.tier", required: false, desc: "free / low / medium / variable." },
  { field: "cost.max_monthly_usd", required: false, desc: "Estimated monthly ceiling in USD." },
  { field: "cost.apis_billed", required: false, desc: "APIs that have usage-based billing." },
  { field: "apis_required", required: false, desc: "All APIs needed, billed or free." },
  { field: "env[]", required: false, desc: "Array of environment variable descriptors. Each has key, description, required, sensitive, type, obtain_url, group." },
  { field: "services[]", required: false, desc: "Docker containers in the stack. Each has name, image, description." },
  { field: "hardware", required: false, desc: "min_ram_gb, gpu_required, gpu_vram_gb. Helps users know if it will run on their hardware." },
  { field: "model_card", required: false, desc: "intended_use, not_for, limitations, privacy, getting_started, known_issues." },
];

const styles = {
  root: {
    paddingTop: "60px",
    paddingBottom: "80px",
    maxWidth: "760px",
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
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 900,
    color: "var(--text)",
    marginBottom: "16px",
  },
  sub: {
    fontSize: "15px",
    color: "var(--text-2)",
    lineHeight: 1.7,
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    marginBottom: "40px",
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
    marginTop: "2px",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: 500,
    fontSize: "16px",
    color: "var(--text)",
    marginBottom: "8px",
  },
  stepBody: {
    fontSize: "14px",
    color: "var(--text-2)",
    lineHeight: 1.7,
  },
  prLink: {
    marginBottom: "60px",
  },
  primaryBtn: {
    display: "inline-block",
    padding: "12px 28px",
    background: "var(--accent)",
    color: "#0e0e0e",
    fontFamily: "var(--mono)",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    borderRadius: "var(--radius)",
    textDecoration: "none",
  },
  schemaSection: {
    marginBottom: "48px",
  },
  sectionHeading: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-3)",
    marginBottom: "12px",
    paddingBottom: "8px",
    borderBottom: "1px solid var(--border)",
  },
  schemaSub: {
    fontSize: "13px",
    color: "var(--text-2)",
    marginBottom: "16px",
  },
  inlineLink: {
    color: "var(--accent-2)",
    textDecoration: "none",
  },
  pre: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-2)",
    lineHeight: 1.8,
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    overflowX: "auto",
    whiteSpace: "pre",
    margin: 0,
  },
  fieldTable: {
    display: "flex",
    flexDirection: "column",
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: "16px",
    padding: "12px 0",
    borderBottom: "1px solid var(--border)",
    alignItems: "start",
  },
  fieldLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  fieldName: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--accent)",
  },
  required: {
    fontFamily: "var(--mono)",
    fontSize: "10px",
    color: "var(--accent-2)",
    background: "#1a2a22",
    padding: "1px 6px",
    borderRadius: "2px",
    alignSelf: "flex-start",
  },
  fieldDesc: {
    fontSize: "13px",
    color: "var(--text-2)",
    lineHeight: 1.5,
  },
};
