## What does this PR do?

<!-- One paragraph summary -->

## Type of change

- [ ] New artifact submission
- [ ] Artifact update (fix, version bump, documentation)
- [ ] Schema change (backwards compatible)
- [ ] Schema change (breaking — requires migration plan)
- [ ] Web frontend improvement
- [ ] CI / tooling improvement
- [ ] Documentation

## For new artifact submissions

- [ ] `marketplace.json` exists at the root of the linked repo
- [ ] `docker-compose.yml` exists and works
- [ ] `.env.example` lists all required variables
- [ ] CI validation passes
- [ ] Model card includes privacy field explaining what data leaves the user's machine

## For schema changes

- [ ] Existing artifacts still pass `python validate.py`
- [ ] `build_index.py` still runs without errors
- [ ] Schema version comment updated in `schema.py` if breaking

## Testing

<!-- How did you verify this works? -->
