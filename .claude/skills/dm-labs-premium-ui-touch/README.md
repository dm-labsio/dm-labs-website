# dm-labs-premium-ui-touch

DM Labs' UI polish kit for Claude Code: animation, interaction, mobile-feel
and RTL rules for client websites, packaged as one skill.

## What's inside

- `SKILL.md` — the entry point. It tells Claude which guide to read for the
  task and adds the DM Labs house rules on top.
- `guides/` — 14 design-engineering guides by Emil Kowalski
  ([emilkowalski/skills](https://github.com/emilkowalski/skills), MIT,
  vendored at commit `e8a175d`, 2026-10-02). Each upstream `SKILL.md` was
  renamed to `GUIDE.md` so tools don't list them as 14 separate skills;
  the content is otherwise unchanged.

## Using it in this repo

Nothing to do. Claude Code loads `.claude/skills/` automatically. Ask for a
polish pass, an animation review, or type `/dm-labs-premium-ui-touch`.

## Using it in another DM Labs repo

From the root of that repo:

```bash
npx skills add dm-labsio/dm-labs-website --skill dm-labs-premium-ui-touch -a claude-code -y
```

This copies the skill into that repo's `.claude/skills/`. Commit it there so
every session (local or cloud) has it. The source repo is private, so the
machine running the command needs GitHub access to `dm-labsio`.

To update a repo later, run the same command again.

## Updating the guides from upstream

```bash
git clone --depth 1 https://github.com/emilkowalski/skills /tmp/emil-skills
# copy /tmp/emil-skills/skills/* over guides/, rename each SKILL.md to GUIDE.md,
# refresh guides/LICENSE and guides/performance-cheatsheet.md,
# and update the commit hash above.
```

Check `SKILL.md`'s routing table still matches the guide list afterwards.
