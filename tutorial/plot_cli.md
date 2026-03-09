# Plotting Module (CLI)

## Default behavior

```bash
run-megqc-plotting --inputdata /path/dataset
```

If no mode flags are provided, MEGqc defaults to `--qa-subject`.

## QA modes

```bash
# Subject-level QA
run-megqc-plotting --inputdata /path/dataset --qa-subject

# Dataset-level QA group
run-megqc-plotting --inputdata /path/dataset --qa-group

# Cross-dataset QA
run-megqc-plotting --inputdata /path/ds1 /path/ds2 --qa-multisample

# All QA modes valid for inputs
run-megqc-plotting --inputdata /path/ds1 /path/ds2 --qa-all
```

## QC modes

```bash
# Dataset-level QC group
run-megqc-plotting --inputdata /path/dataset --qc-group

# Specific attempt
run-megqc-plotting --inputdata /path/dataset --qc-group --attempt 2

# Explicit input TSV
run-megqc-plotting --inputdata /path/dataset --qc-group --input_tsv /path/to/Global_Quality_Index_attempt_2.tsv

# Cross-dataset QC
run-megqc-plotting --inputdata /path/ds1 /path/ds2 --qc-multisample

# All QC modes
run-megqc-plotting --inputdata /path/ds1 /path/ds2 --qc-all
```

## All modes

```bash
run-megqc-plotting --inputdata /path/ds1 /path/ds2 --all
```

## Profile-aware plotting

```bash
run-megqc-plotting \
  --inputdata /path/dataset \
  --qa-group \
  --analysis_mode reuse \
  --analysis_id qa_pass_01
```

## Performance controls

```bash
run-megqc-plotting --inputdata /path/dataset --qa-group --njobs 4
```

Run `run-megqc-plotting --help` for the full flag set.
