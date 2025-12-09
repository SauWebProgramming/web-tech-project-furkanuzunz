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


function renderContact() {
  appRoot.innerHTML = `
    <section class="page page-contact">
      <!-- Üst kısım: solda logo/metin, sağda iletişim bilgilerim -->
      <div class="contact-layout">
        <div class="contact-brand">
          <span class="contact-logo">&lt;/Furkan&gt;</span>
          <p class="contact-text">
            Eğer projelerim ilginizi çektiyse veya bir iş / proje fikriniz varsa,
            benimle iletişime geçmekten çekinmeyin. Yeni fikirler, iş birlikleri ve
            yarışma/proje ekipleri için her zaman açığım.
          </p>
        </div>

        <div class="contact-info">
          <h2>Contacts</h2>
          <ul class="contact-list">
            <li>
              <span class="contact-icon">✉️</span>
              <div>
                <span class="contact-label">E-posta</span>
                <a href="mailto:furkan@example.com">furkan.uzun4@ogr.sakarya.edu.tr</a>
              </div>
            </li>

            <li>
              <span class="contact-icon">💻</span>
              <div>
                <span class="contact-label">GitHub</span>
                <a href="https://github.com/furkanuzunz" target="_blank" rel="noopener noreferrer">
                  github.com/furkanuzunz
                </a>
              </div>
            </li>

            <li>
              <span class="contact-icon">🔗</span>
              <div>
                <span class="contact-label">LinkedIn</span>
                <a href="https://www.linkedin.com/in/furkanuzunz" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/furkanuzunz
                </a>
              </div>
            </li>

            <li>
              <span class="contact-icon">📷</span>
              <div>
                <span class="contact-label">Instagram</span>
                <a href="https://www.instagram.com/furknuzn_" target="_blank" rel="noopener noreferrer">
                  @furknuzn_
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Alt kısım: bizim form (validasyonlu) -->
      <div class="contact-form-wrapper">
        <h2>Mesaj Gönder</h2>
        <p class="contact-form-subtitle">
          Merhaba. Mesajınızı gönderdikten sonra doğrulama sonucunu sayfa üzerinde göreceksiniz.
        </p>

        <form id="contact-form" class="contact-form" novalidate>
          <div class="form-group">
            <label for="name">Ad Soyad</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div class="form-group">
            <label for="email">E-posta</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div class="form-group">
            <label for="message">Mesaj</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>

          <button type="submit">Gönder</button>
          <p id="form-message" class="form-message"></p>
        </form>
      </div>
    </section>
  `;
  // Form doğrulama JS (öncekini aynen koruyoruz)
  const form = document.getElementById("contact-form");
  const messageEl = document.getElementById("form-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      messageEl.textContent = "Lütfen tüm alanları doldurun.";
      messageEl.style.color = "red";
      return;
    }

    if (!email.includes("@")) {
      messageEl.textContent = "Lütfen geçerli bir e-posta adresi girin.";
      messageEl.style.color = "red";
      return;
    }

    if (message.length < 10) {
      messageEl.textContent = "Mesajınız en az 10 karakter olmalı.";
      messageEl.style.color = "red";
      return;
    }

    messageEl.textContent = "Mesajınız alındı, teşekkürler!";
    messageEl.style.color = "green";
    form.reset();
  });
}



// === NAVDA AKTİF LİNK ===
function setActiveNav(hash) {
  navLinkEls.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// === ROUTER ===
function router() {
  let hash = window.location.hash;

  if (!hash) {
    hash = "#/about";
  }

  switch (hash) {
    case "#/about":
      renderAbout();
      break;
    case "#/projects":
      renderProjects();
      break;
    case "#/skills":
      renderSkills();
      break;
    case "#/contact":
      renderContact();
      break;
    default:
      renderAbout();
      hash = "#/about";
      break;
  }

  setActiveNav(hash);
}

// Hash değişince router'ı çalıştır
window.addEventListener("hashchange", router);

// Sayfa ilk açıldığında
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#/about";
  } else {
    router();
  }
});


