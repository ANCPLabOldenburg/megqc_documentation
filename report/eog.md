# EOG: Ocular Contamination

EOG views quantify coupling between ocular reference activity and MEG channels.

For execution steps, see [Tutorial](../book/tutorial.md).

## Subject-report EOG views

| View | Encoding | What it reveals |
|---|---|---|
| EOG quality overview | reference-channel diagnostics | whether blink/eye coupling analysis is reliable |
| Raw EOG recording | reference time series context | blink quality and reference noise |
| Mean blink template | averaged blink waveform | blink event consistency |
| EOG topomap | ocular burden over sensor layout | spatial spread of eye-movement contamination |
| Affected-channel ranking | channels ranked by ocular coupling | strongest vs weakest ocular contamination |

### 1) EOG quality overview

<img src="../static/05_EOG/01_eog_overview.png" alt="EOG overview" width="560px">

### 2) Raw EOG recording

<img src="../static/05_EOG/07_eog_recording.png" alt="EOG recording" width="860px">

### 3) Mean blink template

<img src="../static/05_EOG/04_eog_mean_blink_signal.png" alt="Mean blink" width="860px">

### 4) EOG contamination topomap

<img src="../static/05_EOG/03_eog_contamination_topomap.png" alt="EOG topomap" width="800px">

### 5) Channel ranking by contamination

<img src="../static/05_EOG/02_eog_most_affected_channels.png" alt="Most affected EOG channels" width="860px">

<img src="../static/05_EOG/05_eog_moderately_affected_channels.png" alt="Moderately affected EOG channels" width="860px">

<img src="../static/05_EOG/06_eog_least_affected_channels.png" alt="Least affected EOG channels" width="860px">

## EOG in QC summary

`QC summary -> EOG` reports affected-channel counts and percentages (task/run-matched through GQI rows when available).

## QC implications

- broad high coupling suggests strong blink/ocular burden,
- anteriorly concentrated maps are common but still quantify burden for thresholding,
- combine with task timing and behavior context before exclusion decisions.

EOG contamination typically shows strongest effects in frontal sensors. The QC summary provides affected-channel counts and percentages matched to GQI rows when available.
