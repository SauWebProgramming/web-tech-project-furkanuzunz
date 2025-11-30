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
      <h1>Hakkımda</h1>
      <p>
        Merhaba, ben <strong>Furkan Uzun</strong>. Sakarya Üniversitesi'nde Bilgi Sistemleri
        Mühendisliği öğrencisiyim. Web teknolojileri, veri bilimi ve yapay zeka alanlarında
        kendimi geliştirmeye çalışıyorum. Hem okul projeleri hem de yarışmalar üzerinden
        gerçek problemlere çözüm üretmeyi seviyorum.
      </p>

      <h2>Öne Çıkan Bilgiler</h2>
      <ul>
        <li>🎓 Sakarya Üniversitesi – Bilgi Sistemleri Mühendisliği</li>
        <li>🧠 İlgi alanlarım: Web geliştirme, veri bilimi, yapay zeka, veri tabanı tasarımı</li>
        <li>🏕 Hobilerim: Motosiklet, doğa/kamp, kulüp etkinlikleri</li>
      </ul>

      <h2>Şu An Odaklandığım Konular</h2>
      <ul>
        <li>Modern web teknolojileri (HTML, CSS, JavaScript, SPA yapıları)</li>
        <li>.NET, C++, Python ile proje geliştirme</li>
        <li>Yarışma ve proje odaklı çalışma (Teknofest, üniversite projeleri vb.)</li>
      </ul>
    </section>
  `;
}

// Projelerim sayfası - JSON'dan dinamik yüklenen sürüm
async function renderProjects() {
  // İlk etapta "yükleniyor" yazalım
  appRoot.innerHTML = `
    <section class="page page-projects">
      <h1>Projelerim</h1>
      <p>Projeler yükleniyor...</p>
    </section>
  `;

  const projects = await loadProjects();

  // Eğer hiçbir proje gelemezse
  if (!projects || projects.length === 0) {
    appRoot.innerHTML = `
      <section class="page page-projects">
        <h1>Projelerim</h1>
        <p>Şu anda gösterilecek proje bulunamadı.</p>
      </section>
    `;
    return;
  }

  // Kartları HTML string olarak oluştur
  const cardsHtml = projects
    .map(
      (project) => `
      <article class="project-card">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p><strong>Etiketler:</strong> ${project.tags.join(", ")}</p>
      </article>
    `
    )
    .join("");

  // Son halini sayfaya bas
  appRoot.innerHTML = `
    <section class="page page-projects">
      <h1>Projelerim</h1>
      ${cardsHtml}
    </section>
  `;
}


function renderSkills() {
  appRoot.innerHTML = `
    <section class="page page-skills">
      <h1>Yetenekler</h1>
      <p>Aktif olarak kullandığım ve öğrenme sürecinde olduğum teknolojiler:</p>

      <div class="skills-grid">
        <div class="skill-group">
          <h2>Programlama Dilleri</h2>
          <ul>
            <li>C, C++</li>
            <li>C#</li>
            <li>Python</li>
            <li>Java (başlangıç)</li>
          </ul>
        </div>

        <div class="skill-group">
          <h2>Web Teknolojileri</h2>
          <ul>
            <li>HTML5, CSS3</li>
            <li>JavaScript (ES6+)</li>
            <li>.NET / ASP.NET (öğrenme aşamasında)</li>
          </ul>
        </div>

        <div class="skill-group">
          <h2>Araçlar & Diğer</h2>
          <ul>
            <li>Git & GitHub</li>
            <li>VS Code, Visual Studio</li>
            <li>PostgreSQL / SQL</li>
            <li>Linux komut satırı temelleri</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderContact() {
  appRoot.innerHTML = `
    <section class="page page-contact">
      <h1>İletişim</h1>
      <p>
        Projelerim, iş birlikleri veya sadece selam vermek için benimle iletişime geçebilirsin.
        Aşağıdaki formu doldurduğunda, mesajının gönderildiğine dair bir bilgilendirme göreceksin.
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
    </section>
  `;

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
