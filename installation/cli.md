# CLI Installation Guide

This section covers installation and verification for the command-line interface (CLI) of MEGqc.

## Recommended workflow: Conda + Python 3.10

MEGqc is validated for **Python 3.10**. The most robust CLI setup is to create a dedicated Conda environment pinned to Python 3.10, then install MEGqc with `pip` inside that environment.

## 1. Create a fresh environment

```bash
# Optional once per machine: initialize your shell for conda
conda init zsh   # use bash/powershell as needed
# restart terminal after conda init

# Create dedicated environment with Python 3.10
conda create -n megqc-py310 python=3.10 pip -y

# Activate
conda activate megqc-py310

# Verify Python version
python --version
# Expected: Python 3.10.x
```

## 2. Install MEGqc

```bash
python -m pip install --upgrade pip
pip install meg-qc
```

```{admonition} Dependencies
:class: tip

You do **not** need to install dependencies manually. Installing `meg-qc` from PyPI installs required dependencies automatically.

```

## 3. Verify CLI entry points

```bash
run-megqc --help
run-megqc-plotting --help
globalqualityindex --help
get-megqc-config --help
```

If you also want to launch the GUI from the same environment:

```bash
megqc
```

## 4. Upgrade / uninstall

```bash
# Upgrade MEGqc in the same environment
pip install --upgrade meg-qc

# Uninstall package only
pip uninstall meg-qc

# Remove whole environment (optional)
conda deactivate
conda env remove -n megqc-py310
```

## Optional: export environment spec

```bash
conda env export --from-history > megqc-py310.yml
```

## Troubleshooting

- If `python --version` is not `3.10.x`, recreate the environment with `python=3.10`.
- If commands are not found, confirm the environment is active (`conda activate megqc-py310`).
- If installation fails due to old pip metadata, run `python -m pip install --upgrade pip setuptools wheel` and retry.

## Next section

Continue to the tutorial section to run calculation, plotting, and GQI workflows:

- [Calculation Module (GUI)](../tutorial/calc_gui.md)
- [Plotting Module (GUI)](../tutorial/plot_gui.md)
- [GQI Module (GUI)](../tutorial/gqi_gui.md)
- [Calculation Module (CLI)](../tutorial/calc_cli.md)
- [Plotting Module (CLI)](../tutorial/plot_cli.md)
