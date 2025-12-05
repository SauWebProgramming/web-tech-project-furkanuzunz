// === TEMEL ELEMANLAR ===
const appRoot = document.getElementById("app-root");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkEls = document.querySelectorAll(".nav-links a");

// Mobilde hamburger menüyü aç/kapat
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// === SAYFA RENDER FONKSİYONLARI ===


// === PROJELERİ JSON'DAN ÇEKEN FONKSİYON ===
async function loadProjects() {
  try {
    const response = await fetch("assets/data/projects.json");

    if (!response.ok) {
      throw new Error("Projeler yüklenemedi");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Projeler yüklenirken hata:", error);
    return []; // Hata olursa boş dizi döneriz
  }
}

function renderAbout() {
  appRoot.innerHTML = `
    <section class="page page-about">
      <div class="about-hero">
        <div class="about-hero-left">
          <p class="about-role-label">Bilişim Sistemleri Mühendisliği Öğrencisi</p>
          <h1 class="about-name">Furkan Uzun</h1>
          <p class="about-title">Web &amp; AI Developer</p>

          <p class="about-short">
            Web teknolojileri, veri bilimi ve yapay zeka alanlarında kendimi geliştiren bir
            geliştiriciyim. Hem okul projeleri hem de yarışmalar üzerinden gerçek problemlere
            çözümler üretmeyi seviyorum.
          </p>
        </div>

        <div class="about-hero-right">
          <div class="about-photo-wrapper">
            <div class="about-photo-blob"></div>
            <img
              src="assets/img/profile.jpg"
              alt="Furkan Uzun"
              class="about-photo-img"
            />
          </div>
        </div>
      </div>

      <div class="about-bottom">
        <div class="about-bottom-badge"></div>
        <p class="about-bottom-text">
          Birkaç yıldır yazılım geliştirme ve özellikle web teknolojileriyle ilgileniyorum.
          Farklı ders projeleri, yarışmalar ve topluluk çalışmaları sayesinde hem teknik
          becerilerimi hem de ekip çalışması deneyimimi artırıyorum. Şu anda odak noktam;
          modern web arayüzleri geliştirmek ve yapay zeka projeleriyle gerçek problemlere
          çözümler üretmek.
        </p>
      </div>
    </section>
  `;
}


// Projelerim sayfası - Figma tarzı "My Works" görünüm
async function renderProjects() {
  // İlk yüklenirken iskelet
  appRoot.innerHTML = `
    <section class="page page-projects">
      <h1 class="projects-title">My Works</h1>
      <p class="projects-subtitle">
        Üzerinde çalıştığım ve beni en çok geliştiren projelerden bazıları:
      </p>

      <div class="projects-grid" id="projects-grid">
        <p class="projects-loading">Projeler yükleniyor...</p>
      </div>
    </section>
  `;

  const projects = await loadProjects();
  const grid = document.getElementById("projects-grid");

  // Hata / boş durum
  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <p class="projects-empty">
        Şu anda listelenecek proje bulunamadı.
      </p>
    `;
    return;
  }

  // Her proje için kart oluştur
  const cardsHtml = projects
  .map((project) => {
    // link varsa buton, yoksa boş string
    const buttonHtml = project.link
      ? `<a href="${project.link}" class="project-btn" target="_blank" rel="noopener noreferrer">
           See more →
         </a>`
      : "";

    return `
      <article class="project-card">
        <div class="project-card-header">
          <h2 class="project-title">${project.title}</h2>
          <p class="project-tags">${project.tags.join(" • ")}</p>
        </div>

        <p class="project-desc">
          ${project.description}
        </p>

        ${buttonHtml}
      </article>
    `;
  })
  .join("");


  grid.innerHTML = cardsHtml;
}



function renderSkills() {
  appRoot.innerHTML = `
    <section class="page page-skills">
      <h1 class="skills-title">My Skills</h1>
      <p class="skills-subtitle">
        Günlük hayatta en çok kullandığım ve üzerine çalıştığım teknolojiler:
      </p>

      <div class="skills-grid-icons">

        <div class="skill-card-icon">
          <div class="skill-icon-box">
            <!-- İstersen buraya img koyabilirsin -->
            <img src="assets/img/html-5.png" alt="HTML5" />
          </div>
          <p class="skill-name">HTML5</p>
        </div>

        <div class="skill-card-icon">
          <div class="skill-icon-box">
            <img src="assets/img/css-3.png" alt="CSS3" />
          </div>
          <p class="skill-name">CSS3</p>
        </div>

         <div class="skill-card-icon">
          <div class="skill-icon-box">
            <img src="assets/img/java-script.png" alt="JavaScript" />
          </div>
          <p class="skill-name">JavaScript</p>
        </div>

        <div class="skill-card-icon">
          <div class="skill-icon-box">
            <img src="assets/img/python.png" alt="python" />
          </div>
          <p class="skill-name">Python / Ai</p>
        </div>

        <div class="skill-card-icon">
          <div class="skill-icon-box">
            <img src="assets/img/github.png" alt="Git" />
          </div>
          <p class="skill-name">Git & Github</p>
        </div>

        <div class="skill-card-icon">
          <div class="skill-icon-box">
            <img src="assets/img/database.png" alt="sql" />
          </div>
          <p class="skill-name">SQL</p>
        </div>

        </div>
    </section>
  `;
}
