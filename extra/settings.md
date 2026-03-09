# Settings Description (`settings.ini`)

MEGqc behavior is controlled through `settings.ini`. You can use package defaults, a global custom config, or per-dataset config files.

## General section

| Variable | Default | Type | Description |
|---|---|---|---|
| `ch_types` | `mag, grad` | string list | Channel types to process. |
| `STD` | `True` | bool | Enable standard deviation metric. |
| `PSD` | `True` | bool | Enable power spectral density metric. |
| `PTP_manual` | `True` | bool | Enable manual peak-to-peak metric. |
| `PTP_auto_mne` | `False` | bool | Enable MNE auto peak-to-peak metric. |
| `ECG` | `True` | bool | Enable ECG correlation metric. |
| `EOG` | `True` | bool | Enable EOG correlation metric. |
| `Head` | `False` | bool | Enable head-movement metric (requires cHPI/head localization info). |
| `Muscle` | `True` | bool | Enable muscle-artifact metric. |
| `data_crop_tmin` | `0` | float | Start crop time in seconds. |
| `data_crop_tmax` | blank | float/blank | End crop time in seconds; blank uses full recording. |

## Filtering section

| Variable | Default | Type | Description |
|---|---|---|---|
| `apply_filtering` | `True` | bool | Enable filtering stage. |
| `downsample_to_hz` | `1000` | float/int | Downsample target frequency. |
| `l_freq` | `0` | float/int | High-pass edge (Hz). |
| `h_freq` | `140` | float/int | Low-pass edge (Hz). |
| `method` | `iir` | string | Filter method. |

## Epoching section

| Variable | Default | Type | Description |
|---|---|---|---|
| `event_dur` | `0.2` | float | Event duration (s). |
| `epoch_tmin` | `-0.2` | float | Epoch start relative to event (s). |
| `epoch_tmax` | `1` | float | Epoch end relative to event (s). |
| `stim_channel` | blank | string | Optional explicit stim channel. |
| `event_repeated` | `merge` | string | Duplicate-event handling (`error`, `drop`, `merge`). |
| `use_fixed_length_epochs` | `True` | bool | Fallback epoching when event structure is unavailable. |
| `fixed_epoch_duration` | `2.0` | float | Fixed-length epoch size (s). |
| `fixed_epoch_overlap` | `0.0` | float | Overlap between fixed epochs (s). |

## Metric sections

### STD (Standard Deviation)

| Variable | Default | Type | Description |
|---|---|---|---|
| `std_lvl` | `1` | int | Number of standard deviations from mean for threshold. |
| `allow_percent_noisy_flat_epochs` | `70` | int | Max % of epochs a channel can be noisy/flat before marking the channel. |
| `noisy_channel_multiplier` | `1.2` | float | Multiplier for noisy channel detection (higher = fewer noisy flags). |
| `flat_multiplier` | `0.5` | float | Multiplier for flat channel detection. |

### PSD (Power Spectral Density)

| Variable | Default | Type | Description |
|---|---|---|---|
| `freq_min` | `0.5` | float | Lower frequency for PSD calculation (Hz). |
| `freq_max` | `140` | float | Upper frequency for PSD calculation (Hz). |
| `psd_step_size` | `1` | float | Frequency resolution of PSD (Hz). |

### PTP_manual (Peak-to-Peak Manual)

| Variable | Default | Type | Description |
|---|---|---|---|
| `numba_version` | `True` | bool | Use Numba-accelerated calculation for speed. |
| `max_pair_dist_sec` | `20` | float | Maximum pair distance in seconds. |
| `ptp_thresh_lvl` | `10` | int | Scaling factor for threshold (higher = more peaks detected). |
| `allow_percent_noisy_flat_epochs` | `70` | int | Max % of epochs for noisy/flat marking. |
| `std_lvl` | `1` | int | Standard deviations from mean for threshold. |
| `noisy_channel_multiplier` | `1.2` | float | Multiplier for noisy channel detection. |
| `flat_multiplier` | `0.5` | float | Multiplier for flat channel detection. |
| `ptp_top_limit` | `1e-12` | float | Reserved: absolute upper limit (Tesla). |
| `ptp_bottom_limit` | `-1e-12` | float | Reserved: absolute lower limit (Tesla). |

### PTP_auto (Peak-to-Peak Auto - MNE-based)

