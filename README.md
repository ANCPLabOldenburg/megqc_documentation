# MEEGqc documentation

Static HTML documentation for [MEEGqc](https://github.com/ANCPLabOldenburg/MEGqc),
the BIDS-aligned MEG and EEG quality assessment toolbox. The repo, the
Python package (`meg_qc`), the PyPI distribution (`meg-qc`), and every
CLI command still carry the original "MEG" naming for backwards
compatibility; only the user-facing brand has moved to MEEGqc to
reflect the added EEG support.

Live site: <https://ancplaboldenburg.github.io/megqc_documentation/>

## Structure

```
megqc_documentation/
  index.html               # landing page (hero + workflow animation)
  intro.html               # what MEEGqc is, the modules, metrics, scopes
  installation.html        # bootstrap installers, CLI/conda, HPC/Apptainer
  tutorial.html            # GUI walkthrough with CLI equivalents inline
  reports.html             # the four HTML report scopes
  metrics.html             # the seven QA metrics
  eeg.html                 # new EEG implementation
  gqi.html                 # Global Quality Index spec
  settings.html            # settings.ini reference
  programmatic.html        # Python API (meg_qc.test dispatchers)
  styles.css               # hand-written; dark default + light toggle
  script.js                # partial includes, theme toggle, hero animation
  partials/                # header / footer
  assets/                  # screenshots, GIFs, brand
```

No build step, no Jupyter Book, no Sphinx. Open `index.html` directly in
a browser, or serve the directory statically (`python -m http.server`).
The `data-include` mechanism in `script.js` fetches the partials, so use
a local HTTP server rather than `file://` if header / footer should
render.

## Deployment

GitHub Actions in `.github/workflows/` uploads the directory as a Pages
artifact on every push to `main`. No build is required: the source IS
the site.

## Questions

If you have questions or run into issues with MEEGqc, please open a
[GitHub issue](https://github.com/ANCPLabOldenburg/MEGqc/issues) or
email <karel.mauricio.lopez.vilaret@uni-oldenburg.de>.
