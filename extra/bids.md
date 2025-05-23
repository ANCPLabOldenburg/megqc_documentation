# What is BIDS?

Neuroimaging experiments result in complex data that can be arranged in many different ways, and for a long time, there was no consensus on how to organize and share data obtained in neuroimaging experiments. **Brain Imaging Data Structure (BIDS)**, describes a simple and easy to adopt way of organizing neuroimaging and behavioral data (Gorgolewski et al., 2016; Niso et al., 2018) facilitating collaboration between researches and saving time and effort.  _(fragment adapted from BIDS official website)._ 

![bids-logo](../static/bids.jpg)

BIDS describes the structure of the data, directories and sub-directories, name-structure, file-naming and file formats. MEGqc uses [**ancpBIDS**](https://ancplaboldenburg.github.io/ancpbids_documentation/), a Python library which facilitates working with BIDS, both for identifiying the files and also for writting the results according to BIDS. 

Gapontseva (2023) evaluated the MEGqc software thanks to 21  MEG datasets obtained from the OpenNeuro data library. [OpenNeuro](https://openneuro.org/) is a free and open platform with more than 50 thousand participants and more than one thousand public BIDS compliant MRI, PET, MEG, EEG and iEEG datasets. 
