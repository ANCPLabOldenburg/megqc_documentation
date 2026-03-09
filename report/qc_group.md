# QC Group Report

QC Group reports provide a dataset-level quality control summary centered on the **Global Quality Index (GQI)**. They visualize how individual recordings compare across multiple QC components and help identify outliers that may need attention.

For execution instructions, see the [Tutorial](../book/tutorial.md).

## What QC Group Reports Show

The QC Group report answers the question: **"How do recordings in this dataset rank by quality, and what drives the differences?"**

Unlike QA reports (which profile raw signal characteristics), QC reports summarize **quality decisions** based on configurable thresholds. The GQI score (0-100%) provides a single quality estimate per recording, while component breakdowns explain which factors contribute to lower scores.

## Input and Attempt Selection

QC Group reads GQI results from attempt-indexed TSV files:

```
summary_reports/group_metrics/Global_Quality_Index_attempt_<n>.tsv
```

**Attempt resolution order:**

1. Explicit `--input_tsv` path (if provided)
2. Explicit `--attempt <n>` number
3. Latest available attempt (default)

Each attempt has a matching configuration snapshot:

```
summary_reports/config/global_quality_index_<n>.ini
```

This enables comparing how different GQI threshold settings affect quality rankings without re-running the full calculation pipeline.

## Navigation Structure

The QC Group report uses a two-level tab hierarchy:

```
Top tabs: Combined (mag+grad) | MAG | GRAD
  └── Metric tabs: GQI | STD | PtP | PSD | ECG | EOG | Muscle
```

### Top-Level Channel Type Tabs

| Tab | Content |
|-----|---------|
| `Combined (mag+grad)` | Aggregated view across all channel types |
| `MAG` | Magnetometer-specific QC components |
| `GRAD` | Gradiometer-specific QC components |

### Metric Tabs

Each metric tab shows distribution plots and ranking tables for its QC components:

| Metric Tab | Components Shown |
|------------|------------------|
| **GQI** | Global Quality Index score, total penalties, penalty breakdown by family (ch, corr, mus, psd), component percentages |
| **STD** | Noisy/flat channel percentages, noisy/flat epoch percentages |
| **PtP** | Noisy/flat channel percentages, noisy/flat epoch percentages |
| **PSD** | PSD noise burden percentage |
| **ECG** | High-correlation channel percentage |
| **EOG** | High-correlation channel percentage |
| **Muscle** | Event count, event rate, GQI muscle component |

## Understanding the GQI Tab

The GQI tab is the primary triage interface. It shows:

1. **Global score distribution** - Histogram/density of GQI scores across all recordings
2. **Penalty decomposition** - How much each penalty family contributes to score reduction
3. **Ranking table** - Recordings sorted by GQI score with penalty breakdowns

### Interpreting GQI Scores

| Score Range | Interpretation |
|-------------|----------------|
| 90-100% | Excellent quality, minimal artifacts |
| 70-89% | Good quality, some artifacts present |
| 50-69% | Moderate quality, notable artifact burden |
| Below 50% | Poor quality, significant issues |

### Penalty Families

The GQI score is reduced by four penalty families:

- **`ch` (Channel variability):** Penalizes recordings with high percentages of noisy or flat channels
- **`corr` (Correlation):** Penalizes recordings with high ECG/EOG contamination
- **`mus` (Muscle):** Penalizes recordings with frequent muscle artifacts
- **`psd` (PSD noise):** Penalizes recordings with high spectral noise burden

## Understanding Component Tabs

Each component tab (STD, PtP, PSD, ECG, EOG, Muscle) provides detailed views of that specific quality metric:

### Distribution Plots

- **Violin/box plots:** Show the spread of values across recordings
- **Density plots:** Reveal clustering and outlier patterns
- **Subject markers:** Individual recordings shown as points for identification

### Ranking Tables

- Recordings sorted by component value (worst first)
- Hover information shows full recording identifiers
- Helps quickly identify which recordings drive group-level patterns

## How to Interpret QC Group Reports

**Recommended workflow:**

1. **Start with the GQI tab** - Get an overview of quality distribution and identify low-scoring recordings
2. **Check penalty breakdown** - Determine which penalty families drive low scores
3. **Open component tabs** - Investigate specific metrics (e.g., if `ch` penalty is high, check STD/PtP tabs)
4. **Compare channel types** - Switch between MAG/GRAD to see if issues are sensor-type specific
5. **Track attempts** - If you've run multiple GQI attempts with different thresholds, compare how rankings change

## Notes on Combined View

The `Combined (mag+grad)` tab provides a unified overview but requires careful interpretation:

- **Unit mixing:** Amplitude-based metrics combine pT (MAG) and pT/m (GRAD) values
- **Best for:** Quick triage and identifying recordings with issues in either channel type
- **Validate in:** MAG and GRAD tabs for unit-specific interpretation

## Practical Example

Suppose you see a recording with GQI = 62% and high `ch` penalty:

1. Open the **STD tab** → Check if noisy channel % is elevated
2. Open the **PtP tab** → Check if there are transient amplitude issues
3. Switch to **MAG** vs **GRAD** → Determine if the problem is sensor-type specific
4. Return to QA Subject report for that recording → Inspect the actual channel×epoch heatmaps

This drill-down approach helps you understand not just *that* a recording has issues, but *why* and *where*.

