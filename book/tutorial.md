# Tutorial

This section explains how to run MEGqc in three ways:

1. **GUI workflows**
2. **CLI workflows**
3. **Programmatic Python workflows**

It covers three operational modules:

- **Calculation** (derivatives generation)
- **Plotting** (HTML report generation)
- **GQI recomputation** (attempt-based QC summaries)

## Recommended execution order

0. Export editable config(s) with `get-megqc-config`.
1. Run **Calculation**.
2. Run **Plotting**.
3. Re-run **GQI** only when QC settings change and raw metric recomputation is not needed.

## GUI tutorials

- [Calculation (GUI)](../tutorial/calc_gui.md)
- [Plotting (GUI)](../tutorial/plot_gui.md)
- [GQI (GUI)](../tutorial/gqi_gui.md)

## CLI tutorials

- [Calculation (CLI)](../tutorial/calc_cli.md)
- [Plotting (CLI)](../tutorial/plot_cli.md)

## Programmatic tutorial

- [Programmatic execution (Python)](../tutorial/programmatic.md)

```{admonition} Advanced reference
:class: tip

For full execution semantics (profiles, policies, dispatchers), see the [Analysis Profiles](../extra/profiles.md) and [Pipeline Details](../extra/details.md) pages.

```
