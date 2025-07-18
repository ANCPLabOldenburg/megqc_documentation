# Basic information

Almost every report starts with the 2 following sections: 

## Raw Information

This section includes some general metadata (date, experimenter, duration...), some channels' information (more on that later), and basic details about the sampling frequency and applied filters.

<img src="../static/00.jpg" alt="raw-info" width="650px">


## Sensor Positions

<img src="../static/01.jpg" alt="sensor-distribution" width="600px">

Visual representation of the spatial distribution of MEG sensors on the subject's head. The sensors are divided into eight color-coded groups representing different lobes. This same color coding will be used frequently throughout the reports for reference.

1. **Rotate the figure**
By clicking and holding the mouse left-button while dragging, you can rotate the sensor positions figure to view it from different angles.

<img src="../static/gifs/01_sensor_location/01_rotation.gif" alt="rotation" width="600px">


2. **Hide and reveal sensors**
By clicking on the legend block, you can hide the sensors of a specific lobe. Clicking the block again will make the sensors reappear.

<img src="../static/gifs/01_sensor_location/02_hide.gif" alt="hide" width="600px">


There are 2 different types of meters in MEG sensors: **Magnetometers** and **Gradiometers**. Each sensor might contain one type of meter or both. The sensor labels help you distinguish between them:
- **Magnetometer:** it measures the magnetic field directly, providing data on its strength and direction. It is more sensitive to distant source, making it more vulnerable to external magnetic noise. Its label ends with _"1"_ (e.g., _MEG1011_).
- **Gradiometers:** These sensors come in pairs and they measure the gradient of the magentic field, so the difference between 2 measurements. This setup helps filter out environemntal noise. Their labels end with _"2"_ and _"3"_ indicating the two Gradiometers in a specific sensor (e.g. _MEG0112_ and _MEG0113_).

<img src="../static/gifs/01_sensor_location/03_labels.gif" alt="labels" width="600px">


```{admonition} Sensor labels

The sensor labels appear when you hover over a  sensor dot. Alternatively, you can enable _"Always show channels names"_ option, which keeps all labels visible. Enabling this feature might take some time to render, specially if all lobes are visible.

``` 

