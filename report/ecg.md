# ECG: Cardiac Contamination

ECG views quantify coupling between ECG reference activity and MEG channels.

For execution steps, see [Tutorial](../book/tutorial.md).

## Subject-report ECG views

| View | Encoding | What it reveals |
|---|---|---|
| ECG quality overview | reference-channel diagnostics | whether ECG-driven analysis is reliable |
| Raw ECG recording | time series context | signal quality and heartbeat structure |
| Mean R-wave template | averaged cardiac waveform | template quality used for coupling analysis |
| Affected-channel ranking | channels ordered by coupling magnitude | strongest vs weakest cardiac contamination |
| ECG topomap | coupling burden on sensor layout | spatial distribution of cardiac contamination |

### 1) ECG quality overview

<img src="../static/04_ECG/01_ecg_overview.png" alt="ECG overview" width="560px">

Use this first to verify reference quality before interpreting channel rankings.

### 2) Raw ECG recording

<img src="../static/04_ECG/04_ecg_recording.png" alt="ECG raw recording" width="860px">

Confirms cardiac waveform detectability and obvious corruption.

### 3) Mean R-wave template

<img src="../static/04_ECG/06_ecg_R_mean_wave.png" alt="ECG mean R wave" width="620px">

A clean template indicates stable event-locked cardiac structure.

### 4) Channel ranking by contamination

<img src="../static/04_ECG/02_ecg_most_affected_channels.png" alt="Most affected ECG channels" width="860px">

<img src="../static/04_ECG/03_ecg_medium_affected_channels.png" alt="Mid affected ECG channels" width="860px">

<img src="../static/04_ECG/05_ecg_least_affected.png" alt="Least affected ECG channels" width="620px">

Ranking separates high, medium, and low contamination channel sets.

### 5) ECG contamination topomap

<img src="../static/04_ECG/07_ecg_topomap.png" alt="ECG topomap" width="800px">

Shows spatial concentration of ECG coupling burden.

## ECG in QC summary

`QC summary -> ECG` includes affected-channel counts and percentages (by task/run) derived from GQI task rows when available.

## QC implications

- high affected-channel percentage indicates stronger need for cardiac artifact handling,
- task-specific shifts may indicate condition-dependent contamination sensitivity,
- if reference quality is poor, interpret ECG burden with caution.

ECG contamination patterns are similar for MAG and GRAD channels, though the spatial distribution may differ slightly. The QC summary provides compact metrics for quick assessment across runs.
