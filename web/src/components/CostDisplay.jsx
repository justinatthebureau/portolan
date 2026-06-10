import Badge from "./Badge";

export default function CostDisplay({ cost }) {
  if (!cost) return <span style={styles.unknown}>Cost unknown</span>;

  const { tier, min_monthly_usd, max_monthly_usd, apis_billed = [], note } = cost;

  const range = (() => {
    if (tier === "free") return "Free";
    if (max_monthly_usd && min_monthly_usd) return `$${min_monthly_usd}–$${max_monthly_usd}/mo`;
    if (max_monthly_usd) return `Up to $${max_monthly_usd}/mo`;
    if (tier === "variable") return "Variable";
    return null;
  })();

  return (
    <div style={styles.root}>
      <div style={styles.row}>
        <Badge type={tier} />
        {range && range !== "Free" && (
          <span style={styles.range}>{range}</span>
        )}
      </div>
      {apis_billed.length > 0 && (
        <div style={styles.apis}>
          Billed APIs: {apis_billed.join(", ")}
        </div>
      )}
      {note && <div style={styles.note}>{note}</div>}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  range: {
    fontFamily: "var(--mono)",
    fontSize: "13px",
    color: "var(--text-2)",
  },
  apis: {
    fontFamily: "var(--mono)",
    fontSize: "11px",
    color: "var(--text-3)",
  },
  note: {
    fontSize: "12px",
    color: "var(--text-3)",
    fontStyle: "italic",
  },
  unknown: {
    fontFamily: "var(--mono)",
    fontSize: "12px",
    color: "var(--text-3)",
  },
};