| Variable | Default | Type | Description |
|---|---|---|---|
| `peak_m` | `4e-14` | float | Min PtP amplitude for magnetometer peaks (T). |
| `peak_g` | `4e-14` | float | Min PtP amplitude for gradiometer peaks (T/m). |
| `flat_m` | `3e-14` | float | Max PtP amplitude for magnetometer flat detection (T). |
| `flat_g` | `3e-14` | float | Max PtP amplitude for gradiometer flat detection (T/m). |
| `bad_percent` | `5` | int | % of time above threshold to mark as bad. |
| `min_duration` | `0.002` | float | Min duration (s) above threshold to count. |

### ECG (Electrocardiogram)

| Variable | Default | Type | Description |
|---|---|---|---|
| `drop_bad_ch` | `True` | bool | Drop bad ECG channel and reconstruct from magnetometers. |
| `n_breaks_bursts_allowed_per_10min` | `3` | int | Allowed breaks in ECG per 10 minutes. |
| `allowed_range_of_peaks_stds` | `0.14` | float | Allowed peak height variation (0-1 scaled). |
| `height_multiplier` | `0.6` | float | Peak height threshold multiplier. |
| `norm_lvl` | `1` | int | Normalization level for threshold scaling. |
| `gaussian_sigma` | `4` | int | Gaussian smoothing kernel sigma. |
| `thresh_lvl_peakfinder` | `5` | int | Peak finder threshold level. |
| `fixed_channel_names` | blank | string | Explicit ECG channel names (comma-separated). |

### EOG (Electrooculogram)

| Variable | Default | Type | Description |
|---|---|---|---|
| `n_breaks_bursts_allowed_per_10min` | `3` | int | Allowed breaks in EOG per 10 minutes. |
| `allowed_range_of_peaks_stds` | `0.15` | float | Allowed peak height variation (0-1 scaled). |
| `norm_lvl` | `1` | int | Normalization level for threshold scaling. |
| `gaussian_sigma` | `6` | int | Gaussian smoothing kernel sigma (higher for noisier EOG). |
| `thresh_lvl_peakfinder` | `3` | int | Peak finder threshold level. |
| `fixed_channel_names` | blank | string | Explicit EOG channel names (comma-separated). |

### Muscle

| Variable | Default | Type | Description |
|---|---|---|---|
| `muscle_freqs` | `110, 140` | int pair | Frequency band for muscle detection (Hz). |
| `threshold_muscle` | `5` | int | Z-score threshold for muscle artifact detection. |
| `min_length_good` | `0.2` | float | Min duration of "good" data between muscle events (s). |
| `min_distance_between_different_muscle_events` | `1` | float | Min distance between separate muscle events (s). |

## Global Quality Index section (`[GlobalQualityIndex]`)

| Variable | Default | Type | Description |
|---|---|---|---|
| `compute_gqi` | `True` | bool | Enable GQI computation. |
| `include_ecg_eog` | `True` | bool | Include ECG/EOG correlation term in GQI. |
| `bad_ch_start` | `0` | int | % bad channels below which no penalty applies. |
| `bad_ch_end` | `100` | int | % bad channels at which maximum penalty applies. |
| `bad_ch_weight` | `35` | int | Contribution weight for channel-variability penalty. |
| `correlation_start` | `0` | int | % correlated channels below which no penalty applies. |
| `correlation_end` | `100` | int | % correlated channels at which maximum penalty applies. |
| `correlation_weight` | `30` | int | Contribution weight for ECG/EOG-correlation penalty. |
| `muscle_start` | `0` | float | Muscle ratio below which no penalty applies. |
| `muscle_end` | `0.0001` | float | Muscle ratio at which maximum penalty applies. |
| `muscle_weight` | `15` | int | Contribution weight for muscle penalty. |
| `psd_noise_start` | `0` | int | % PSD noise below which no penalty applies. |
| `psd_noise_end` | `100` | int | % PSD noise at which maximum penalty applies. |
| `psd_noise_weight` | `20` | int | Contribution weight for PSD-noise penalty. |

**Note:** Weights are expressed as integers and are automatically normalized so they sum to 100%. See [Global Quality Index](./gqi.md) for detailed interpretation.

## Notes

- GUI settings editors prevent many manual formatting errors by using typed controls.
- In CLI, keep numeric formatting valid INI syntax (no units in value fields).
- Prefer profiles (`analysis_mode=new/reuse/latest`) when testing multiple settings variants.

For practical examples, see:
- [Calculation Module (CLI)](../tutorial/calc_cli.md)
- [Calculation Module (GUI)](../tutorial/calc_gui.md)
- [Global Quality Index](./gqi.md)
