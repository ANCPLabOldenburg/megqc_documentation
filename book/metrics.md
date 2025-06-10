# MEGqc report overview

Every `metric` in MEGqc generates its own HTML report. Each report is full of interactive figures that you can zoom in and out, reveal legends on hovering, hide or show specific epochs or channels... In this tutorial we've included some GIFs to demonstrate the interactive capabilities of the figures.

Almost every metric will start with a basic overview of the data and the sensor poistion. You can find an example in the link below:

* [Basic overview](../report/basic.md)

Each metric is covered in individual reports. Here you can find an overview of these reports (in these overviews we will focus only on the Magnetometers, but the logic and interpretation for Gradiometers are very similar):

1. [Standard Deviation of the Data](../report/std.md)
2. [Power Spectral Density](../report/psd.md)
3. [Peal-to-Peak (manual calculation)](../report/ptp.md)
4. [ECG (Electrocardiogram) calculation](../report/ecg.md)
5. [EOG (Electrooculography) calculation]((../report/eog.md))
6. [Muscle Artifacts calculation](../report/muscle.md)


```{admonition} Figures source

The examples in this section are taken from the report of the subject 009 from the  _ds003483_ dataset available on OpenNeuro. This same dataset was used by Gaponsertva (2023) to evaluate the MEGqc tool. In the Practical Guide you'll learn how to [download this same dataset](../extra/openneuro.md), so you can recreate these same reports yourself.

``` 

