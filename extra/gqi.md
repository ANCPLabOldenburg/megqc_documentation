# Global Quality Index (GQI)

Global Quality Index (GQI) is the QC aggregation layer in MEGqc. It converts multiple QC burden indicators into one score per row (typically subject × task).

## Storage and attempts

GQI is versioned by attempt.

Output table:

- `Global_Quality_Index_attempt_<n>.tsv`

Output roots:

- legacy mode: `derivatives/Meg_QC/summary_reports/group_metrics/`
- profile mode: `derivatives/Meg_QC/profiles/<analysis_id>/summary_reports/group_metrics/`

Each recomputation increments `<n>` and preserves previous attempts.

Matching config snapshot per attempt:

- `summary_reports/config/global_quality_index_<n>.ini`

## Inputs used by GQI

GQI is computed from `SimpleMetrics` outputs and summarized into four penalty families:

1. **Channel variability burden (`ch`)** from STD and PtP channel-level noisy/flat percentages.
2. **Correlation burden (`corr`)** from ECG/EOG high-correlation channel percentages.
3. **Muscle burden (`mus`)** from muscle event ratio.
4. **PSD burden (`psd`)** from estimated spectral noise contribution.

## Default threshold and weight parameters

Current defaults (from `settings.ini`):

| Family | Parameter | Start | End | Weight |
|---|---|---:|---:|---:|
| `ch` (bad channels) | `bad_ch_*` | 0 | 100 | 35 |
| `corr` (ECG/EOG correlation) | `correlation_*` | 0 | 100 | 30 |
| `mus` (muscle) | `muscle_*` | 0 | 0.0001 | 15 |
| `psd` (PSD noise) | `psd_noise_*` | 0 | 100 | 20 |

**Note:** Weights are expressed as integers that sum to 100 and are automatically normalized internally. The `corr` weight is split between ECG and EOG when both are enabled.

## Quality transform per family

For burden value `M`, with start/end thresholds:

- if `M <= start`, quality `q(M) = 1.0`
- if `M >= end`, quality `q(M) = 0.0`
- otherwise linear interpolation:

`q(M) = 1 - (M - start) / (end - start)`

This creates a piecewise-linear quality score from 0 to 1.

## Final GQI score

Let `q_ch`, `q_corr_ecg`, `q_corr_eog`, `q_mus`, `q_psd` be family quality scores and `w_*` their weights.

Weighted score:

`GQI = 100 * (w_ch*q_ch + w_ecg*q_corr_ecg + w_eog*q_corr_eog + w_mus*q_mus + w_psd*q_psd) / sum(weights_used)`

If ECG/EOG are disabled or unavailable, active weights are renormalized by `sum(weights_used)`.

## Penalty decomposition

Penalty terms are reported to explain score reduction:

- `GQI_penalty_ch`
- `GQI_penalty_corr`
- `GQI_penalty_mus`
- `GQI_penalty_psd`

Each penalty is proportional to `(1 - q_family)` and the corresponding weight.

## Special handling rules

- If ECG/EOG description indicates noisy/invalid reference channels, correlation quality can be clamped to a fallback value (`q=0.5`) rather than computed from percentages.
- If a family metric is missing, default quality for that family is `1.0` but only active weights contribute to normalization.
- GQI can be disabled via config (`compute_gqi=False`), while summary artifacts are still generated.

## Main columns in `Global_Quality_Index_attempt_<n>.tsv`

Common columns include:

- identifiers: `task`, `subject`
- global score: `GQI`
- penalty columns: `GQI_penalty_*`
- component percentages: `GQI_std_pct`, `GQI_ptp_pct`, `GQI_ecg_pct`, `GQI_eog_pct`, `GQI_muscle_pct`, `GQI_psd_noise_pct`
- component burden columns used by QC Group (STD/PtP/PSD/ECG/EOG/Muscle)

## Recommended sensitivity-analysis workflow

1. Keep calculation derivatives fixed.
2. Modify only `GlobalQualityIndex` parameters in settings.
3. Re-run `globalqualityindex` to create a new attempt.
4. Compare attempts in QC Group reports (`--attempt <n>`).

This isolates QC-threshold effects without recomputing raw metrics.

## Recompute commands

### CLI

```bash
globalqualityindex --inputdata /path/to/dataset
```

Profile-aware example:

```bash
globalqualityindex \
  --inputdata /path/to/dataset \
  --analysis_mode reuse \
  --analysis_id qa_pass_01
```

### GUI

Use **Run GQI** in the **QA/QC calculation** tab.

### Programmatic

Use `run_gqi_dispatch(...)` as shown in [Programmatic tutorial](../tutorial/programmatic.md).

## Output files

After running GQI, you will find:

1. **TSV table:** `Global_Quality_Index_attempt_<n>.tsv` containing per-subject/task GQI scores and component breakdowns
2. **Config snapshot:** `global_quality_index_<n>.ini` preserving the exact parameters used for that attempt

These files enable reproducible QC workflows and attempt-by-attempt comparison in QC Group reports.

```{admonition} Want to check more extra content?
:class: tip

Head back to the [main extra content page](../book/extra.md).

```
