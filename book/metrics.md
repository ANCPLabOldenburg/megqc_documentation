# MEGqc report overview

Every `metric` in MEGqc generates its own HTML report. Each report is full of interactive figures that you can zoom in and out, reveal legends on hovering, hide or show specific epochs or channels...  Here you can find an overview of each report:

1. [Standard Deviation of the Data](../report/std.md)
2. [Peak-to-Peak (manual calculation)](../report/ptp.md)
3. [ECG (Electrocardiogram) calculation](../report/ecg.md)
4. [EOG (Electrooculography) calculation](../report/eog.md)
5. [Muscle Artifacts calculation](../report/muscle.md)
6. [Power Spectral Density](../report/psd.md)

In this tutorial we've included some GIFs to demonstrate the interactive capabilities of the figures. These overviews will show only data from the Magnetometers, but the logic and interpretation for Gradiometers are very similar.


```{admonition} Source of the figures?
:dropdown:

All the examples in every section were created from the subject 009 from the  _ds003483_ dataset available on OpenNeuro. This dataset (among many others) was used to evaluate the MEGqc tool. You may [download this same dataset](../extra/openneuro.md), to recreate these same reports by yourself.

``` 

## Basic Information

Almost every metric will start with some general metadata (date, experimenter, duration...) and basic information about the sensors, such as sensor positions and labels. 

<img src="../static/00.jpg" alt="raw-info" width="650px">

## Sensor Positions

<img src="../static/01.jpg" alt="sensor-distribution" width="600px">

Visual representation of the spatial distribution of MEG sensors on the subject's head. The sensors are divided into eight color-coded groups representing different lobes. This same color coding will be used frequently throughout the reports for reference.


1. **Rotate the figure:** By clicking and holding the mouse left-button while dragging, you can rotate the sensor positions figure to view it from different angles.

<img src="../static/gifs/01_sensor_location/01_rotation.gif" alt="rotation" width="600px">


2. **Hide and reveal sensors:** By clicking on the legend block, you can hide the sensors of a specific lobe. Clicking the block again will make the sensors reappear.

<img src="../static/gifs/01_sensor_location/02_hide.gif" alt="hide" width="600px">

3. **Sensor labels:** The sensor labels appear when you hover over a  sensor dot. Alternatively, you can enable _"Always show channels names"_ option, which keeps all labels visible. Enabling this feature might take some time to render, specially if all lobes are visible.

<img src="../static/gifs/01_sensor_location/03_labels.gif" alt="labels" width="600px">
   


```{admonition} Channel types
:class: tip

The sensor labels help you distinguish between Magnetometers and Gradiometers:
- **Magnetometer:** it measures the magnetic field directly, providing data on its strength and direction, therefore, they are more vulnerable to external magnetic noise. Its label ends with _"1"_ (e.g., _MEG1011_).
- **Gradiometers:** These sensors come in pairs and they measure the gradient of the magentic field (the difference between 2 measurements). Their labels end with _"2"_ and _"3"_, one number per Gradiometer in a sensor (e.g. _MEG0112_ and _MEG0113_).

```


