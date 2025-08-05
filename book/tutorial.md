# MEGqc tutorial

In this section we will explain you how to run MEGqc in your dataset, how to create the HTML reports and more about the summary reports.

MEGqc has two main modules (the `calculation module` and the `plotting module`) which can be used via `command-line interface (CLI)` or a `graphical user interface (GUI)`. Below you will find links to the tutorials for both modules and  both modalities.

## The calculation module
The calculation module gives you machine-readable outputs (JSON files and TSV files) for every subject and selected **metric**. For that you need to configure the file paths, specify parameters and execute the calculations.
1. [Running the calculation module for GUI](../tutorial/calc_gui)
2. [Running the calculation module for CLI](../tutorial/calc_cli)

## The plotting module
The plotting module uses the machine-readable outputs of the calculation module to generate the [HTML reports](./report).
1. [Running the plotting module for GUI](../tutorial/plot_gui)
2. [Running the plotting module for CLI](../tutorial/plot_cli)

## The GQI module
MEGqc offers a third module, the **GQI module**, which allows to re-calculate the [Global Quality Index (GQI)](../extra/gqi) with different parameters without re-running the calculation module. 
1. [Running the GQI module for GUI](../tutorial/gqi_gui.md)

### The GQI and the Summary Reports
Once you run the calculation module, MEGqc generates the `summary reports` folder, which contains a series of reports with the the outcome of their metrics and the [Global Quality Index (GQI)](../extra/gqi) of every subject. This folder can be found within the derivatives folder of your dataset.

```bash
path\to\your\dataset\derivatives\Meg_QC\summary_reports
```

The `summary reports` folder contains the following subfolder and files. Every time you re-run the GQI module you will create a new `attempt` within the summary reports.
* **config:** it will contain the specific settings used for the GQI calculation. Each `attempt` creates a new settings file.
* **group_metrics:** Includes a TSV file and a PNG plot of the GQI distribution of the dataset. Each `attempt` creates a new pair of TSV and PNG files.
* **global_quality_index_n:** A folder containing one subfolder per subject. These subfolders include a JSON file with the outputs of individual metrics and the GQI scores. Each `attempt` creates a whole new folder _(n = number of attempt)_.


```{admonition} Don't have a Dataset?
:class: tip
In case you don't have a BIDS compliant MEG dataset, here’s how to download one from OpenNeuro:
[How to download a dataset from OpenNeuro](../extra/openneuro.md)

```

