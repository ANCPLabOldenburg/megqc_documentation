/* =====================================================================
   MEGqc documentation: shared client behavior
   - HTML partial includes (header / footer)
   - Theme toggle (dark <-> light), persisted to localStorage
   - Current-page highlight in the header nav
   - Hero workflow animation (path travel + node highlight)
   - GQI score reveal finale (replaces the BIDS Manager brain finale)
   ===================================================================== */

(function () {
  "use strict";

  // -------------------------------------------------------------------
  // HTML partial includes. Any element with `data-include="header"` (or
  // `footer`) is replaced inline with the contents of partials/<n>.html.
  // -------------------------------------------------------------------
  function loadPartials() {
    const slots = document.querySelectorAll("[data-include]");
    if (!slots.length) return Promise.resolve();
    return Promise.all(
      Array.from(slots).map((slot) => {
        const name = slot.getAttribute("data-include");
        return fetch(`partials/${name}.html`, { cache: "no-cache" })
          .then((r) => (r.ok ? r.text() : Promise.reject(r.statusText)))
          .then((html) => { slot.outerHTML = html; })
          .catch((err) => {
            console.warn(`Failed to load partial '${name}':`, err);
          });
      })
    );
  }

  // -------------------------------------------------------------------
  // Theme toggle
  // -------------------------------------------------------------------
  const STORAGE_KEY = "megqc-docs-theme";

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storeTheme(t) {
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "Light theme" : "Dark theme";
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    }
    swapThemedImages(theme);
  }

  // Any <img data-light="..."> swaps its src between the dark version
  // (original src, cached on first call) and the light version on toggle.
  function swapThemedImages(theme) {
    document.querySelectorAll("img[data-light]").forEach((img) => {
      if (!img.dataset.dark) img.dataset.dark = img.getAttribute("src");
      const target = theme === "light" ? img.dataset.light : img.dataset.dark;
      if (img.getAttribute("src") !== target) img.setAttribute("src", target);
    });
  }

  function initThemeToggle() {
    const initial = getStoredTheme() || "dark";
    applyTheme(initial);
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark"
        ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  }

  // -------------------------------------------------------------------
  // Highlight the current page in the header nav
  // -------------------------------------------------------------------
  function highlightCurrentNav() {
    const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === here || (here === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  }

  // -------------------------------------------------------------------
  // Hero workflow animation
  // - traveling dot moves along the path, highlighting each node in turn
  // - on completion, the GQI reveal pill fades in once
  // -------------------------------------------------------------------
  function initWorkflow() {
    const svg  = document.querySelector(".workflow-animation");
    if (!svg) return;
    const path = svg.querySelector("#workflow-main-path");
    const dot  = svg.querySelector(".travel-dot");
    const nodes = Array.from(svg.querySelectorAll(".workflow-node"));
    const reveal = document.querySelector(".gqi-reveal");
    if (!path || !dot || !nodes.length) return;

    let playing = false;
    let raf = null;

    function play() {
      if (playing) return;
      playing = true;
      svg.classList.add("playing");
      nodes.forEach((n) => n.classList.remove("active"));
      if (reveal) reveal.classList.remove("revealed");

      const length = path.getTotalLength();
      const start  = performance.now();
      const duration = 4200;        // ms for the full traversal
      const nodeCount = nodes.length;

      function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        const pos = path.getPointAtLength(t * length);
        dot.setAttribute("cx", pos.x);
        dot.setAttribute("cy", pos.y);

        const segIdx = Math.min(
          nodeCount - 1,
          Math.floor(t * nodeCount)
        );
        nodes.forEach((n, i) => n.classList.toggle("active", i <= segIdx));

        if (t < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          playing = false;
          if (reveal) {
            // Brief settle pause before showing the GQI reveal
            setTimeout(() => reveal.classList.add("revealed"), 250);
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    svg.addEventListener("click", play);
    svg.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
    });

    // Autoplay once on first paint so the page never sits silent
    setTimeout(play, 600);
  }

  // -------------------------------------------------------------------
  // Bootstrap
  // -------------------------------------------------------------------
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // -------------------------------------------------------------------
  // Sticky page TOC. A 42x42 hamburger toggle that reveals a glass
  // panel listing the page's section anchors. Active link auto-tracks
  // which section is currently in view via IntersectionObserver.
  // -------------------------------------------------------------------
  function initPageToc() {
    const toc = document.querySelector(".page-toc");
    if (!toc) return;

    const toggle = toc.querySelector(".page-toc-toggle");
    const panel  = toc.querySelector(".page-toc-panel");
    if (!toggle || !panel) return;

    function setOpen(open) {
      toc.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }

    // Open by default on wide screens, closed on narrow ones
    setOpen(window.matchMedia("(min-width: 1024px)").matches);

    toggle.addEventListener("click", () => {
      setOpen(!toc.classList.contains("is-open"));
    });

    // Close on Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toc.classList.contains("is-open")
          && !window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    });

    // Auto-highlight: find the section closest to the viewport top.
    const links = Array.from(panel.querySelectorAll(".page-toc-link"));
    const idToLink = new Map();
    const sections = [];
    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.startsWith("#") ? href.slice(1) : "";
      if (!id) return;
      const sec = document.getElementById(id);
      if (!sec) return;
      idToLink.set(id, a);
      sections.push(sec);
    });
    if (!sections.length) return;

    function setActive(id) {
      links.forEach((a) => a.classList.remove("is-active"));
      const a = idToLink.get(id);
      if (a) a.classList.add("is-active");
    }

    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });
        if (!visible.size) return;
        const closest = Array.from(visible).sort(
          (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
        )[0];
        if (closest) setActive(closest.id);
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
  }

  // -------------------------------------------------------------------
  // Section reveal-on-scroll: any element with class .reveal fades up
  // when it scrolls into view. Runs once per element (we unobserve).
  // -------------------------------------------------------------------
  function initRevealObserver() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        });
      },
      // Trigger as soon as ANY pixel of the target is within 120px of
      // the viewport edges. Critical for very tall articles where a
      // 5%-of-element threshold may never be reached.
      { rootMargin: "120px 0px 120px 0px", threshold: 0 },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If the element is already in (or close to) the viewport at
      // page load, reveal immediately and skip the observer. This
      // avoids leaving the main article stuck at opacity 0 when its
      // top sits just below a tall hero.
      if (rect.top < window.innerHeight + 120 && rect.bottom > -120) {
        el.classList.add("in-view");
      } else {
        io.observe(el);
      }
    });
  }

  // -------------------------------------------------------------------
  // Workflow diagram (intro.html). Hover (or focus) any stage group to
  // highlight it and pop up a small floating tooltip with that stage's
  // narrative. Stage descriptions live in a JSON island in the page.
  // -------------------------------------------------------------------
  function initWorkflowDiagram() {
    const figure = document.querySelector("[data-workflow]");
    if (!figure) return;
    const svg     = figure.querySelector(".workflow-diagram");
    const popover = figure.querySelector("[data-workflow-popover]");
    const stagesScript = document.getElementById("workflow-stages");
    if (!svg || !popover || !stagesScript) return;

    let stages = {};
    try { stages = JSON.parse(stagesScript.textContent); }
    catch (e) { console.warn("workflow stages JSON parse failed:", e); }

    const popEyebrow = popover.querySelector("[data-popover-eyebrow]");
    const popTitle   = popover.querySelector("[data-popover-title]");
    const popBody    = popover.querySelector("[data-popover-body]");

    // Position the popover INSIDE the .workflow-figure container so it
    // overlays the diagram. Coordinates are computed relative to the
    // figure (not the viewport); the popover stays glued to the
    // diagram even when the page scrolls.
    function positionPopover(group) {
      const figRect   = figure.getBoundingClientRect();
      const groupRect = group.getBoundingClientRect();
      const margin    = 14;

      // Make sure we can measure the popover after it's been shown
      popover.classList.add("is-visible");
      const pw = popover.offsetWidth;
      const ph = popover.offsetHeight;
      const figW = figRect.width;
      const figH = figRect.height;

      // Group position relative to the figure
      const gLeft   = groupRect.left   - figRect.left;
      const gRight  = groupRect.right  - figRect.left;
      const gTop    = groupRect.top    - figRect.top;
      const gBottom = groupRect.bottom - figRect.top;
      const gMidY   = gTop + (gBottom - gTop) / 2;

      // Prefer placing the popover to the right of the stage; flip
      // to the left when it would spill out of the figure.
      let left = gRight + margin;
      if (left + pw > figW - margin) {
        left = gLeft - pw - margin;
      }
      if (left < margin) {
        // Center horizontally if neither side fits cleanly
        left = Math.max(margin, (figW - pw) / 2);
      }
      let top = gMidY - ph / 2;
      if (top < margin) top = margin;
      if (top + ph > figH - margin) top = figH - ph - margin;

      popover.style.left = left + "px";
      popover.style.top  = top + "px";
    }

    function showStage(key, group) {
      const groups = svg.querySelectorAll(".wf-group");
      groups.forEach((g) => g.classList.remove("is-active"));
      svg.classList.add("has-active");
      group.classList.add("is-active");
      const data = stages[key];
      if (data) {
        if (popEyebrow) popEyebrow.textContent = data.eyebrow || "";
        if (popTitle)   popTitle.textContent   = data.title   || "";
        if (popBody)    popBody.textContent    = data.body    || "";
      }
      positionPopover(group);
    }

    function hidePopover() {
      const groups = svg.querySelectorAll(".wf-group");
      groups.forEach((g) => g.classList.remove("is-active"));
      svg.classList.remove("has-active");
      popover.classList.remove("is-visible");
    }

    svg.querySelectorAll(".wf-group").forEach((g) => {
      const key = g.getAttribute("data-wf-stage");
      if (!key) return;
      g.addEventListener("mouseenter", () => showStage(key, g));
      g.addEventListener("focus",      () => showStage(key, g));
      g.addEventListener("click",      () => showStage(key, g));
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", key);
    });
    // Hide only when the cursor leaves the entire figure, so moving
    // between two stages keeps the popover open.
    figure.addEventListener("mouseleave", hidePopover);
  }

  // -------------------------------------------------------------------
  // Install pipeline (installation.html). Seven-step visualiser:
  // chips on top swap the active SVG layer below and update the
  // detail panel; an auto-play loop advances every 4.2s, and any
  // chip click pins the active step. Honours prefers-reduced-motion.
  // -------------------------------------------------------------------
  function initInstallPipeline() {
    const pipe = document.querySelector("[data-pipeline]");
    if (!pipe) return;
    const chips    = Array.from(pipe.querySelectorAll(".pipeline-chip"));
    const layers   = Array.from(pipe.querySelectorAll(".stage-layer"));
    const detail   = pipe.querySelector("[data-pipeline-detail]");
    const progress = pipe.querySelector(".pipeline-progress");
    const playBtn  = pipe.querySelector("[data-pipeline-play]");
    if (!chips.length || !layers.length || !detail) return;

    const STEPS = [
      { title: "Create the install folder",
        body:  "A new <code class=\"inline\">~/MEGqc/</code> directory is created in your home. Everything MEEGqc needs lives inside it, fully isolated from the rest of your system." },
      { title: "Download portable Python 3.10",
        body:  "The installer downloads a portable Python 3.10 build matched to your OS and architecture (Apple Silicon, x86_64 Linux, or Windows embeddable). Your system Python is untouched." },
      { title: "Extract the runtime",
        body:  "The archive is unpacked under <code class=\"inline\">~/MEGqc/</code> and <code class=\"inline\">pip</code> is bootstrapped. The runtime is now fully self-contained." },
      { title: "Create the virtual environment",
        body:  "A virtual environment is built at <code class=\"inline\">~/MEGqc/env/</code>. MEEGqc and its dependencies will live here, separated from any other Python tools you have." },
      { title: "pip install meg-qc",
        body:  "<code class=\"inline\">pip install meg-qc</code> runs inside the venv. MNE-Python, ancpBIDS, Plotly, PyQt6, NumPy, pandas, SciPy, Numba, joblib, and the rest of the dependency tree are pulled in here." },
      { title: "Register a native launcher",
        body:  "A native launcher is registered. macOS: <code class=\"inline\">~/Applications/MEGqc.app</code> bundle with icon. Linux: application-menu entry under <code class=\"inline\">~/.local/share/applications/</code>. Windows: Desktop shortcut + Start Menu entry." },
      { title: "Write the uninstaller",
        body:  "An uninstall script is placed alongside the launcher. One double-click later, every file, the venv, every shortcut, all goes away. No leftover system changes." },
    ];

    const STEP_MS = 4200;
    let current  = 0;
    let pinned   = -1;
    let running  = true;
    let stepStart = performance.now();

    function render(idx) {
      chips.forEach((c, i) => {
        const on = i === idx;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-selected", String(on));
      });
      layers.forEach((l, i) => {
        l.classList.toggle("is-shown",   i <= idx);
        l.classList.toggle("is-current", i === idx);
      });
      const active = chips[idx];
      if (active) {
        const cs = getComputedStyle(active);
        const stepColor = cs.getPropertyValue("--step-color").trim();
        const stepGlow  = cs.getPropertyValue("--step-glow").trim();
        if (stepColor) pipe.style.setProperty("--current-step-color", stepColor);
        if (stepGlow)  pipe.style.setProperty("--current-step-glow",  stepGlow);
      }
      const s = STEPS[idx];
      detail.innerHTML =
        '<h3>' +
          '<span class="detail-step">Step ' + (idx + 1) + ' of ' + STEPS.length + '</span>' +
          '<span class="detail-title">' + s.title + '</span>' +
        '</h3><p>' + s.body + '</p>';
    }

    function tick(ts) {
      if (running) {
        const elapsed = ts - stepStart;
        const p = Math.min(elapsed / STEP_MS, 1);
        progress.style.setProperty("--progress", (p * 100).toFixed(1) + "%");
        if (p >= 1) {
          current = (current + 1) % STEPS.length;
          render(current);
          stepStart = ts;
        }
      }
      requestAnimationFrame(tick);
    }

    chips.forEach((chip, i) => {
      chip.addEventListener("click", () => {
        current = i; pinned = i; running = false;
        progress.style.setProperty("--progress", "0%");
        render(current);
        if (playBtn) playBtn.textContent = "Auto-play";
      });
      chip.addEventListener("mouseenter", () => {
        if (pinned < 0 && running) { running = false; render(i); }
      });
      chip.addEventListener("mouseleave", () => {
        if (pinned < 0) {
          running = true;
          stepStart = performance.now();
          render(current);
        }
      });
      chip.addEventListener("focus", () => {
        if (pinned < 0) render(i);
      });
    });

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (running) {
          running = false;
          playBtn.textContent = "Auto-play";
        } else {
          pinned = -1;
          running = true;
          stepStart = performance.now();
          playBtn.textContent = "Pause";
        }
      });
    }

    render(0);
    const reducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) requestAnimationFrame(tick);
    else if (playBtn) {
      running = false;
      playBtn.textContent = "Auto-play";
    }
  }

  // -------------------------------------------------------------------
  // Tab groups. Any [data-tabs] container with <button data-tab="X">
  // children inside .tab-buttons swaps a .tab-panel[data-panel="X"]
  // when its button is clicked.
  // -------------------------------------------------------------------
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((root) => {
      const btns   = root.querySelectorAll(".tab-buttons .tab-btn[data-tab]");
      const panels = root.querySelectorAll(".tab-panel[data-panel]");
      if (!btns.length) return;

      function activate(key) {
        btns.forEach((b) =>
          b.classList.toggle("is-active", b.getAttribute("data-tab") === key));
        panels.forEach((p) =>
          p.classList.toggle("is-active", p.getAttribute("data-panel") === key));
      }
      btns.forEach((b) => {
        b.addEventListener("click", () => activate(b.getAttribute("data-tab")));
      });
      // Activate the one with is-active, or the first button
      const initial = root.querySelector(".tab-btn.is-active");
      activate(initial ? initial.getAttribute("data-tab")
                       : btns[0].getAttribute("data-tab"));
    });
  }

  ready(() => {
    loadPartials().then(() => {
      initThemeToggle();
      highlightCurrentNav();
      initWorkflow();
      initPageToc();
      initRevealObserver();
      initWorkflowDiagram();
      initInstallPipeline();
      initTabs();
    });
  });
})();
