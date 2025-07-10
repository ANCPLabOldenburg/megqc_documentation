# What is MEGqc?

## MEG data quality control
Magnetoencephalography (MEG) data is susceptible to  noise and artifacts, which can severely corrupt the data quality. These artifacts may arise from:
- Environmental noise sources (e.g. powerline noise).
- Internal noise sources (e.g. eye movements of the subject).
- Systemic noise sources (e.g. malfunction of a sensor).

<img src="../static/sources.png" alt="noise-sources" width="200px" align="center">

<br>

For this reason, quality control of MEG data is an essential step for ensuring valid and reproducible science (Niso et al., 2022). However, the detection and annotation of artifacts in MEG data is commonly performed manually (visual inspection), requires expertise and can be a tedious and time-consuming task. Also, as there's not a standardized procedure, it's vulnerable to biases.

## MEGqc
To address this issue, the [ANCP Lab](https://uol.de/en/applied-neurocognitive-psychology) developed MEGqc, a software tool for automated and standardized quality control of MEG recordings. By providing a standardized workflow, it helps minimize human bias and facilitates comparisosn between datasets. **MEGqc evaluates the quality of raw data, but it is not an artifact removal tool.**

The MEGqc pipeline can be used in two ways: via a `command-line interface (CLI)` or a `graphical user interface (GUI)` (this documentation covers the [installation](./installation) and [tutorial](./tutorial) for both options).
* The **CLI** is recommended for developers or advanced users.
* The **GUI** is ideal for beginners or users who prefer a more visual interface.

## Metrics in MEGqc
The different calculation modules within MEGqc are called `metrics` and they are used to evaluate specific types of artifacts or aspects of data quality. The outputs of the `calculation module` are provided as machine-readable outputs (**JSON files** and **TSV files**), which are used by the `plotting module` to generate detailed visual HTML reports of each metric. There are six independent metrics, and this documentation will cover each of their HTML reports. The 6 metrics can be grouped as:

1. **Channel Quality Metrics**
   
   - **Standard Deviation (STD) of the Data:** Measures the variability of each channel. Channels with unusual high or low STD compared to others, might indicate very noisy or flat channels. [Link to the report](../report/std.md).
   - **Peak-to-Peak (PtP) Amplitude (manual calculation):** Calculates the difference between maximun and minimun amplitude in a signal. It provides a measure of the total range of variation of the data across the sensors, and can help identify abnormal channels. [Link to the report](../report/ptp.md).


2. **Physiological Artifact Correlation**
   
   - **Electrocardiogram (ECG):** Detects correlated noise caused by cardiac activity. [Link to the report](../report/ecg.md).
   - **Electrooculography (EOG):** Detects correlated noise caused by eye movements. [Link to the report](../report/eog.md).

3. **Muscle Artifacts**
   
   - **Muscle Artifacts calculation:** Identifies high-frequency bursts from body movements, for example, when the subject clenches their jaw. [Link to the report](../report/muscle.md).

4. **Frequency Domain Assessment**
   
   - **Power Spectral Density (PSD):** It provides information on the strength of different frequency components of a signal. PSD calculation helps us to distinguish between brain activity and non-brain-related noise, for example, line noise. [Link to the report](../report/psd.md).

<br>  


```{admonition} There are 2 other metrics within MEGqc
:class: dropdown

* **Peak-to-Peak automatic calculation:** This module, which relies on MNE library functions, is not used in the final version of the pipeline. Instead, the "manual calculation" is recommended.
* **Head movement calculation:** This module estimates subject's head movements. These movements may appear as sudden shifts or jumps in the MEG data, causing distortions in the spatial distribution of the recorded magnetic fields. The effects of head movements can vary depending on the strength and direction. This module is implemented but requires a substantial amount of information to perform the calculation.

``` 


## Next section
In the next section, we'll walk through the content of the HTML reports.
For a deeper understanding of MEGqc's core functionality, dependencies and derivatives, [visit the pipeline basics page](../extra/details.md).


        
