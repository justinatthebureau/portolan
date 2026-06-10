#!/usr/bin/env python3
"""
linkcheck.py
============
Checks all URLs in all artifact files. Run weekly by CI cron.
Opens a GitHub issue if dead links are found.

Checks:
- repo URLs
- media URLs (thumbnail, screenshots, demo, video)
- obtain_url fields in env vars
"""

import json
import sys
import httpx
from pathlib import Path

ARTIFACTS_DIR = Path(__file__).parent / "artifacts"
TIMEOUT = 10.0


def check_url(url: str, client: httpx.Client) -> bool:
    """Returns True if URL is reachable."""
    try:
        r = client.head(url, timeout=TIMEOUT, follow_redirects=True)
        # Some servers reject HEAD, fall back to GET
        if r.status_code >= 400:
            r = client.get(url, timeout=TIMEOUT, follow_redirects=True)
        return r.status_code < 400
    except Exception:
        return False


def collect_urls(data: dict) -> list[tuple[str, str]]:
    """Returns list of (label, url) pairs from an artifact dict."""
    urls = []

    if repo := data.get("repo"):
        urls.append(("repo", repo))

    if media := data.get("media"):
        for field in ["thumbnail", "demo_url", "video_url"]:
            if url := media.get(field):
                urls.append((f"media.{field}", url))
        for i, url in enumerate(media.get("screenshots", [])):
            urls.append((f"media.screenshots[{i}]", url))

    for i, env in enumerate(data.get("env", [])):
        if url := env.get("obtain_url"):
            urls.append((f"env[{i}].obtain_url ({env.get('key', '?')})", url))

    if card := data.get("model_card"):
        if url := card.get("demo_url"):
            urls.append(("model_card.demo_url", url))

    return urls


def main():
    artifact_files = sorted(ARTIFACTS_DIR.glob("*.json"))
    dead_links = []

    with httpx.Client() as client:
        for path in artifact_files:
            try:
                data = json.loads(path.read_text())
            except Exception:
                continue

            urls = collect_urls(data)
            for label, url in urls:
                ok = check_url(url, client)
                status = "✓" if ok else "❌"
                print(f"{status} {path.stem} — {label}: {url}")
                if not ok:
                    dead_links.append({
                        "artifact": path.stem,
                        "field": label,
                        "url": url,
                    })

    if dead_links:
        print(f"\n{len(dead_links)} dead link(s) found:")
        for link in dead_links:
            print(f"  {link['artifact']} [{link['field']}]: {link['url']}")
        # CI uses this exit code to trigger issue creation
        sys.exit(1)
    else:
        print(f"\nAll links alive across {len(artifact_files)} artifacts.")
        sys.exit(0)


if __name__ == "__main__":
    main()
