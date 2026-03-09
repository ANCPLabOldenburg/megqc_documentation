# HTML Reports Overview

MEGqc produces interactive HTML reports at four scopes:

1. **QA Subject reports** (per subject)
2. **QA Group reports** (per dataset)
3. **QC Group reports** (per dataset, Global Quality Index centered)
4. **Multisample reports** (cross-dataset comparison)

This section explains report structure and interpretation. For run commands and GUI clicks, use the [Tutorial](./tutorial.md).

## Report matrix

| Report scope | Input derivatives | Main question answered | Typical output location | Primary audience |
|---|---|---|---|---|
| QA Subject | `calculation/sub-*/...` + per-run summary JSON | What is the full quality profile of one subject across runs/tasks? | `reports/sub-*_meg.html` | Data curator, analyst |
| QA Group | `calculation/` for one dataset | What are cohort-level quality patterns and task-dependent shifts? | `reports/group_QA_report.html` | Lab lead, cohort curator |
| QC Group | `summary_reports/group_metrics/Global_Quality_Index_attempt_<n>.tsv` | How do QC indicators and GQI rank recordings/subjects? | `reports/group_QC_report.html` | QC operator, triage workflows |
| QA/QC Multisample | multiple datasets (QA: `calculation/`; QC: GQI TSV attempts) | How do quality and QC profiles compare across datasets/systems/sites? | `reports/multisample_*.html` | Consortium harmonization |

## Subject report tab map

| Subject tab | Core content | Main interpretation target |
|---|---|---|
| Overview | run/metric availability, raw header metadata, sensor geometry | confirm data completeness and context before metric interpretation |
| STD | channel variability views (space/distribution/channel×epoch) | noisy/flat channels and non-stationary variance |
| PtP (manual/auto) | excursion amplitude views | transient bursts and outlier excursions |
| PSD | spectral burden views | mains/interference and band-dominance patterns |
| ECG / EOG | physiological coupling views | cardiac/ocular contamination burden |
| Muscle | high-frequency burden and event load | muscle artifacts over time |
| Head | movement summaries (if cHPI available) | motion-related quality degradation |
| Stimulus | event/stim channel structure | epoching validity and trigger integrity |
| QC summary | metric-specific QC tables + GQI attempts | auditable QC footprint per run/task |

## Report sections

- [QA Subject report structure and features](../report/qa_subject.md)
- [Basic information and report header](../report/basic.md)
- [STD](../report/std.md)
- [PtP](../report/ptp.md)
- [PSD](../report/psd.md)
- [ECG](../report/ecg.md)
- [EOG](../report/eog.md)
- [Muscle](../report/muscle.md)
- [Head](../report/head.md)
- [Stimulus](../report/stim.md)
- [QA Group report](../report/qa_group.md)
- [QC Group report](../report/qc_group.md)
- [Multisample reports](../report/multisample.md)

