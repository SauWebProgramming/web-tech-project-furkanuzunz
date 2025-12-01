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