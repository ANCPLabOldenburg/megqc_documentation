# EOG: eye movement interference

The EOG (Electrooculogram) sensor records eye activity and is used to detect eye movements, which are usually separated into saccades and blinks. The MNE algorithms, however, only identify blinks (Gapontseva, 2023).


  <img src="../static/05_EOG/02" alt="pic2" width="800px">

This plot shows the EOG signal over time (blue line). Each blink produces a peak, marked by a red dot. An averaged eye-blink event is expected to have a wave-like shape with one main crest. If no such shape is detected in most of the data files in a set, the EOG channel is marked as "bad". 

  <img src="../static/05_EOG/03" alt="pic3" width="800px">


This plot represents the mean event shape, which indicates the typical waveform of a blink as captured by the EOG channel. This allows us to understand how blinks influence MEG sensors. 

Similar to the ECG report, the following three plots show the MEG channels affected by blink artifacts, ranked from the most affected to the least affected. This help us to identify channels that may require artifact correction before analysis.

  <img src="../static/05_EOG/04" alt="pic4" width="500px">
  <img src="../static/05_EOG/05" alt="pic5" width="500px">
  <img src="../static/05_EOG/06" alt="pic6" width="500px">

```{admonition} Want to check more reports?
:class: tip

Head back to the [main metrics page](../book/metrics.md) to explore the others!

``` 
