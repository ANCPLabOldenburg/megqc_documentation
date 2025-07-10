# Global Quality Index (GQI)

At the end of the analysis, MEGqc computes a `Global Quality Index (GQI)` to provide a single overall estimate of data quality for each subject. The GQI is based on a **penalization system:** if one or more metricts detect quality issues, they reduce the overall GQI percentage.

Each metric contributes to the GQI with a customizable `weight` (but default values are available), representing its relative importance. If a metric exceeds a predefined `threshold` (also customizable), a portion of its weight is substracted from the GQI. So the more severe the issue, the larger the penalty (up to the maximun weight). 

1. **Channel Quality Metrics**
   
   - **Standard Deviation (STD) of the Data:** Measures the variability of each channel. Channels with unusual high or low STD compared to others, might indicate very noisy or flat channels. [Link to the report](../report/std.md).
   - **Peak-to-Peak (PtP) Amplitude (manual calculation):** Calculates the difference between maximun and minimun amplitude in a signal. It provides a measure of the total range of variation of the data across the sensors, and can help identify abnormal channels. [Link to the report](../report/ptp.md).


2. **Physiological Artifact Correlation**
   
   - **Electrocardiogram (ECG):** Detects correlated noise caused by cardiac activity. [Link to the report](../report/ecg.md).
   - **Electrooculography (EOG):** Detects correlated noise caused by eye movements. [Link to the report](../report/eog.md).

3. **Muscle Artifacts**
   
   - **Muscle Artifacts calculation:** Identifies high-frequency bursts from body movements, for example, when the subject clenches their jaw. [Link to the report](../report/muscle.md).

4. **Frequency Domain Assessment**
   
   - **Power Spectral Density (PSD):** It provides information on the strength of different frequency components of a signal. PSD calculation helps us to distinguish between brain activity and non-brain-related noise, for example, line noise. [Link to the report](../report/psd.md).
