# Basic Information

Most subject metric tabs share the same baseline context blocks. This page explains those blocks.

## Subject report header and top-level tabs

<img src="../static/00_overview/02_header_tab_metrics.png" alt="Subject report header and main tabs" width="980px">

This header confirms dataset/subject identity and report generation time, and exposes the top-level navigation tabs.

## Raw information (recording metadata)

<img src="../static/00_overview/01_raw_info.png" alt="Raw info section" width="760px">

This section summarizes key recording metadata such as:

- recording duration and sampling properties,
- basic acquisition/filter information,
- channel inventory and modality metadata.

## Sensor positions

Visual representation of MEG sensor geometry on the head model.

- Sensors are color-coded by lobe grouping.
- The same color convention is reused across multiple plots.

Interactive behavior:

1. rotate and zoom the 3D scene,
2. toggle lobe groups through the legend,
3. inspect channel labels by hover.

<img src="../static/gifs/01_sensor_location/01_rotation.gif" alt="Rotate sensors" width="700px">

<img src="../static/gifs/01_sensor_location/02_hide.gif" alt="Hide and show lobe groups" width="700px">

<img src="../static/gifs/01_sensor_location/03_labels.gif" alt="Sensor labels" width="700px">

```{admonition} Sensor labels
Labels can be shown on hover or via "Always show channel names" in the interactive controls.
```
