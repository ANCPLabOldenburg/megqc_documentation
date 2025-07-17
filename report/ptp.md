# Peak to Peak Amplitude
Peak-to-Peak (PtP) amplitude calculates the difference between maximun and minimun amplitude in a signal. It provides a measure of the total range of variation of the data averaged over a time interval. 

  <img src="../static/03_PtP/01" alt="pic1" width="800px">


The PtP amplitude of the data over the entire time series represents how the PtP amplitude of every sensor varies over the entire time series. Every dot represent the PtP amplitude of a single sensor. If a sensor falls outside of the whiskers area, it might indicate that the sensor is malfunctioning or other issues.

The position in the Y Axis is not meaningful but serves visualization purposes.

  <img src="../static/03_PtP/02" alt="pic2" width="800px">


In this plot, each box plot represents a specific sensor (color-coded by areas) and each point the PtP Amplitude for that sensor during a specific epoch (time window).  

  <img src="../static/03_PtP/03" alt="pic3" width="800px">


In this plot, each box plot represents an epoch and each point the PtP Ampltiude of the sensors during that specific time window.  

```{admonition} Want to check more reports?
:class: tip

Head back to the [main metrics page](../book/metrics.md) to explore the others!

``` 
