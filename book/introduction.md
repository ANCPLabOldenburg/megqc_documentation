# What is MEGqc?

## MEG data quality control
Magnetoencephalography (MEG) data is susceptible to noise and artifacts, which can severely corrupt the data quality. These artifacts may arise from:
- Channel variability (e.g. malfunction of a sensor, flat and noisy channels).
- Muscle and internal noise sources (e.g. jaw movements, eye-blinks and cardiac rhythm of the subject).
- Environmental noise sources (e.g. powerline noise).

<img src="../static/sources.png" alt="noise-source" width="300px" align="center">

For this reason, quality control of MEG data is an essential step for ensuring valid and reproducible science (Niso et al., 2022). However, the detection and annotation of artifacts in MEG data is commonly performed manually (visual inspection), requires expertise and can be a tedious and time-consuming task, and it's not scalable for big datasets (> 200 subjects). Also, as there's not a standardized procedure, it's vulnerable to biases. 

## MEGqc
To address this issue, the [ANCP Lab](https://uol.de/en/applied-neurocognitive-psychology) developed MEGqc, a software tool for automated and standardized quality control of MEG recordings. By providing a standardized workflow, it helps minimize human bias and facilitates comparison between datasets. **MEGqc evaluates the quality of raw data, but it is not an artifact removal tool.** 

MEGqc follows a **QA-first approach**: it first profiles signal quality across multiple metrics (Quality Assessment, QA) and then provides an explicit Quality Control (QC) summarization through the [Global Quality Index (GQI)](../extra/gqi.md).

MEGqc provides two installation pathways: **installer-based installation** and **CLI-based installation**. After installation, both CLI and GUI execution workflows are documented in [Installation](./installation.md) and [Tutorial](./tutorial.md).

### MEGqc has 3 main modules:
- **Calculation Module:** It gives you machine-readable outputs (JSON files and TSV files) for every subject and selected `metric`. There are 7 independent `metrics` that evaluate specific types of artifacts.
- **Plotting Module:** It generates detailed visual HTML reports at multiple scales — from subject-level reports to dataset-level group analyses and multi-sample comparisons.
- **GQI Module:** It computes (or re-computes) the [Global Quality Index](../extra/gqi.md), a single overall estimate of data quality for each subject.

### Report types
MEGqc generates **5 types of reports** at different scales:

1. **QA Subject Report:** Detailed per-subject HTML report with interactive figures for every selected metric.
2. **QA Group Report:** Dataset-level summary report that aggregates QA metrics across all subjects in a dataset.
3. **QA Multisample Report:** Cross-dataset comparison report (requires 2 or more datasets).
4. **QC Group Report:** Dataset-level report based on the Global Quality Index (GQI), showing quality scores and penalty breakdowns.
5. **QC Multisample Report:** Cross-dataset QC comparison (requires 2 or more datasets).

## Metrics in MEGqc
The different calculation modules within MEGqc are called `metrics` and they are used to evaluate specific types of artifacts. There are seven independent metrics grouped by the source of the noise:

1. **Channel Variability**
   
   - **Standard Deviation (STD) of the Data:** Measures the variability of each channel. Channels with unusual high or low STD compared to others, might indicate very noisy or flat channels. [Link to the report](../report/std.md).
   - **Peak-to-Peak (PtP) Amplitude (manual calculation):** It provides a measure of the total range of variation of the data across the sensors, and can help identify abnormal channels. [Link to the report](../report/ptp.md).


2. **Physiological Artifact Correlation**
   
   - **Electrocardiogram (ECG):** Detects correlated noise caused by cardiac activity. [Link to the report](../report/ecg.md).
   - **Electrooculography (EOG):** Detects correlated noise caused by eye movements. [Link to the report](../report/eog.md).

3. **Muscle Artifacts:** Identifies high-frequency bursts from body movements, for example, when the subject clenches their jaw. [Link to the report](../report/muscle.md).

4. **Power Spectral Density (PSD) Assessment:** It provides information on the strength of different frequency components of a signal. PSD calculation helps us to distinguish between brain activity and non-brain-related noise, for example, line noise or environmental noise. [Link to the report](../report/psd.md).

5. **Head Position and Movement:** Evaluates head movement during the recording using continuous head position indicator (cHPI) data. Disabled by default because cHPI data is not always available. [Link to the report](../report/head.md).

## Next section
In the next section, we'll walk through the content of the HTML reports.
For a deeper understanding of MEGqc's core functionality, dependencies and derivatives or what are BIDS, please follow [this link](./extra.md).
