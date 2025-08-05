[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Welcome!

Hello everyone, and welcome to this MEGqc documentation.
[**MEGqc**](https://github.com/ANCPLabOldenburg/MEGqc) is a Python-based pipeline for quality control of MEG data. It was developed by the [**Applied Neurocognitive Psychology Lab (ANCP Lab)**](https://uol.de/en/applied-neurocognitive-psychology). To ensure standardization of the pipeline, MEGqc software is tailored to the [**BIDS standards**](extra/bids.md).


```{admonition} Windows update!
:class: tip

Currently, MEGqc runs smoothly both on Linux and Windows! 🚀

```

## User-friendly
To run the quality control calculations and create the reports you just need to:
- Install the GUI (CLI version also available)
- Provide data for evaluation
- Set analysis parameters (if desired, default parameters are available)
- Run the analysis

## This guide includes
- [What is MEGqc and why do we need it?](book/introduction.md)
- [Overview of MEGqc reports](book/report.md)
- [Installation guide](book/installation.md)
- [Tutorial on how to run MEGqc](book/tutorial.md)

## Requirements for this tutorial
This documentation will help you to install and run MEGqc without a deep technical knowledge. While no advanced programming knowledge is required, it’s helpful to be familiar with the following concepts:
- Basic understanding of **MEG data** and common artifacts.
- Basic knowledge of the [BIDS structure](extra/bids.md)
- Basic understanding of [BASH commands](https://peerherholz.github.io/Python_for_Psychologists_Winter2021/introduction/intro_to_shell.html) (most users will be able to use the GUI without needing the terminal at all).
- Basic knowledge of GitHub - helpful if you want to check the source code or contribute

```{warning}
Currently, MEGqc runs smoothly with `.fif` files from Neuromag / Elekta / MEGIN systems, as well as BabyMEG systems.  
It also supports `.ctf` data formats, typically stored in folders with the `.ds` extension.

```

## I've got a question!
If you have any questions or encounter difficulties while working with MEGqc, please don’t hesitate to get in touch with us. You can send an e-mail to karel.mauricio.lopez.vilaret@uni-oldenburg.de or check a `New Issue` in the [MEGqc github](https://github.com/ANCPLabOldenburg/MEGqc/issues).


## Acknowledgements
This tutorial was made possible through the dedicated work of the [Jupyter community](https://jupyter.org/community), specifically, the [Executable/Jupyter Book](https://executablebooks.org/en/latest/).
