(() => {
  const THEME_KEY = "portfolio-theme";
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector("[data-theme-toggle]");

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  };

  const syncThemeToggle = (theme) => {
    if (!themeToggle) return;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? themeToggle.dataset.labelToLight || "Switch to light theme"
        : themeToggle.dataset.labelToDark || "Switch to dark theme"
    );
  };

  const applyTheme = (theme, { persist = false } = {}) => {
    const next = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    syncThemeToggle(next);
    if (persist) localStorage.setItem(THEME_KEY, next);
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark", { persist: true });
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    const setOpen = (isOpen) => {
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      const openLabel = navToggle.getAttribute("data-label-open") || "Open menu";
      const closeLabel = navToggle.getAttribute("data-label-close") || "Close menu";
      navToggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
    };

    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(!document.body.classList.contains("nav-open"));
    });

    nav.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setOpen(false);
      });
    });

    document.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) {
        setOpen(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 769px)").matches) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        setOpen(false);
        navToggle.focus();
      }
    });
  }

  const shareResumeBtn = document.querySelector("[data-share-resume]");

  if (shareResumeBtn) {
    const probeFile = new File(["."], "resume.pdf", { type: "application/pdf" });
    const canShareResume =
      typeof navigator.share === "function" &&
      !!navigator.canShare?.({ files: [probeFile] });

    // Remove instead of [hidden]: .btn { display } overrides the hidden attribute.
    if (!canShareResume) {
      shareResumeBtn.remove();
    } else {
      shareResumeBtn.addEventListener("click", async () => {
        const relativeUrl = shareResumeBtn.dataset.shareUrl;
        if (!relativeUrl) return;

        const absoluteUrl = new URL(relativeUrl, window.location.href).href;
        const filename =
          shareResumeBtn.dataset.shareFilename || "Roman-Sarviro-Resume.pdf";
        const title = shareResumeBtn.dataset.shareTitle || document.title;
        const text = shareResumeBtn.dataset.shareText || title;

        try {
          const response = await fetch(absoluteUrl);
          if (!response.ok) throw new Error("Failed to fetch resume");
          const blob = await response.blob();
          const file = new File([blob], filename, {
            type: blob.type || "application/pdf",
          });

          await navigator.share({ files: [file], title, text });
        } catch (error) {
          if (error && error.name === "AbortError") return;
        }
      });
    }
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (!prefersReduced) {
    const clearCaseMotionStyles = (el) => {
      el.style.animation = "";
      el.style.transition = "";
      el.style.transform = "";
      el.style.opacity = "";
    };

    const getCaseMovers = (caseEl) => {
      const svg = caseEl.querySelector(".case-visual-svg");
      if (!svg) return [];
      if (svg.classList.contains("case-visual-svg--wheat")) {
        return Array.from(svg.querySelectorAll(".viz-ear, .viz-sun"));
      }
      return [svg];
    };

    const settleCaseMotion = (caseEl) => {
      const visual = caseEl.querySelector(".case-visual");
      if (!visual) return;

      const styles = getComputedStyle(visual);
      const duration = styles.getPropertyValue("--case-motion-duration").trim() || "1.5s";
      const ease = styles.getPropertyValue("--case-motion-ease").trim() || "ease-in-out";

      getCaseMovers(caseEl).forEach((el) => {
        const computed = getComputedStyle(el);
        const transform = computed.transform;
        const opacity = computed.opacity;

        el.style.animation = "none";
        el.style.transition = "none";
        el.style.transform = transform === "none" ? "none" : transform;
        if (el.classList.contains("viz-sun")) el.style.opacity = opacity;

        void el.getBoundingClientRect();

        el.style.transition = `transform ${duration} ${ease}, opacity ${duration} ${ease}`;
        el.style.transform = "none";
        if (el.classList.contains("viz-sun")) el.style.opacity = "1";

        const onEnd = (event) => {
          if (event.target !== el) return;
          if (event.propertyName !== "transform" && event.propertyName !== "opacity") return;
          el.removeEventListener("transitionend", onEnd);
          clearCaseMotionStyles(el);
        };

        el.addEventListener("transitionend", onEnd);
      });
    };

    const activateCaseMotion = (caseEl) => {
      getCaseMovers(caseEl).forEach(clearCaseMotionStyles);
      caseEl.classList.add("is-hot");
    };

    const deactivateCaseMotion = (caseEl) => {
      if (!caseEl.classList.contains("is-hot")) return;
      caseEl.classList.remove("is-hot");
      settleCaseMotion(caseEl);
    };

    document.querySelectorAll(".case").forEach((caseEl) => {
      caseEl.addEventListener("pointerenter", () => activateCaseMotion(caseEl));
      caseEl.addEventListener("pointerleave", () => deactivateCaseMotion(caseEl));
      caseEl.addEventListener("focusin", () => activateCaseMotion(caseEl));
      caseEl.addEventListener("focusout", (event) => {
        if (!caseEl.contains(event.relatedTarget)) deactivateCaseMotion(caseEl);
      });
    });
  }

  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const markIfVisible = (el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add("is-visible");
      return true;
    }
    return false;
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach((el) => {
      if (!markIfVisible(el)) observer.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
