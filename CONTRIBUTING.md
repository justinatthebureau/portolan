# Contributing to portolan

Thanks for wanting to contribute. portolan is a community project and contributions of all kinds are welcome.

## Ways to contribute

- **Publish an artifact** — the most valuable contribution. See [docs/publishing.md](docs/publishing.md).
- **Improve an existing artifact** — fix a broken link, improve documentation, update a version.
- **Improve the schema** — propose additions or changes to `registry/schema.py`.
- **Improve the web frontend** — UI improvements, accessibility, mobile experience.
- **Improve the CI** — faster validation, better error messages, new checks.

---

## Publishing an artifact

See [docs/publishing.md](docs/publishing.md) for the full guide.

**Quick version:**
1. Add `marketplace.json` to the root of your GitHub repo
2. Fork this repo
3. Add `registry/artifacts/your-slug.json` with your manifest content
4. Open a PR — CI validates automatically
5. Maintainer reviews and merges

---

## Working on the web frontend

```bash
cd web
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`. It fetches `index.json` from the live registry URL by default. To use a local index, set `VITE_REGISTRY_URL` in a `.env.local` file:

```
VITE_REGISTRY_URL=http://localhost:5173/index.json
```

Then put a local `index.json` in `web/public/`.

---

## Working on the registry / schema

```bash
cd registry
pip install pydantic
python validate.py      # validate all artifacts
python build_index.py   # rebuild index.json
```

If you change `schema.py`, run `validate.py` to ensure existing artifacts still pass. If you're making a breaking change, open an issue first to discuss the migration path.

---

## Pull request guidelines

- Keep PRs focused — one artifact or one change per PR
- For schema changes, explain why in the PR description
- CI must pass before review
- Be patient — maintainers are volunteers

---

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). The short version: be kind.
