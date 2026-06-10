const VARIANTS = {
  // Cost tiers
  free:         { bg: "#1a2e1a", color: "#7eb89a", label: "Free" },
  low:          { bg: "#1e2a1a", color: "#9ec87a", label: "Low cost" },
  medium:       { bg: "#2a2218", color: "#c8a96e", label: "Medium cost" },
  variable:     { bg: "#2a1e1e", color: "#c89a6e", label: "Variable cost" },

  // Difficulty
  beginner:     { bg: "#1a2a1a", color: "#7eb89a", label: "Beginner" },
  intermediate: { bg: "#22201a", color: "#c8b46e", label: "Intermediate" },
  advanced:     { bg: "#2a1a1a", color: "#c86e6e", label: "Advanced" },

  // OS
  linux:        { bg: "#1a1e2a", color: "#6e9ac8", label: "Linux" },
  mac:          { bg: "#1e1a2a", color: "#9a6ec8", label: "Mac" },
  windows:      { bg: "#1a2228", color: "#6eb8c8", label: "Windows" },

  // Categories
  business:     { bg: "#1e1e2a", color: "#8a8ac8", label: "Business" },
  home:         { bg: "#1a2a22", color: "#6ec8a0", label: "Home" },
  creative:     { bg: "#2a1a22", color: "#c86ea0", label: "Creative" },
  productivity: { bg: "#221a2a", color: "#a06ec8", label: "Productivity" },
  development:  { bg: "#1a2228", color: "#6eb8c8", label: "Development" },
  education:    { bg: "#2a221a", color: "#c8a06e", label: "Education" },
  community:    { bg: "#1a2a1a", color: "#6ec878", label: "Community" },

  // Generic tag
  tag:          { bg: "#1e1e1e", color: "#6a6a6a", label: null },
};

export default function Badge({ type, label, small }) {
  const variant = VARIANTS[type] || VARIANTS.tag;
  const text = label || variant.label || type;

  return (
    <span style={{
      display: "inline-block",
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: "3px",
      background: variant.bg,
      color: variant.color,
      fontFamily: "var(--mono)",
      fontSize: small ? "10px" : "11px",
      fontWeight: 500,
      letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  );
}
