/* =====================================================================
   MEEGqc documentation: shared client behavior
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

  // Theme-aware media swap. Two opt-in shapes:
  //   <img   data-light="...">  swaps `src` between the dark default
  //                             and the named light variant.
  //   <video data-light-src="..."> same idea for autoplay loops; we
  //                             cache the original src, swap on toggle,
  //                             and re-play so the loop keeps running.
  function swapThemedImages(theme) {
    document.querySelectorAll("img[data-light]").forEach((img) => {
      if (!img.dataset.dark) img.dataset.dark = img.getAttribute("src");
      const target = theme === "light" ? img.dataset.light : img.dataset.dark;
      if (img.getAttribute("src") !== target) img.setAttribute("src", target);
    });
    document.querySelectorAll("video[data-light-src]").forEach((vid) => {
      if (!vid.dataset.darkSrc) vid.dataset.darkSrc = vid.getAttribute("src");
      const target = theme === "light" ? vid.dataset.lightSrc : vid.dataset.darkSrc;
      if (vid.getAttribute("src") !== target) {
        const wasPlaying = !vid.paused;
        vid.setAttribute("src", target);
        vid.load();
        if (wasPlaying) vid.play().catch(() => { /* autoplay may be blocked */ });
      }
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
  // when it scrolls into view. Same shape as the BIDS Manager docs
  // observer: a single threshold, no rootMargin, no pre-reveal pass.
  // Elements already inside the viewport at page load get the class
  // synchronously the first time the observer fires for them, so the
  // first-paint sections don't flash.
  // -------------------------------------------------------------------
  function initRevealObserver() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((el) => io.observe(el));
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
        body:  "A new <code class=\"inline\">~/MEEGqc/</code> directory is created in your home. Everything MEEGqc needs lives inside it, fully isolated from the rest of your system." },
      { title: "Download portable Python 3.10",
        body:  "The installer downloads a portable Python 3.10 build matched to your OS and architecture (Apple Silicon, x86_64 Linux, or Windows embeddable). Your system Python is untouched." },
      { title: "Extract the runtime",
        body:  "The archive is unpacked under <code class=\"inline\">~/MEEGqc/</code> and <code class=\"inline\">pip</code> is bootstrapped. The runtime is now fully self-contained." },
      { title: "Create the virtual environment",
        body:  "A virtual environment is built at <code class=\"inline\">~/MEEGqc/env/</code>. MEEGqc and its dependencies will live here, separated from any other Python tools you have." },
      { title: "pip install meg-qc",
        body:  "<code class=\"inline\">pip install meg-qc</code> runs inside the venv. MNE-Python, ancpBIDS, Plotly, PyQt6, NumPy, pandas, SciPy, Numba, joblib, and the rest of the dependency tree are pulled in here." },
      { title: "Register a native launcher",
        body:  "A native launcher is registered. macOS: <code class=\"inline\">~/Applications/MEEGqc.app</code> bundle with icon. Linux: application-menu entry under <code class=\"inline\">~/.local/share/applications/</code>. Windows: Desktop shortcut + Start Menu entry." },
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

  // -------------------------------------------------------------------
  // Code copy-to-clipboard. Ported verbatim from the BIDS Manager docs.
  // For every <pre>, snapshot its plain-text contents BEFORE the button
  // is appended (so the button label is never copied along with the
  // code) and inject a small "Copy" chip. Click copies via the async
  // Clipboard API with a document.execCommand fallback for older
  // browsers / non-secure contexts. Flashes "Copied!" for 1.5 s.
  // -------------------------------------------------------------------
  function initCodeCopy() {
    const COPY_ICON = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>`;

    document.querySelectorAll("pre").forEach((pre) => {
      if (pre.dataset.copyReady) return;
      pre.dataset.copyReady = "1";

      pre.dataset.copyText = pre.textContent;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      btn.innerHTML = `${COPY_ICON}<span class="code-copy-label">Copy</span>`;
      pre.appendChild(btn);

      btn.addEventListener("click", () => copyFromPre(pre, btn));
    });

    async function copyFromPre(pre, btn) {
      const text = pre.dataset.copyText || "";
      let ok = false;
      if (navigator.clipboard?.writeText) {
        try { await navigator.clipboard.writeText(text); ok = true; }
        catch { /* fall through to legacy path */ }
      }
      if (!ok) ok = legacyCopy(text);
      flashCopy(btn, ok);
    }

    function legacyCopy(text) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }

    function flashCopy(btn, ok) {
      const label = btn.querySelector(".code-copy-label");
      if (!label) return;
      label.textContent = ok ? "Copied!" : "Failed";
      btn.classList.toggle("is-copied", ok);
      btn.classList.toggle("is-failed", !ok);
      setTimeout(() => {
        label.textContent = "Copy";
        btn.classList.remove("is-copied", "is-failed");
      }, 1500);
    }
  }

  // -------------------------------------------------------------------
  // Glass-bubble wrapper for report-section figures. Each <img> / <video>
  // gets wrapped in a `.media-frame` div so the glass highlights, ring,
  // and shatter shards clip to the media bounds (not the figcaption).
  // -------------------------------------------------------------------
  function initGlassFrames() {
    if (!document.body.classList.contains("page-reports")) return;
    document.querySelectorAll(".page-reports .figure").forEach((fig) => {
      const media = fig.querySelector(":scope > img, :scope > video");
      if (!media) return;
      if (media.parentElement.classList.contains("media-frame")) return;
      const frame = document.createElement("div");
      frame.className = "media-frame";
      media.parentNode.insertBefore(frame, media);
      frame.appendChild(media);
    });
  }

  // -------------------------------------------------------------------
  // Shatter animation: inject 6 clip-path shards into the media frame,
  // toggle .is-shattering, wait ~380 ms for the CSS animation, then
  // resolve so the caller can open the modal. Honours
  // prefers-reduced-motion (resolves immediately, no shards).
  // -------------------------------------------------------------------
  function shatterMediaFrame(figure) {
    const frame = figure.querySelector(".media-frame");
    if (!frame) return Promise.resolve();
    const reduced = window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return Promise.resolve();

    const shards = document.createElement("div");
    shards.className = "glass-shards";
    shards.setAttribute("aria-hidden", "true");
    shards.innerHTML =
      '<span class="shard s1"></span>' +
      '<span class="shard s2"></span>' +
      '<span class="shard s3"></span>' +
      '<span class="shard s4"></span>' +
      '<span class="shard s5"></span>' +
      '<span class="shard s6"></span>';
    frame.appendChild(shards);
    // Force a reflow so the animation actually starts when the class
    // is added (avoids the browser short-circuiting the transition).
    void frame.offsetWidth;
    frame.classList.add("is-shattering");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        // Clean up a tick after the modal opens so the figure is back
        // to its idle glass state when the user closes the modal.
        setTimeout(() => {
          frame.classList.remove("is-shattering");
          shards.remove();
        }, 50);
      }, 380);
    });
  }

  // -------------------------------------------------------------------
  // Generic media modal: every `.figure` (except the workflow figure,
  // which has its own custom modal) becomes click-to-expand. The
  // figure's media (img / video) is CLONED into the modal so the
  // original keeps playing in the page. The figcaption text shows
  // below the large media as the explanation. On the reports page the
  // figure shatters first (see `shatterMediaFrame`) before the modal
  // opens.
  // -------------------------------------------------------------------
  function initMediaModal() {
    if (document.querySelector("[data-media-modal]")) return;

    const modal = document.createElement("div");
    modal.className = "media-modal";
    modal.hidden = true;
    modal.setAttribute("data-media-modal", "");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="media-modal-backdrop" data-media-close></div>
      <div class="media-modal-shell">
        <button class="media-modal-close" type="button"
                data-media-close aria-label="Close">&times;</button>
        <div class="media-modal-body" data-media-modal-body></div>
        <div class="media-modal-caption" data-media-modal-caption></div>
      </div>`;
    document.body.appendChild(modal);

    const body = modal.querySelector("[data-media-modal-body]");
    const captionEl = modal.querySelector("[data-media-modal-caption]");

    function open(figure) {
      const media = figure.querySelector("img, video");
      if (!media) return;
      const clone = media.cloneNode(true);
      if (clone.tagName === "VIDEO") {
        clone.muted = true;
        clone.loop = true;
        clone.autoplay = true;
        clone.setAttribute("playsinline", "");
      }
      body.replaceChildren(clone);
      if (clone.tagName === "VIDEO") {
        clone.play().catch(() => { /* autoplay may be blocked */ });
      }
      const cap = figure.querySelector("figcaption");
      const txt = cap ? cap.textContent.trim() : "";
      captionEl.textContent = txt;
      captionEl.hidden = !txt;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function close() {
      body.replaceChildren();
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    modal.querySelectorAll("[data-media-close]").forEach((el) => {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) close();
    });

    function triggerOpen(figure) {
      // Reports-page figures shatter first, then the modal opens.
      // Elsewhere the modal opens immediately.
      if (figure.closest(".page-reports")) {
        shatterMediaFrame(figure).then(() => open(figure));
      } else {
        open(figure);
      }
    }

    document.querySelectorAll(".figure").forEach((figure) => {
      // Skip the workflow figure: it owns its own modal + popovers.
      if (figure.closest("[data-workflow]")) return;
      figure.setAttribute("tabindex", "0");
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", "Expand figure");
      figure.addEventListener("click", (e) => {
        // Allow clicks on links inside the caption to navigate normally.
        if (e.target.closest("a")) return;
        triggerOpen(figure);
      });
      figure.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerOpen(figure);
        }
      });
    });
  }

  // -------------------------------------------------------------------
  // Workflow modal (intro.html). The Expand button moves the workflow
  // figure node into the modal body on open, then back to its original
  // position on close (via a placeholder comment marker). The popover
  // JS keeps working untouched because the DOM nodes are the same.
  // -------------------------------------------------------------------
  function initWorkflowModal() {
    const expandBtn = document.querySelector("[data-workflow-expand]");
    const modal     = document.querySelector("[data-workflow-modal]");
    if (!expandBtn || !modal) return;
    const host    = modal.querySelector("[data-workflow-modal-host]");
    const figure  = document.querySelector(".workflow-figure");
    if (!host || !figure) return;

    const placeholder = document.createComment("workflow-figure-anchor");

    function open() {
      figure.parentNode.insertBefore(placeholder, figure);
      host.appendChild(figure);
      modal.removeAttribute("hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(figure, placeholder);
        placeholder.remove();
      }
      modal.setAttribute("hidden", "");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    expandBtn.addEventListener("click", open);
    modal.querySelectorAll("[data-workflow-close]").forEach((el) => {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hasAttribute("hidden")) close();
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
      initWorkflowModal();
      initInstallPipeline();
      initTabs();
      initCodeCopy();
      initGlassFrames();
      initMediaModal();
    });
  });
})();
