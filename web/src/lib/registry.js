// Central config — update REGISTRY_URL when splitting into two repos
export const REGISTRY_URL =
  import.meta.env.VITE_REGISTRY_URL ||
  "https://raw.githubusercontent.com/YOUR_ORG/portolan/main/registry/index.json";

export async function fetchRegistry() {
  const res = await fetch(REGISTRY_URL);
  if (!res.ok) throw new Error(`Failed to fetch registry: ${res.status}`);
  return res.json();
}
