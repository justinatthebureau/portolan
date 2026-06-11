# Publishing an Artifact

This guide walks through publishing a Docker-based AI tool to the AIStack marketplace.

---

## Prerequisites

- A working Docker Compose project on GitHub (public repo)
- A `docker-compose.yml` at the repo root (or a path you'll specify)
- A `.env.example` file with all required variables listed

---

## Step 1 — Add marketplace.json to your repo

Create `marketplace.json` at the root of your GitHub repo. Only `name` and `repo` are required, but the more you fill in, the more useful your listing will be.

```json
{
  "name": "My AI Tool",
  "tagline": "One sentence describing what it does for someone who isn't technical.",
  "description": "Longer explanation for the artifact page. Who would want this? What problem does it solve? What does a typical day of use look like?",
  "author": "your-github-username",
  "repo": "https://github.com/your-username/my-ai-tool",
  "version": "1.0.0",
  "category": ["business"],
  "difficulty": "beginner",
  "cost": {
    "tier": "low",
    "max_monthly_usd": 5.00,
    "apis_billed": ["anthropic"],
    "note": "Depends on usage volume"
  },
  "apis_required": ["anthropic"],
  "env": [
    {
      "key": "ANTHROPIC_API_KEY",
      "description": "Your Anthropic API key. Used to analyze text.",
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
    "intended_use": "Who this is for and what it does.",
    "not_for": "What it should not be used for.",
    "limitations": "Known failure modes or edge cases.",
    "privacy": "What data leaves the user's machine and where it goes.",
    "getting_started": "1. Copy .env.example to .env\n2. Fill in your API key\n3. Run docker compose up -d",
    "known_issues": []
  }
}
```

---

## Step 2 — Choose a slug

Your slug is the filename in the registry and the URL on the marketplace. It should be:
- Lowercase, hyphenated
- Descriptive but concise
- Unique (check `registry/artifacts/` to confirm)

Example: `review-monitor-agent`, `allergy-alerter`, `invoice-extractor`

---

## Step 3 — Fork and add your artifact

1. Fork [github.com/justinatthebureau/portolan](https://github.com/justinatthebureau/portolan)
2. Add a file at `registry/artifacts/your-slug.json` with your marketplace.json content
3. Run validation locally to catch errors before CI:

```bash
cd registry
pip install pydantic
python validate.py
```

---

## Step 4 — Open a pull request

Open a PR against the main AIStack repo. CI will:
- Validate your JSON against the schema
- Check that required fields are present
- Report specific errors if anything is wrong

If validation passes, a maintainer will review and merge.

---

## Tips for a good listing

**Tagline** — Write it for someone who doesn't know what "LLM" means. "Monitors your Google reviews and emails you a summary" beats "LLM-powered review monitoring agent."

**Privacy field** — Be specific. "Review text is sent to the Anthropic API for analysis. Anthropic's data retention policies apply." Users need to know what leaves their machine.

**Cost** — Provide a realistic ceiling. It's better to say "up to $5/month" than leave it blank. If it's free, say so explicitly.

**Getting started** — Write it as numbered steps. Assume the user has Docker installed and nothing else.

**Known issues** — Be honest. A listing that acknowledges its limitations is more trustworthy than one that doesn't.

---

## Updating your artifact

To update version or fields: open a PR against your artifact's JSON file in `registry/artifacts/`. Changes go live after merge.

To remove your artifact: open a PR deleting the file. Include a brief explanation.
