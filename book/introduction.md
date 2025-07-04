# What is MEGqc?

## MEG data quality control
Magnetoencephalography (MEG) data is susceptible to  noise and artifacts, which can severely corrupt the data quality. These artifacts may arise from:
- Environmental noise sources (e.g. powerline noise).
- Internal noise sources (e.g. eye movements of the subject).
- Systemic noise sources (e.g. malfunction of a sensor).

<img src="../static/sources.png" alt="noise-sources" width="200px" align="left">


For this reason, quality control of MEG data is an essential step for ensuring valid and reproducible science (Niso et al., 2022). However, the detection and annotation of artifacts in MEG data is commonly performed manually (visual inspection), requires expertise and can be a tedious and time-consuming task. Also, as there's not a standardized procedure, it's vulnerable to biases.

## MEGqc
To address this issue, the ANCP lab developed **MEGqc**, a software tool for automated and standardized quality control of MEG recordings.  By providing a standardized workflow, it helps minimize human bias and facilitates comparisosn between datasets. MEGqc **evaluates** the quality of raw data, but it is **not** an artifact removal tool. 

The MEGqc pipeline can be used in two ways: via a **command-line interface (CLI)** or a **graphical user interface (GUI)** (this documentation covers the [installation](./installation) and [tutorial](./tutorial) for both options).
* The **CLI** is recommended for developers or advanced users.
* The **GUI** is ideal for beginners or users who prefer a more visual interface.

Regardless, MEGqc is designed to be user-friendly. To run the analysis, the user just needs to:
- Provide data for evaluation (in case you don't have a BIDS compliant MEG dataset, [here’s how to download one from OpenNeuro](../extra/openneuro)).
- Set analysis parameters if desired (default parameters are available).
- Run the analysis.

To ensure standardization of the pipeline, MEGqc software is tailored to the [**BIDS standards**](../extra/bids.md).

## Metrics in MEGqc
The different calculation modules within MEGqc are called `metrics` and they are used to evaluate specific types of artifacts or aspects of data quality. MEGqc provides you with machine-readable outputs (**JSON files** and **TSV files**), and, to ensure clarity, MEGqc generates detailed visual HTML reports for each Metric. There are six independent metrics, and this documentation will cover each of their HTML reports:

1. [Standard Deviation of the Data](../report/std.md)
2. [Power Spectral Density](../report/psd.md)
3. [Peal-to-Peak (manual calculation)](../report/ptp.md)
4. [ECG (Electrocardiogram) calculation](../report/ecg.md)
5. [EOG (Electrooculography) calculation](../report/eog.md)
6. [Muscle Artifacts calculation](../report/muscle.md)

<br>  




```{admonition} There are 2 other metrics within MEGqc
:class: dropdown

* **Peak-to-Peak automatic calculation:** This module, which relies on MNE library functions, is not used in the final version of the pipeline. Instead, the manual "Peak-to-Peak manual" is recommended.
* **Head movement calculation:** This module estimates subject's head movements. These movements may appear as sudden shifts or jumps in the MEG data, causing distortions in the spatial distribution of the recorded magnetic fields. The effects of head movements can vary depending on the strength and direction. This module is implemented but requires a substantial amount of information to perform the calculation.

``` 


## Next section
In the next section, we'll walk through the content of the HTML reports.
For a deeper understanding of MEGqc's core functionality, dependencies and derivatives, [visit the pipeline basics page](../extra/details.md).


        
