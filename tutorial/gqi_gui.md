# GQI Module (GUI)

GQI recomputation updates attempt-indexed QC summaries from existing derivatives.

## Step 1: Select inputs and profile mode

In **Inputs**:

- add one or multiple datasets,
- select profile mode (`legacy/new/reuse/latest`),
- choose settings profile(s) that contain `GlobalQualityIndex` parameters.

## Step 2: Run GQI

In **QA/QC calculation** tab click **Run GQI**.

Use **Stop GQI** to interrupt.

## Step 3: Inspect outputs

Each run creates a new attempt TSV under:

- legacy: `derivatives/Meg_QC/summary_reports/group_metrics/`
- profile: `derivatives/Meg_QC/profiles/<analysis_id>/summary_reports/group_metrics/`

Example filename:

- `Global_Quality_Index_attempt_<n>.tsv`

## Step 4: Visualize attempt

Use plotting mode **QC Group** and select `attempt` (or `auto`) to render that attempt.
