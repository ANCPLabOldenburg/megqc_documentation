# What is MEGqc?

## MEG data quality control
Magnetoencephalography (MEG) data is susceptible to  noise and artifacts, which can severely corrupt the data quality. These artifacts may arise from:
- Environmental noise sources (e.g. powerline noise)
- Internal noise sources (e.g. eye movements of the subject)
- Systemic noise sources (e.g. malfunction of a sensor).

For this reason, quality control of MEG data is an essential step for ensuring valid and reproducible science (Niso et al., 2022). However, the detection and annotation of artifacts in MEG data is commonly performed manually (visual inspection), requires expertise and can be a tedious and time-consuming task. Also, as there's not a standardized procedure, it's vulnerable to biases.

<img src="https://media1.tenor.com/m/DCycRQnBpOYAAAAd/math-hmm.gif" alt="maths" width="250px">

<br>  
To address this issue, the ANCP lab developed **MEGqc**, a software tool for automated and standardized quality control of MEG recordings. By providing a standardized workflow, it helps minimize human bias and facilitates comparisosn between datasets. MEGqc **evaluates** the quality of raw data, but it is **not** an artifact removal tool.

The MEGqc pipeline is designed to be user-friendly, so researches only need to:
- Provide data for evaluation
- Set analysis parameters if desired (default parameters are available), and 
- Run the analysis script.

To ensure standardization of the pipeline, MEGqc software is tailored to the [**BIDS standards**](../extra/bids.md).


## Metrics in MEGqc
The different calculation modules within MEGqc are called `metrics` and they are used to evaluate specific types of artifacts or aspects of data quality. There are six independent metrics:
- **Standard Deviation calculation**
- **Power Spectral Density calculation**
- **Peak-to-Peak manual calculation**
- **ECG (Electrocardiogram)and EOG (Electrooculography) calculation:** it produces 2 reports
- **Muscle artifacts calculation**
<br>  

To ensure the clarity of the results, MEGqc will provide you with a detailed visual HTML report for each Metric. MEGqc will also provide you with machine-readable outputs (**JSON files** and **TSV files**). The next section will delve in the kind of information included within each report. 



```{admonition} There are 2 other metrics within MEG QC:

* **Peak-to-Peak automatic calculation:** This module, which relies on MNE library functions, is not used in the final version of the pipeline. Instead, the manual "Peak-to-Peak manual" is recommended.
* **Head movement calculation:** This module estimates subject's head movements. These movements may appear as sudden shifts or jumps in the MEG data, causing distortions in the spatial distribution of the recorded magnetic fields. The effects of head movements can vary depending on the strength and direction. This module is implemented but requires a substantial amount of information to perform the calculation.

``` 


## Next section
In the next section, we'll walk through the content of the HTML reports.
For a deeper understanding of MEGqc's core functionality, dependencies and derivatives, [visit the pipeline basics page](../extra/details.md).


        
