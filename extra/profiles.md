# Analysis Profiles

Analysis profiles let you store multiple MEGqc runs for the same dataset without overwriting derivatives. This is useful for sensitivity checks (for example, different filtering, epoching, or threshold choices).

## Profile layout

Legacy layout:

```text
derivatives/Meg_QC/calculation/
derivatives/Meg_QC/reports/
derivatives/Meg_QC/summary_reports/
```

Profile layout:

```text
derivatives/Meg_QC/profiles/<analysis_id>/calculation/
derivatives/Meg_QC/profiles/<analysis_id>/reports/
derivatives/Meg_QC/profiles/<analysis_id>/summary_reports/
```

## Modes (`--analysis_mode`)

| Mode | Behavior |
|---|---|
| `legacy` | Classic non-profile path under `derivatives/Meg_QC/`. |
| `new` | Create/use a profile. If no `analysis_id` is provided during calculation, one is generated automatically. |
| `reuse` | Use an existing profile; requires `analysis_id`. |
| `latest` | Resolve the most recently modified profile automatically. |

## CLI examples

```bash
# New profile with auto-generated ID
run-megqc --inputdata /path/to/dataset --analysis_mode new

# New/reused explicit profile ID
run-megqc --inputdata /path/to/dataset --analysis_mode new --analysis_id v2_filtering

# Reuse existing profile
run-megqc --inputdata /path/to/dataset --analysis_mode reuse --analysis_id v2_filtering

# Plot from latest profile
run-megqc-plotting --inputdata /path/to/dataset --qa-group --analysis_mode latest
```

## GUI workflow

In the **Inputs** section of the GUI:

- choose profile mode,
- set or load profile ID,
- refresh available profiles,
- apply policy controls for existing settings and previously processed subjects.

<img src="../static/gui/gui_main_light.png" alt="GUI profile controls are in Inputs" width="760px">

## Multi-dataset behavior

For multi-dataset runs in `new` mode, MEGqc uses one shared `analysis_id` across datasets in the same run so cross-dataset plotting can target the same profile namespace.

## Related policies

- `--existing_config_policy {provided,latest_saved,fail}`
- `--processed_subjects_policy {skip,rerun,fail}`

These define how re-runs behave inside the selected profile.

```{admonition} Want to check more extra content?
:class: tip

Head back to the [main extra content page](../book/extra.md) to explore the others.

```
