# Programmatic Execution (Python)

MEGqc exposes dispatchers in `meg_qc.test` that are also used by CLI and GUI.

## Step 0 (recommended): export editable config first

Create an editable `settings.ini` using the same CLI utility used in shell workflows:

```bash
mkdir -p /path/to/configs
get-megqc-config --target_directory /path/to/configs --filename settings_global.ini
```

Then edit `/path/to/configs/settings_global.ini` for your run.

## Import dispatchers

```python
from meg_qc.test import (
    run_calculation_dispatch,
    run_plotting_dispatch,
    run_gqi_dispatch,
    run_all_dispatch,
)
```

## Resolve package internal config path

`run_calculation_dispatch` requires the package internal config path.

```python
from pathlib import Path
import meg_qc

pkg_root = Path(meg_qc.__file__).resolve().parent
internal_cfg = str(pkg_root / "settings" / "settings_internal.ini")
```

## 1) Calculation example

```python
run_calculation_dispatch(
    dataset_paths=["/path/ds1", "/path/ds2"],
    config_file_path="/path/to/configs/settings_global.ini",
    internal_config_file_path=internal_cfg,
    sub_list="all",
    n_jobs=4,
    analysis_mode="new",
    analysis_id="qa_pass_01",
    existing_config_policy="provided",
    processed_subjects_policy="skip",
)
```

## 2) Plotting example

```python
run_plotting_dispatch(
    dataset_paths=["/path/ds1", "/path/ds2"],
    qa_subject=True,
    qa_group=True,
    qa_multisample=True,
    qc_group=True,
    qc_multisample=True,
    analysis_mode="reuse",
    analysis_id="qa_pass_01",
    njobs=4,
)
```

## 3) GQI recomputation example

```python
run_gqi_dispatch(
    dataset_paths=["/path/ds1", "/path/ds2"],
    default_config_file_path="/path/to/configs/settings_global.ini",
    analysis_mode="reuse",
    analysis_id="qa_pass_01",
)
```

## 4) Run ALL orchestration example

```python
run_all_dispatch(
    dataset_paths=["/path/ds1", "/path/ds2"],
    config_file_path="/path/to/configs/settings_global.ini",
    internal_config_file_path=internal_cfg,
    sub_list="all",
    calc_n_jobs=4,
    plot_njobs=4,
    analysis_mode="new",
    analysis_id="qa_pass_02",
    qa_subject=True,
    qa_group=True,
    qa_multisample=True,
    qc_group=True,
    qc_multisample=True,
)
```

## Notes

- `analysis_mode='reuse'` requires `analysis_id`.
- in `analysis_mode='new'`, calculation can auto-generate IDs if omitted; providing explicit IDs is recommended for reproducibility.
- multisample plotting modes require at least two datasets.
