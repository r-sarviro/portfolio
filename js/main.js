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
      if (window.matchMedia("(min-width: 861px)").matches) {
        setOpen(false);
      }
    });
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

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
