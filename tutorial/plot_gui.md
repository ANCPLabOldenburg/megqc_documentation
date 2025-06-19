# GUI: Running Plotting Module
After completing the analysis with the calculation module, the next step is to generate the visual reports. Thanks to the GUI, you can run the plotting module without coding.


The data directory should lead to the dataset, MEGqc will first search for the derivatives folder and use the machine-readable outputs created by the calculation module.
If you give a path to a deeper folder by mistake, such as the subject folder, you will recieved a 
"plottin error: Process exited with code 1" and it will create an empty folder called "derivatives". 


You will find the html reports in a folder called "reports" within the derivatives folder. This reports will be divided by subjects.

/path/to/your/dataset/ds003483/derivatives/Meg_QC/reports/sub-009/

The plotting module will automatically create a report for every accessible subject and metric. Be aware of this before you run the plotting module.

