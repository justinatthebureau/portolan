#!/usr/bin/env python3
"""
build_index.py
==============
Generates index.json from all valid artifact files in registry/artifacts/.
Run by CI on every merge to main.

The index.json is what the web frontend fetches at runtime.
It is committed back to the repo by CI so GitHub Pages can serve it
without a build step.
"""

import json
import sys
from pathlib import Path
from datetime import datetime, timezone
from schema import Artifact
from pydantic import ValidationError

ARTIFACTS_DIR = Path(__file__).parent / "artifacts"
INDEX_PATH = Path(__file__).parent / "index.json"


def main():
    artifact_files = sorted(ARTIFACTS_DIR.glob("*.json"))
    artifacts = []
    skipped = []

    for path in artifact_files:
        try:
            data = json.loads(path.read_text())
            artifact = Artifact(**data)
            # Store the slug (filename without extension) for routing
            artifact_dict = artifact.model_dump()
            artifact_dict["slug"] = path.stem
            artifacts.append(artifact_dict)
        except (ValidationError, json.JSONDecodeError, Exception) as e:
            skipped.append((path.name, str(e)))
            print(f"Skipping {path.name}: {e}", file=sys.stderr)

    index = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(artifacts),
        "artifacts": artifacts,
    }

    INDEX_PATH.write_text(json.dumps(index, indent=2, default=str))
    print(f"Built index.json: {len(artifacts)} artifacts")

    if skipped:
        print(f"Skipped {len(skipped)} invalid artifacts:")
        for name, err in skipped:
            print(f"  {name}: {err}")


if __name__ == "__main__":
    main()
