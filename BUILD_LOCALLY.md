# Building the MEGqc Jupyter Book Documentation Locally

This guide explains how to build and preview the MEGqc documentation (Jupyter Book) on your local machine, so you can see exactly how it will look after deployment on GitHub Pages.

## Prerequisites

- **Python 3.10** (or a compatible version)
- **pip** package manager
- A terminal (macOS Terminal, Linux shell, or Windows PowerShell/CMD)

## Step-by-step instructions

### 1. Navigate to the documentation folder

```bash
cd /path/to/megqc_documentation
```

### 2. (Recommended) Create and activate a virtual environment

```bash
python3.10 -m venv .docenv
source .docenv/bin/activate       # macOS / Linux
# .docenv\Scripts\activate        # Windows
```

### 3. Install Jupyter Book (classic version)

The documentation uses Jupyter Book v1.x (the classic Sphinx-based version). **Do not install v2.x** — it uses a different engine (MyST) and is incompatible with the current `_config.yml`.

```bash
pip install "jupyter-book<2.0"
```

This will also install all required Sphinx extensions (`myst-parser`, `sphinx-book-theme`, `sphinx-design`, etc.).

### 4. Build the book

```bash
jb build .
```

Or equivalently:

```bash
jupyter-book build .
```

To force a full rebuild (clears the cache):

```bash
jb build . --all
```

### 5. Preview in your browser

After a successful build, the terminal will show:

```
Your book's HTML pages are here:
    _build/html/
You can look at your book by opening this file in a browser:
    _build/html/index.html
```

**macOS:**
```bash
open _build/html/index.html
```

**Linux:**
```bash
xdg-open _build/html/index.html
```

**Windows:**
```bash
start _build/html/index.html
```

## Common warnings and how to fix them

| Warning | Meaning | Fix |
|---------|---------|-----|
| `document isn't included in any toctree` | A `.md` file exists but is not listed in `_toc.yml` | Add it to `_toc.yml` or delete the orphan file |
| `cross-reference target not found` | A broken cross-reference (for example, an anchor link or a file link) points to a non-existent target | Fix the link path or add the missing anchor |
| `Mathjax configuration has changed` | The `_config.yml` uses old `mathjax_config` key | Change `mathjax_config` to `mathjax3_config` in `_config.yml` (cosmetic; does not break the build) |

## Deploying to GitHub Pages

Once you're happy with the local preview, deploy with:

```bash
pip install ghp-import
ghp-import -n -p -f _build/html
```

This pushes the built HTML to the `gh-pages` branch. Make sure your GitHub repository has Pages enabled from the `gh-pages` branch.

### Alternative: GitHub Actions (automated)

You can also set up a GitHub Action to build and deploy automatically on every push. Create `.github/workflows/deploy-book.yml`:

```yaml
name: Deploy Jupyter Book

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.10"

      - name: Install dependencies
        run: pip install "jupyter-book<2.0" ghp-import

      - name: Build book
        run: jupyter-book build .

      - name: Deploy to GitHub Pages
        run: ghp-import -n -p -f _build/html
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Cleaning the build

To remove all build artifacts and start fresh:

```bash
jb clean .
```

Or manually:

```bash
rm -rf _build/
```

## Troubleshooting

- **`jupyter-book: command not found`** → Make sure your virtual environment is activated and `jupyter-book<2.0` is installed.
- **Build hangs or produces no output** → You may have installed `jupyter-book>=2.0` (the MyST engine). Uninstall and reinstall: `pip uninstall jupyter-book && pip install "jupyter-book<2.0"`.
- **Images not showing** → Ensure `html_extra_path: ["static"]` is set in `_config.yml` and that all image paths in `.md` files use relative paths starting with `../static/`.
- **Tab-set directives not rendering** → Make sure `sphinx-design` is installed (it comes with `jupyter-book<2.0`).

