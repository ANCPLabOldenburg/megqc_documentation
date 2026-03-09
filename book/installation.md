# Installation Guide

MEGqc supports two installation pathways:

1. **Installer-based installation** (recommended for most users)
2. **CLI-based installation** (Conda + pip, recommended for advanced users)

## 1. Installer-based installation

Use this pathway if you want a ready-to-run setup with minimal manual environment management.

- Page: [Installer-based installation](../installation/gui.md)
- What it does: provisions Python 3.10, creates a virtual environment, installs MEGqc, and creates launch/uninstall shortcuts.

## 2. CLI-based installation

Use this pathway when you need terminal-first workflows, scripting, or reproducible environment setup under Conda.

- Page: [CLI-based installation](../installation/cli.md)
- Recommended baseline: Python 3.10 in a dedicated Conda environment.

## Installed commands

After installation, these entry points are available in the active environment:

| Command | Purpose |
|---|---|
| `megqc` | Launch GUI |
| `run-megqc` | Calculation module |
| `run-megqc-plotting` | Plotting module |
| `globalqualityindex` | GQI recomputation |
| `get-megqc-config` | Export default `settings.ini` |

For usage and examples, go to the [Tutorial](./tutorial.md).
