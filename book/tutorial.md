# MEGqc tutorial

In this section we will explain you how to run MEGqc in your dataset. MEGqc has two main modules: the **calculation module** and the **plotting module**.
* In the **calculation module** you configure the file paths, specify parameters and execute the calculations.
* The **plotting module** uses the machine-readable outputs (JSON files and TSV files) to generate the [HTML reports](./report).
* There is a third module, the **GQI module**, which allows to re-calculate the GQI with different weight and thresholds parameters without re-running the calculation module.

Each time you run the calculation module or the GQI module, it generates a new `summary reports` folder. This folder contains a summary of metrics and GQI values of your dataset. Every run creates a new summary report folder, stored as a numbered `attempt`.

```{dropdown} Summary Reports content

The `summary reports` folder contains the following content:
* config: it will contain the settings used for each `attempt`.
* group_metrics: Includes the TSV files and a PNG plot of the GQI distribution for each `attempt`.
* global_quality_index_n = A folder for each attempt *(n = number of attempt)*, containing one subfolder per subject. These subfolders include GQI scores and the outputs of individual metrics. 

```

Here you can find how to use both modules for each version of MEGqc:

## GUI MEGqc tutorial
1. [Running the calculation module](../tutorial/calc_gui)
2. [Running the plotting module](../tutorial/plot_gui)
3. [Running the GQI module](../tutorial/calc_gqi)

## CLI MEGqc tutorial
1. [Running the calculation module](../tutorial/calc_cli)
2. [Running the plotting module](../tutorial/plot_cli)


```{admonition} Don't have a Dataset?
:class: tip
In case you don't have a BIDS compliant MEG dataset, here’s how to download one from OpenNeuro:
[How to download a dataset from OpenNeuro](../extra/openneuro.md)

```

