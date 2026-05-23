// ===== RENDER.JS =====
// Functions that build all dynamic HTML from DATA object.

function renderStats() {
  const el = document.getElementById("heroStats");
  el.innerHTML = DATA.stats
    .map(
      (s) => `
    <div>
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
    )
    .join("");
}

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = DATA.skills
    .map(
      (s, i) => `
    <div class="skill-card reveal" style="transition-delay:${i * 0.05}s">
      <div class="skill-header">
        <div class="skill-icon">
          <i data-lucide="${s.icon}" style="width:24px;height:24px"></i>
        </div>
        <div>
          <div class="skill-name">${s.name}</div>
          <div class="skill-pct">${s.level}%</div>
        </div>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-level="${s.level}"></div>
      </div>
    </div>`
    )
    .join("");
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");

  grid.innerHTML = DATA.projects
    .map(
      (p, i) => `
    <div class="project-card reveal" style="transition-delay:${i * 0.08}s">
      <div class="project-img-wrap">
        <img src="${p.img}" alt="${p.title}" loading="lazy"/>
        <div class="project-img-overlay"></div>

        <!-- GitHub Link -->
        ${p.github ? `
        <a class="project-link-icon" href="${p.github}" target="_blank">
        <i data-lucide="code-2" style="width:16px;height:16px"></i>
        </a>` : ""}

        <!-- Live Demo Link -->
        ${p.liveDemo ? `
        <a class="project-demo-icon" href="${p.liveDemo}" target="_blank">
          <i data-lucide="external-link" style="width:16px;height:16px"></i>
        </a>` : ""}

      </div>

      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>

        <div class="project-tags">
          ${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>

        <div class="project-impact">
          <span>Impact: </span><strong>${p.impact}</strong>
        </div>
      </div>
    </div>`
    )
    .join("");
}

function renderExperience() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = DATA.experience
    .map(
      (e, i) => `
    <div class="exp-item reveal" style="transition-delay:${i * 0.15}s">
      <div class="exp-card-wrap">
        <div class="exp-card">
          <div class="exp-role">${e.role}</div>
          <div class="exp-company">${e.company}</div>
          <div class="exp-period">${e.period}</div>
          <ul class="exp-achievements">
            ${e.achievements
              .map((a) => `<li><span class="arrow">▸</span>${a}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
      <div class="exp-dot"></div>
    </div>`
    )
    .join("");
}

function renderCVExperience() {
  const el = document.getElementById("cvExperience");
  el.innerHTML = DATA.cvExperience
    .map(
      (j) => `
    <div class="cv-exp-item">
      <div class="cv-exp-role">${j.role}</div>
      <div class="cv-exp-company">${j.company}</div>
      <div class="cv-exp-period">${j.period}</div>
      <ul>
        ${j.points
          .map((p) => `<li><span>▸</span>${p}</li>`)
          .join("")}
      </ul>
    </div>`
    )
    .join("");
}

function renderCVSkills() {
  const el = document.getElementById("cvSkills");
  el.innerHTML = DATA.cvSkills
    .map(
      (s) => `
    <div class="cv-skill-row">
      <div class="cv-skill-label">
        <span>${s.label}</span>
        <span>${s.pct}%</span>
      </div>
      <div class="cv-bar-bg">
        <div class="cv-bar-fill" data-level="${s.pct}"></div>
      </div>
    </div>`
    )
    .join("");
}

function renderAll() {
  // Profile photo src
  document.getElementById("profileImg").src = "assets/profile.jpg";
  document.getElementById("cvPhotoImg").src = "assets/profile.jpg";

  // Text fields
  document.getElementById("navName").textContent     = DATA.name;
  document.getElementById("heroLabel").textContent   = DATA.subtitle;
  document.getElementById("heroDesc").textContent    = DATA.description;
  document.getElementById("cvName").textContent      = DATA.name;
  document.getElementById("cvRole").textContent      = DATA.title;
  document.getElementById("cvSummary").textContent   = DATA.summary;
  document.getElementById("cvLocation").textContent  = `📍 ${DATA.location}`;
  document.getElementById("cvEmail").textContent     = `📧 ${DATA.email}`;
  document.getElementById("cvLinkedin").textContent  = `💼 linkedin.com/in/iibrahimjrr`;
  document.getElementById("cvGithub").textContent    = `🐙 github.com/iibrahimjrr`;
  // Social links
  document.querySelectorAll(".link-github").forEach((a) => (a.href = DATA.github));
  document.querySelectorAll(".link-linkedin").forEach((a) => (a.href = DATA.linkedin));
  document.querySelectorAll(".link-email").forEach((a) => (a.href = `mailto:${DATA.email}`));
  document.querySelectorAll(".link-instagram").forEach((a) => (a.href = DATA.IG));

  // Sections
  renderStats();
  renderSkills();
  renderProjects();
  renderExperience();
  renderCVExperience();
  renderCVSkills();
}
