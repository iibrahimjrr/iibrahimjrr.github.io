// ===== INTERACTIONS.JS =====
// All user-interaction logic: tilt, parallax, theme, nav, modal, scroll.

/* -------- 3D Parallax on profile photo -------- */
function initPhotoParallax() {
  const outer = document.getElementById("photoCardOuter");
  const card  = document.getElementById("photoCard");
  if (!outer || !card) return;

  outer.addEventListener("mousemove", (e) => {
    const rect = outer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });

  outer.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  });
}

/* -------- 3D tilt on project cards -------- */
function initProjectTilt() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* -------- Theme toggle -------- */
function initTheme() {
  let isDark = true;
  const btn      = document.getElementById("btnTheme");
  const iconEl   = document.getElementById("iconTheme");

  btn.addEventListener("click", () => {
    isDark = !isDark;
    document.documentElement.classList.toggle("dark",  isDark);
    document.documentElement.classList.toggle("light", !isDark);
    iconEl.setAttribute("data-lucide", isDark ? "sun" : "moon");
    lucide.createIcons();
  });
}

/* -------- Active nav on scroll -------- */
function initActiveNav() {
  const sections = ["home", "skills", "projects", "experience", "contact"];
  const links    = document.querySelectorAll(".nav-links a");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY + 200;
      sections.forEach((id) => {
        const sec = document.getElementById(id);
        if (!sec) return;
        if (sec.offsetTop <= scrollY && sec.offsetTop + sec.offsetHeight > scrollY) {
          links.forEach((a) =>
            a.classList.toggle("active", a.dataset.section === id)
          );
        }
      });
    },
    { passive: true }
  );
}

/* -------- Hamburger menu -------- */
function initHamburger() {
  const btn        = document.getElementById("btnMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  btn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.remove("open"))
  );
}

/* -------- CV Modal -------- */
function initModal() {
  const overlay   = document.getElementById("cvModal");
  const btnOpen   = document.getElementById("btnCV");
  const btnClose  = document.getElementById("closeModal");

  function open() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    // Animate CV skill bars after transition
    setTimeout(() => {
      overlay.querySelectorAll(".cv-bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.level + "%";
      });
    }, 200);
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  btnOpen.addEventListener("click", open);
  btnClose.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* -------- Intersection Observer: reveal + skill bars -------- */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          // Animate skill bar fills when card enters view
          e.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
            bar.style.width = bar.dataset.level + "%";
          });
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* -------- Export init function -------- */
function initInteractions() {
  initPhotoParallax();
  initProjectTilt();
  initTheme();
  initActiveNav();
  initHamburger();
  initModal();
  initReveal();
}
