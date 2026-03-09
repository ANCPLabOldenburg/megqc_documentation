# Calculation Module (CLI)

## Step 0 (recommended): create editable config file(s)

Export package defaults to your working directory first:

```bash
mkdir -p /path/to/configs
get-megqc-config --target_directory /path/to/configs --filename settings_global.ini
```

For multi-dataset runs with dataset-specific settings:

```bash
get-megqc-config --target_directory /path/to/configs --filename ds1.ini
get-megqc-config --target_directory /path/to/configs --filename ds2.ini
```

Edit the copied files as needed. Keep package defaults unchanged.

## Step 1: minimal calculation run

```bash
run-megqc \
  --inputdata /path/to/dataset \
  --config /path/to/configs/settings_global.ini
```

## Common controls

- `--subs 001 002 003`
- `--n_jobs 4`
- `--derivatives_output /path/to/derivatives_root`
- `--analysis_mode legacy|new|reuse|latest`
- `--analysis_id <id>` (required with `reuse`)
- `--existing_config_policy provided|latest_saved|fail`
- `--processed_subjects_policy skip|rerun|fail`

## Multi-dataset examples

### A) Same config for all datasets

```bash
run-megqc \
  --inputdata /path/ds1 /path/ds2 /path/ds3 \
  --config /path/to/configs/settings_global.ini \
  --n_jobs 6
```

### B) Per-dataset subjects and per-dataset configs

```bash
run-megqc \
  --inputdata /path/ds1 /path/ds2 \
  --subs_per_dataset \
    "/path/ds1::001,002,003" \
    "/path/ds2::all" \
  --config_per_dataset \
    "/path/ds1::/path/to/configs/ds1.ini" \
    "/path/ds2::/path/to/configs/ds2.ini" \
  --n_jobs 4
```

### C) Profile-based new run for sensitivity tracking

```bash
run-megqc \
  --inputdata /path/dataset \
  --config /path/to/configs/settings_global.ini \
  --analysis_mode new \
  --analysis_id qa_pass_01 \
  --existing_config_policy provided \
  --processed_subjects_policy skip
```

## Run ALL (calculation + plotting in one command)

If `--run-all` is used, calculation is executed first, then plotting scopes are executed.

### All plotting scopes

```bash
run-megqc \
  --inputdata /path/ds1 /path/ds2 \
  --config /path/to/configs/settings_global.ini \
  --run-all --all
```

### Selective plotting scopes

```bash
run-megqc \
  --inputdata /path/ds1 /path/ds2 \
  --config /path/to/configs/settings_global.ini \
  --run-all \
  --qa-subject --qa-group --qc-group
```

## Output layout

- legacy mode: `/path/dataset/derivatives/Meg_QC/`
- profile mode: `/path/dataset/derivatives/Meg_QC/profiles/<analysis_id>/`

Use `run-megqc --help` for the complete flag reference.
