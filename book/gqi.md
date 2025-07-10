# Global Quality Index (GQI)

At the end of the analysis, MEGqc computes a `Global Quality Index (GQI)` to provide a single overall estimate of data quality for each subject. The GQI is based on a **penalization system:** if one or more metricts detect quality issues, they reduce the overall GQI percentage.

Each metric contributes to the penalization with a customizable `weight` (but default values are available), representing its relative importance. If a metric exceeds a predefined **minimun** `threshold` (also customizable), a _portion_ of its weight is substracted from the GQI. So the more severe the issue, the larger the penalty. If the metric exceeds a predefined **maximun** `threshold`, the total weight will be penalized.


1. **Channel Quality Metrics**

[Standard Deviation (STD)](../report/std.md) and [Peak-to-Peak (PtP)](../report/ptp.md) metrics are used to asses the signal quality of individual channels. They are calculated separatedly for Magnetometers and Gradiometers, resulting in 4 "sub-metrics" in total.
By default, a penalization to the GQI is applied only if more than 5 channels show over 30% distortion in one of these 4 sub-metrics (for example, STD in Magnetometers). Each of these 4 sub-metrics contributes equally to the total penalty.The total weight (maximun penalty) for the total channel quality metrics is by default 32%, so the maximun these sub-metrics contribute to the final penalty is 8%. 

| --- | STD | PtP |
| --- | --- | --- |
| Magnetometers | 8% | 8% |
| Gradiometers | 8% | 8% |

2. **Physiological Artifact Correlation**

[Electrocardiogram (ECG)](../report/ecg.md) and [Electrooculography (EOG)](../report/eog.md) detect how noise correlates with physiological signals. 
By default, their independant weight is 12% and their thresholds are 5% and 25% of distortion. So if both metrics are above 25% distortion, they will remove 24% out of the GQI. 
If these metrics can't be calculate because the dataset lacks of theses channels or they are too noisy to calculate the correlation, there will be a 6% penalization for each.

3. **Muscle Artifacts**

(../report/muscle.md)

4. **Frequency Domain Assessment**

(../report/psd.md)
