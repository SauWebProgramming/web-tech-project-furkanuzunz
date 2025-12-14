// ==========================================================
//  TEMEL ELEMANLAR
//  Burada SPA yapımda sık sık kullanacağım temel DOM referanslarını alıyorum.
// ==========================================================
const appRoot = document.getElementById("app-root");        // Tüm sayfa içeriklerini dinamik olarak bastığım ana konteyner.
const navToggle = document.querySelector(".nav-toggle");    // Mobilde görünen hamburger menü butonu.
const navLinks = document.querySelector(".nav-links");      // Menü listesinin kendisi (ul).
const navLinkEls = document.querySelectorAll(".nav-links a"); // Tüm nav linklerini seçiyorum, aktif class yönetimi için.

// ==========================================================
//  MOBİL NAVİGASYON (HAMBURGER MENÜ)
//  Küçük ekranlarda menüyü aç/kapatmak için toggle yapıyorum.
// ==========================================================
if (navToggle) {
  navToggle.addEventListener("click", () => {
    // .open sınıfını ekleyip çıkararak menünün görünürlüğünü kontrol ediyorum.
    navLinks.classList.toggle("open");
  });
}

// ==========================================================
//  PROJELERİ JSON DOSYASINDAN ÇEKEN FONKSİYON
//  Bu fonksiyonda fetch + async/await kullanarak dışarıdaki projects.json
//  dosyasından proje verilerini alıyorum.
//
//  Bu sayede projeler statik HTML olarak yazılmak yerine JSON üzerinden
//  dinamik olarak yönetilebiliyor.
// ==========================================================
async function loadProjects() {
  try {
    // JSON dosyasını istek atarak çekiyorum.
    const response = await fetch("assets/data/projects.json");

    // Eğer istek başarısızsa (404, 500 vs.) hata fırlatıyorum.
    if (!response.ok) {
      throw new Error("Projeler yüklenemedi");
    }

    // Gelen cevabı JSON formatına çeviriyorum.
    const data = await response.json();
    return data; // Dizi olarak projeler burada dönüyor.
  } catch (error) {
    // Hata olursa hem konsola yazıyorum hem de fonksiyonu boş dizi ile sonuçlandırıyorum.
    console.error("Projeler yüklenirken hata:", error);
    return []; // Hata durumunda uygulamanın kırılmaması için boş dizi döndürdüm.
  }
}

// ==========================================================
//  HAKKIMDA SAYFASINI RENDER EDEN FONKSİYON
//  Burada About/Hakkımda sayfasının HTML içeriğini tek seferde oluşturup
//  appRoot içine basıyorum.
// ==========================================================
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

