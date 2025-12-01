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
