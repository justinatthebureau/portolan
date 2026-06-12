# Self-Hosting portolan

You can fork this repo and run your own private or community instance of portolan. This is useful for:

- An internal company catalog of approved AI tools
- A community-specific registry (homelab tools, agriculture, education)
- Experimenting with the schema before contributing upstream

---

## Fork and configure

1. Fork [github.com/justinatthebureau/portolan](https://github.com/justinatthebureau/portolan) on GitHub
2. Go to your fork's **Settings → Pages**
   - Source: **GitHub Actions**
3. Go to **Settings → Actions → General → Workflow permissions**
   - Set to **Read and write** (required for the build-index workflow to commit back)

---

## Configure the base path

If you're hosting at `username.github.io/portolan` (no custom domain):

Edit `.github/workflows/deploy-web.yml` and set:
```yaml
VITE_BASE_PATH: /portolan/
```

If you're using a custom domain (e.g. `portolan.yourorg.com`):
```yaml
VITE_BASE_PATH: /
```

And add a `web/public/CNAME` file containing your domain:
```
portolan.yourorg.com
```

---

## Update the GitHub links

Search the repo for `YOUR_ORG` and replace with your GitHub org or username:
- `README.md`
- `web/src/components/Layout.jsx`
- `web/src/pages/Browse.jsx`
- `web/src/pages/Submit.jsx`
- `web/src/pages/About.jsx`
- `docs/publishing.md`

---

## Populate your registry

Add artifact JSON files to `registry/artifacts/`. You can:
- Use existing artifacts from the upstream registry
- Add your own private artifacts
- Restrict submissions to your organization

---

## Trigger your first deploy

Push any change to `main` or manually trigger the workflows:
- `Build Index` → rebuilds `registry/index.json`
- `Deploy Web` → builds and deploys the React app to GitHub Pages

Both workflows run automatically on push, but you can also trigger them manually from the Actions tab.

---

## Keeping up with upstream

To pull improvements from the main portolan repo:
```bash
git remote add upstream https://github.com/justinatthebureau/portolan.git
git fetch upstream
git merge upstream/main
```

Schema changes in upstream may require updating your existing artifact files. Check the changelog before merging.

---

## Running locally

**Registry validation:**
```bash
cd registry
pip install pydantic
python validate.py
python build_index.py
```

**Web frontend:**
```bash
cd web
npm install

# Point to your local index
echo "VITE_REGISTRY_URL=http://localhost:5173/index.json" > .env.local
cp ../registry/index.json public/index.json

npm run dev
```