// ==========================================================
//  PROJELER SAYFASI (My Works) – JSON + DİNAMİK KARTLAR
//  Bu fonksiyonda önce bir "iskelet" HTML bastıktan sonra
//  loadProjects() ile verileri çekip kartları oluşturuyorum.
// ==========================================================
async function renderProjects() {
  // İlk etapta kullanıcıya bir yükleniyor mesajı göstermek için temel HTML'i yazıyorum.
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

  // JSON'dan proje verilerini çekiyorum.
  const projects = await loadProjects();
  const grid = document.getElementById("projects-grid");

  // Eğer veri yoksa veya hata alınmışsa kullanıcıya bilgi veriyorum.
  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <p class="projects-empty">
        Şu anda listelenecek proje bulunamadı.
      </p>
    `;
    return;
  }

  // Her proje için HTML kartı oluşturuyorum.
  const cardsHtml = projects
    .map((project) => {
      // JSON'da link varsa "See more" butonunu aktif ediyorum,
      // yoksa butonu hiç göstermiyorum.
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

  // Oluşturduğum tüm kartları grid içine tek seferde yazıyorum.
  grid.innerHTML = cardsHtml;
}

// ==========================================================
//  YETENEKLER SAYFASI (My Skills)
//  Burada sık kullandığım teknolojileri ikon kartları şeklinde gösteriyorum.
//  İçerik statik ama tasarım daha görsel bir yapı üzerine kurulu.
// ==========================================================
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
            <!-- Burada HTML5 logosunu kullanarak görsel bir ikon gösteriyorum. -->
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

// ==========================================================
//  İLETİŞİM (CONTACT) SAYFASI
//  Bu sayfada iki bölüm var:
//  1) Üstte iletişim bilgilerim (mail, GitHub, LinkedIn, Instagram)
//  2) Altta kullanıcıdan mesaj alan, JS ile doğrulama yaptığım form.
// ==========================================================
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
                <a href="mailto:furkan.uzun4@ogr.sakarya.edu.tr">furkan.uzun4@ogr.sakarya.edu.tr</a>
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

  // ========================================================
  //  FORM DOĞRULAMA KISMI
  //  Burada tamamen frontend tarafında basit bir validasyon yapıyorum.
  //  Böylece kullanıcıya anında geri bildirim vermiş oluyorum.
  // ========================================================
  const form = document.getElementById("contact-form");
  const messageEl = document.getElementById("form-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Formun sayfayı yenilemesini engelliyorum.

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Boş alan kontrolü
    if (!name || !email || !message) {
      messageEl.textContent = "Lütfen tüm alanları doldurun.";
      messageEl.style.color = "red";
      return;
    }

    // Basit e-posta format kontrolü (temel seviye)
    if (!email.includes("@")) {
      messageEl.textContent = "Lütfen geçerli bir e-posta adresi girin.";
      messageEl.style.color = "red";
      return;
    }

    // Mesaj uzunluğu kontrolü
    if (message.length < 10) {
      messageEl.textContent = "Mesajınız en az 10 karakter olmalı.";
      messageEl.style.color = "red";
      return;
    }

    // Tüm kontroller geçtiyse başarı mesajı gösteriyorum.
    messageEl.textContent = "Mesajınız alındı, teşekkürler!";
    messageEl.style.color = "green";
    form.reset(); // Formu sıfırlıyorum.
  });
}

// ==========================================================
//  NAV'DA AKTİF LİNK YÖNETİMİ
//  SPA yapısında hash değiştikçe, menüde hangi sayfanın aktif olduğunu
//  görsel olarak göstermek için bu fonksiyonu kullanıyorum.
// ==========================================================
function setActiveNav(hash) {
  navLinkEls.forEach((link) => {
    // Linkin href'i şu anki hash ile aynıysa aktif yapıyorum, değilse siliyorum.
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ==========================================================
//  ROUTER FONKSİYONU
//  Bu fonksiyon, URL'deki hash'e göre hangi sayfanın render edileceğine karar veriyor.
//  Yani burası basit bir "client-side router" gibi çalışıyor.
// ==========================================================
function router() {
  let hash = window.location.hash;

  // Eğer hash yoksa varsayılan sayfayı Hakkımda (/about) olarak ayarlıyorum.
  if (!hash) {
    hash = "#/about";
  }

  // Hash değerine göre ilgili sayfa render fonksiyonunu çağırıyorum.
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
      // Geçersiz bir hash gelirse kullanıcıyı Hakkımda sayfasına yönlendiriyorum.
      renderAbout();
      hash = "#/about";
      break;
  }

  // Sayfa değiştiğinde nav'da aktif linki güncelliyorum.
  setActiveNav(hash);
}

// ==========================================================
//  OLAY DİNLEYİCİLERİ (EVENT LISTENERS)
// ==========================================================

// Hash değiştiğinde (kullanıcı menüye tıkladığında veya URL bar'ı elle değiştirdiğinde)
// router'ı tekrar çalıştırıyorum.
window.addEventListener("hashchange", router);

// Sayfa ilk yüklendiğinde (F5 veya ilk giriş)
// Eğer hash yoksa #/about ile başlatıyorum, varsa direkt router'ı çağırıyorum.
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#/about";
  } else {
    router();
  }
});
