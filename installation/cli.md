# CLI Installation Guide

Now we'll start with the installation process for the  command-line interface (CLI) MEGqc. Before diving in, we'll briefly explain virtual environments and containerization:
<br>

::::{important}

We strongly recommend using MEGqc within a **virtual environment** to avoid conflicts with system dependencies.
The GUI installer  automatically creates and manages a virtual environment. Meanwhile the CLI setup requires you to create one manually.
If you want to learn more about virtual environments and how to install them, [click here](../extra(environment.md)

::::

## Install the MEGqc Package
Once your environment is activated, you can install Python packages with `pip`, and these installations will only apply to your virtual environment. To install MEGqc core functionality, run the following command in the terminal:
 
        pip install git+https://github.com/ANCPLabOldenburg/MEGqc.git

<br>


<!--
Next, you will need to clone the [Github Repository](https://github.com/ANCPLabOldenburg/MEGqc). 

![repository](static/github.png)

- The folder _docker_ contains the starting script *run_megqc.py*.
- The folder *meg_qc* is a copy of the previously installed MEGqc package via `pip`.
-->

## Install depencies?
Thanks to the last update, it's not necessary to manually pip install the different dependencies anymore. All of them are installed automatically along with the MEGqc package.
If you want to know more about them and their functionalitiy, please [visit the pipeline basics page](../extra/details.md).

Still, if your python version is older than 3.9, it might be necessary to upgrade pandas to 2.2.3 version:

        pip install --upgrade pandas.
