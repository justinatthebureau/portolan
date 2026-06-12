"""
portolan Marketplace Schema
==========================
This file is the canonical specification for marketplace.json artifacts.
Version this file independently from the app — breaking changes require
a major version bump and a migration path for existing artifacts.

Schema version: 1.0.0
"""

from pydantic import BaseModel, HttpUrl, field_validator
from typing import Optional
from enum import Enum
import re


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class CostTier(str, Enum):
    free = "free"
    low = "low"          # < $10/month estimated
    medium = "medium"    # $10–50/month estimated
    variable = "variable"  # depends heavily on usage


class Category(str, Enum):
    business = "business"
    home = "home"
    creative = "creative"
    productivity = "productivity"
    development = "development"
    education = "education"
    community = "community"


class Difficulty(str, Enum):
    beginner = "beginner"        # update .env and run docker compose up
    intermediate = "intermediate"  # requires some configuration decisions
    advanced = "advanced"          # requires technical understanding


class OS(str, Enum):
    linux = "linux"
    mac = "mac"
    windows = "windows"


class EnvVarType(str, Enum):
    string = "string"
    integer = "integer"
    boolean = "boolean"
    url = "url"
    email = "email"
    path = "path"


# ---------------------------------------------------------------------------
# Sub-models
# ---------------------------------------------------------------------------

class Cost(BaseModel):
    tier: CostTier
    max_monthly_usd: Optional[float] = None   # sets ceiling expectation
    min_monthly_usd: Optional[float] = None   # e.g. free tier exists
    apis_billed: list[str] = []               # e.g. ["anthropic", "sendgrid"]
    note: Optional[str] = None                # human explanation if numbers absent


class Hardware(BaseModel):
    min_ram_gb: Optional[float] = None
    min_storage_gb: Optional[float] = None
    gpu_required: bool = False
    gpu_vram_gb: Optional[float] = None       # only relevant if gpu_required
    note: Optional[str] = None


class EnvVar(BaseModel):
    key: str                                  # e.g. ANTHROPIC_API_KEY
    description: Optional[str] = None         # human explanation
    required: bool = True
    sensitive: bool = False                   # drives masking in UI
    default: Optional[str] = None
    example: Optional[str] = None             # shown as placeholder
    type: EnvVarType = EnvVarType.string      # drives input widget in desktop app
    validation: Optional[str] = None          # hint e.g. "must start with sk-ant-"
    obtain_url: Optional[str] = None          # where to get this key
    group: Optional[str] = None              # e.g. "Database", "Email", "AI Provider"


class Service(BaseModel):
    name: str                                 # e.g. "app", "postgres", "redis"
    image: Optional[str] = None              # e.g. "postgres:15"
    description: Optional[str] = None


class Media(BaseModel):
    thumbnail: Optional[str] = None          # card view image URL
    screenshots: list[str] = []              # artifact page gallery URLs
    demo_url: Optional[str] = None           # live demo if exists
    video_url: Optional[str] = None          # youtube/vimeo walkthrough


class ModelCard(BaseModel):
    """
    Inspired by Hugging Face model cards. Answers 'should I trust this
    and will it work for me' before the user commits to deploying.
    """
    intended_use: Optional[str] = None       # who and what this is for
    not_for: Optional[str] = None            # explicit out-of-scope uses
    limitations: Optional[str] = None        # known failure modes
    privacy: Optional[str] = None            # what data leaves your machine
    getting_started: Optional[str] = None    # markdown quickstart
    known_issues: list[str] = []


# ---------------------------------------------------------------------------
# Root artifact model
# ---------------------------------------------------------------------------

class Artifact(BaseModel):
    """
    Root model for marketplace.json.
    Only `name` and `repo` are required — everything else is optional
    to minimize friction for early publishers. The schema will tighten
    as community norms emerge.
    """

    # Identity
    name: str
    tagline: Optional[str] = None            # ~80 chars, used in card view
    description: Optional[str] = None        # longer, used on artifact page
    author: Optional[str] = None             # GitHub username
    repo: str                                # GitHub repo URL — required (https://github.com/...)
    version: Optional[str] = None            # semver if provided
    compose_file: str = "docker-compose.yml" # path within repo

    # Compatibility
    os_compatibility: list[OS] = [OS.linux, OS.mac, OS.windows]
    hardware: Optional[Hardware] = None

    # Discovery
    category: list[Category] = []
    tags: list[str] = []                     # freeform technical tags
    difficulty: Optional[Difficulty] = None

    # Cost
    cost: Optional[Cost] = None

    # Technical
    apis_required: list[str] = []           # e.g. ["anthropic", "gmail"]
    env: list[EnvVar] = []
    services: list[Service] = []            # containers in the compose stack

    # Media
    media: Optional[Media] = None

    # Model card
    model_card: Optional[ModelCard] = None

    @field_validator("repo")
    @classmethod
    def validate_repo_url(cls, v: str) -> str:
        if not v.startswith("https://"):
            raise ValueError("repo must be a full https:// URL")
        return v

    @field_validator("version")
    @classmethod
    def validate_semver(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        if not re.match(r"^\d+\.\d+\.\d+$", v):
            raise ValueError(
                f"version must be semver format e.g. 1.0.0, got: {v}"
            )
        return v
