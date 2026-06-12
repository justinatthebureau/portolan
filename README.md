# portolan Marketplace

A community-curated marketplace of deployable AI stacks. Find, understand, and run AI-powered tools on your own infrastructure — no coding required.

![License](https://img.shields.io/badge/license-MIT-blue)
![Registry PRs Welcome](https://img.shields.io/badge/registry-PRs%20welcome-brightgreen)

## What is this?

portolan is two things:

1. **A registry** of AI-powered Docker stacks, each described by a `marketplace.json` manifest
2. **A web marketplace** that makes those stacks browsable and understandable by non-coders

Every artifact in the registry is a real GitHub repo with a working Docker Compose setup. You bring your own API keys. You run it on your own hardware.

## Quick Start

**Browse:** Visit [portolan.dev](https://portolan.dev) (GitHub Pages)

**Publish an artifact:** See [docs/publishing.md](docs/publishing.md)

**Self-host the marketplace:** See [docs/self-hosting.md](docs/self-hosting.md)

**Contribute to the platform:** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Monorepo Structure

This repository contains two distinct components. They are in a monorepo for now because the project is early and solo/small-team development benefits from unified PRs, shared issues, and a single place to understand the whole system.

```
portolan/
├── registry/          # The artifact database
├── web/               # The marketplace frontend
├── docs/              # Platform documentation
└── .github/           # Monorepo-level CI and templates
```

### `registry/`

The canonical source of truth for all published artifacts. Contains:
- Individual artifact JSON files (`artifacts/*.json`)
- Auto-generated `index.json` catalog
- Pydantic schema (`schema.py`) — this is the spec
- Validation scripts (`validate.py`, `linkcheck.py`)
- CI workflows for validation, indexing, and link checking

**Owner:** Registry maintainers. Changes here affect what appears in the marketplace.

**Boundary:** The registry has no dependency on the web frontend. It is a self-contained data layer. Any frontend — or CLI tool, or desktop app — can consume `index.json` directly.

### `web/`

A static React application deployed to GitHub Pages. Fetches `index.json` from the registry at runtime. No server, no build-time data fetching.

**Owner:** Frontend contributors. Changes here affect the browse/discovery experience.

**Boundary:** The web frontend has no write access to the registry. It is purely a read layer. It consumes the published `index.json` URL and nothing else.

---

### When to Split into Two Repos

Split `registry/` into its own repo when **any** of these are true:

- The registry has its own maintainer team distinct from the frontend team
- You want separate contribution workflows (registry PRs go through stricter review than UI PRs)
- A desktop app, CLI, or API layer needs to depend on the registry schema as a package
- The registry CI is slow enough that frontend contributors are blocked by it

Split `web/` into its own repo when **any** of these are true:

- You want to enable GitHub Pages deployment independently of registry changes
- Frontend contributors are blocked by registry CI on unrelated PRs
- You want to support multiple frontends consuming the same registry

**How to split:** The boundaries are already clean. `registry/` has no imports from `web/` and vice versa. Splitting is moving folders into new repos and updating the `index.json` URL in `web/src/lib/config.ts`.

---

## License

MIT. See [LICENSE](LICENSE).
