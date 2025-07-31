# What is MEGqc?

## MEG data quality control
Magnetoencephalography (MEG) data is susceptible to  noise and artifacts, which can severely corrupt the data quality. These artifacts may arise from:
- Channel variability (e.g. malfunction of a sensor, flat and noisy channels).
- Muslce and internal noise sources (e.g. jaw movements, eye-blinks and cardiac rythm of the subject).
- Environmental noise sources (e.g. powerline noise).

<img src="../static/sources.png" alt="noise-source" width="300px" align="center">

For this reason, quality control of MEG data is an essential step for ensuring valid and reproducible science (Niso et al., 2022). However, the detection and annotation of artifacts in MEG data is commonly performed manually (visual inspection), requires expertise and can be a tedious and time-consuming task, and it's not scalable for big datasets (> 200 subjects). Also, as there's not a standardized procedure, it's vulnerable to biases. 

## MEGqc
To address this issue, the [ANCP Lab](https://uol.de/en/applied-neurocognitive-psychology) developed MEGqc, a software tool for automated and standardized quality control of MEG recordings. By providing a standardized workflow, it helps minimize human bias and facilitates comparison between datasets. **MEGqc evaluates the quality of raw data, but it is not an artifact removal tool.** 

MEGqc can be used via a **command-line interface (CLI)** or a **graphical user interface (GUI)**. Each of them have different [installation](./installation) and [usage](./tutorial) methods covered by this documentation.

### MEGqc has 2 main modules:
- **Calculation Module:** It gives you machine-readable outputs (JSON files and TSV files) for every subject and selected `metric`. There are 6 independent `metrics` that evaluate specific types of artifacts.
- **Plotting Module:** It generates detailed visual HTML reports for every subject and selected `metric`.

MEGqc generates as well a general **summary reports**, which consist of a JSON file for each subject, a TSV file for the group metrics and a PNG plot for the whole dataset. The summary reports shows the `Global Quality Index (GQI)`, a single overall estimate of data quality for each subject. [Click here if you want to know more about the GQI](../extra/gqi.md).

## Metrics in MEGqc
The different calculation modules within MEGqc are called `metrics` and they are used to evaluate specific types of artifacts. There are six independent metrics grouped by the source of the noise:

1. **Channel Variability**
   
   - **Standard Deviation (STD) of the Data:** Measures the variability of each channel. Channels with unusual high or low STD compared to others, might indicate very noisy or flat channels. [Link to the report](../report/std.md).
   - **Peak-to-Peak (PtP) Amplitude (manual calculation):** It provides a measure of the total range of variation of the data across the sensors, and can help identify abnormal channels. [Link to the report](../report/ptp.md).


2. **Physiological Artifact Correlation**
   
   - **Electrocardiogram (ECG):** Detects correlated noise caused by cardiac activity. [Link to the report](../report/ecg.md).
   - **Electrooculography (EOG):** Detects correlated noise caused by eye movements. [Link to the report](../report/eog.md).

3. **Muscle Artifacts:** Identifies high-frequency bursts from body movements, for example, when the subject clenches their jaw. [Link to the report](../report/muscle.md).

4. **Power Spectral Density (PSD) Assessment:** It provides information on the strength of different frequency components of a signal. PSD calculation helps us to distinguish between brain activity and non-brain-related noise, for example, line noise or environmental noise. [Link to the report](../report/psd.md).
 
<!--

```{admonition} There are 2 other metrics within MEGqc
:class: dropdown

* **Peak-to-Peak automatic calculation:** This module, which relies on MNE library functions, is not used in the final version of the pipeline. Instead, the "manual calculation" is recommended.
* **Head movement calculation:** This module estimates subject's head movements. These movements may appear as sudden shifts or jumps in the MEG data, causing distortions in the spatial distribution of the recorded magnetic fields. The effects of head movements can vary depending on the strength and direction. This module is implemented but requires a substantial amount of information to perform the calculation.

``` 

-->

## Next section
In the next section, we’ll walk through the content of the HTML reports.
For a deeper understanding of MEGqc’s core functionality, dependencies and derivatives or what are BIDS, please follow [this link](./extra).

<!--
In the next section, you'll learn more about the Global Quality Index (GQI), how it is calculated and how to interprate the outcome.
-->


        
