#!/usr/bin/env python3
"""
validate.py
===========
Validates all artifact JSON files in registry/artifacts/ against the
canonical schema. Run by CI on every PR that touches registry/artifacts/.

Exit code 0 = all valid
Exit code 1 = one or more validation errors
"""

import json
import sys
from pathlib import Path
from pydantic import ValidationError
from schema import Artifact

ARTIFACTS_DIR = Path(__file__).parent / "artifacts"


def validate_artifact(path: Path) -> list[str]:
    """Returns list of error strings, empty if valid."""
    errors = []

    try:
        raw = path.read_text()
    except Exception as e:
        return [f"Could not read file: {e}"]

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        return [f"Invalid JSON: {e}"]

    try:
        Artifact(**data)
    except ValidationError as e:
        for err in e.errors():
            field = " -> ".join(str(x) for x in err["loc"])
            errors.append(f"  [{field}] {err['msg']}")

    return errors


def main():
    if not ARTIFACTS_DIR.exists():
        print("No artifacts directory found.")
        sys.exit(1)

    artifact_files = sorted(ARTIFACTS_DIR.glob("*.json"))

    if not artifact_files:
        print("No artifact files found in registry/artifacts/")
        sys.exit(0)

    all_valid = True

    for path in artifact_files:
        errors = validate_artifact(path)
        if errors:
            all_valid = False
            print(f"❌ {path.name}")
            for err in errors:
                print(err)
        else:
            print(f"✓  {path.name}")

    print()
    if all_valid:
        print(f"All {len(artifact_files)} artifacts valid.")
        sys.exit(0)
    else:
        print("Validation failed. Fix errors above before merging.")
        sys.exit(1)


if __name__ == "__main__":
    main()
