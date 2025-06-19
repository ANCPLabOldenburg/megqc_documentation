# GUI: Running Plotting Module

After completing the analysis with the calculation module, the next step is to generate the visual reports. Thanks to the GUI, you can run the plotting module without coding.

## Set Data directory
You can *paste* the path to your **dataset** folder or click `Browse` to select the folder manually. MEGqc will search for the derivatives folder within your dataset and use the machine-readable outputs created by the calculation module. Then you just need to click on `Run Plotting`.

<img src="../static/mini/run_plotting3.png" alt="launchgui" width="400px" align="center">

```{warning}

If you give a path to a different, such as the subject folder or the calculation folder, you will see in the Log window
"Plotting error: Process exited with code 1". It will also create an empty folder called "derivatives" within your given paths. Your path only needs to lead to the dataset, you don't need to go any deeper.

``` 

## Congratulations!
You're done'! You will find the html reports in a folder called `reports` within the derivatives folder. The reports will be divided by subjects. If you've been following this tutorial, your path to your reports might look like this:


    /path/to/your/dataset/ds003483/derivatives/Meg_QC/reports/sub-009/


Now you can open these reports in Chrome or Firefox to explore the interactive plots and visualize of the quality control analysis of your dataset!


```{admonition} Which reports will be created?
:class: tip

MEGqc will create reports of all the derivatives it founds within the `/calculation` folder of your dataset's derivatives. This means, all subjects, sessions, tasks, runs, metrics and sensors you have analyzed before. Be aware of this before you run the plotting module!

``` 


