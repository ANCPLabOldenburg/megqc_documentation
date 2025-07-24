# Global Quality Index (GQI)

MEGqc computes a single overall estimate of data quality for each subject. The GQI works as a **penalization system:** when one or more metrics detect quality issues, they reduce the subject's GQI score accordingly.

<img src="../static/gqi/gqi_1.png" alt="gqi" width="450px" align="center">


1. **Percentage variables:** The last 6 x-axis items (one item per metric) show the raw percentage of channels affected by the different sources of noise.
<img src="../static/gqi/03.png" alt="gqi-3" width="400px" align="center">

If any of these value surpass their predefined `thresholds`, the penalization system starts. The penalization system is defined by a system of `weights` and `thresholds`. The weight is the maximun possible penalty, and represents its relative importance for the GQI. There are two thresholds, the `start` and the `end`. If a metric exceeds the `start` (predefined **minimun** threshold), a **portion** of its weight is substracted from the GQI. If the metric exceeds the `end` (predefined **maximun** threshold), the **total** weight will be penalized. The weight and both thresholds are customizable, but there are defaults values calculated from datasets.

2. **Penalties:** The GQI is reduced based on four sources of noise (channel variability, correlational noise from cardiac rythm and eye-blinks, muscle artifacts and power spectral density). Each x-axis item in the following plot represents the computed penalty which will be substracted from the GQI (starts at 100%).

<img src="../static/gqi/02.png" alt="gqi-2" width="400px" align="center">

4. **GQI:** Each dot represents a subject's GQI, and the violin plot summarizes the distribution of GQI scores across the dataset.
<img src="../static/gqi/01.png" alt="gqi-1" width="250px" align="center">


```{admonition} Example: GQI calculation 

Channel variability penalization is calculated by the Standard Deviation (STD) and Peak-to-Peak (PtP) metrics. These 2 metrics are calculated separatedly for Magnetometers and Gradiometers, resulting in 4 "submetrics" in total. The final percentage of bad channels is calculate as an average of these 4 submetrics (each submetric contributes equally).

By default, a penalization to the GQI is applied if certain amount of channels shows over 30% distortion in one of these 4 sub-metrics (for example, STD in Magnetometers). The total weight (maximun penalty) for the total channel quality metrics is by default `32%`, so the maximun every submetrics contributes to the final penalty is `8%`. 

| sensor | STD | PtP |
| --- | --- | --- |
| Magnetometers | 8% | 8% |
| Gradiometers | 8% | 8% |

``` 

2. **Physiological Artifact Penalty**

The weight (`24%` by default) of the penalty is divided equally between [Electrocardiogram (ECG)](../report/ecg.md) and [Electrooculography (EOG)](../report/eog.md) percentage of signal correlated with physiological signals. 

If these metrics can't be calculate because the dataset lacks of theses channels or they are too noisy to calculate the correlation, there will be a 6% penalization for each.

3. **Muscle Artifacts**

(../report/muscle.md)

4. **Frequency Domain Assessment**

(../report/psd.md)


## Next section
In the next section, we'll walk through the content of the HTML reports.
For a deeper understanding of MEGqc's core functionality, dependencies and derivatives, [visit the pipeline basics page](../extra/details.md).

