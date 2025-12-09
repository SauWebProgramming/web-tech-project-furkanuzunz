[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Xg2jV1i2)

# ISE-201 Web Teknolojileri – Proje Ödevi

## Öğrenci Bilgisi

**Ad Soyad:** Furkan Uzun  
**Öğrenci No:** (buraya kendi numaranı yazacaksın)  
**Ders:** ISE-201 Web Teknolojileri  

---

## Proje Başlığı

**Single Page Application (SPA) Portfolyo Sitesi**

Bu proje, ISE-201 Web Teknolojileri dersi kapsamında geliştirilmiş, tek sayfa üzerinde çalışan bir **SPA (Single Page Application) portfolyo sitesi**dir. Uygulama tamamen **HTML5**, **CSS3** ve **modern JavaScript (ES6+)** kullanılarak geliştirilmiştir.

---

## Projenin Amacı

Bu projenin temel amacı, JavaScript kullanarak tek bir HTML sayfası üzerinde dinamik içerik yönetimi yapmak ve modern web geliştirme tekniklerini uygulamaktır.

Amaçlanan teknik kazanımlar:

- SPA (Single Page Application) routing mantığını öğrenmek  
- `fetch()` ile JSON dosyasından veri okumak  
- Responsive (mobil uyumlu) bir arayüz tasarlamak  
- HTML5 form doğrulama + JavaScript ile ekstra doğrulama yapmak  
- Git ve GitHub Pages ile sürümleme ve dağıtım sürecini uygulamak  

---

## Proje Özeti

Bu portfolyo sitesinde aşağıdaki bölümler bulunmaktadır:

- **Hakkımda**
- **Projelerim**
- **Yetenekler**
- **İletişim**

Tüm bu sayfalar, tek bir HTML dosyası üzerinde **JavaScript ile dinamik olarak** yönetilmektedir:

- Menüdeki bağlantılara tıklandığında sayfa **yenilenmez**, sadece içerik değişir.  
- URL’de hash bölümü (`#/about`, `#/projects`, `#/skills`, `#/contact`) güncellenir.  
- JavaScript tarafındaki `router()` fonksiyonu bu hash değerini okuyarak doğru bölümü render eder.  
- “Projelerim” sayfasındaki projeler, yerel bir JSON dosyasından (`projects.json`) `fetch()` ile okunur ve kartlar halinde gösterilir.  
- İletişim formu, hem HTML5 form kuralları hem de JavaScript ile (boş alan, mail formatı, mesaj uzunluğu vb.) kontrol edilir.  
- Tasarım, masaüstü ve mobil cihazlarda düzgün çalışacak şekilde responsive hazırlanmıştır.  

---

## Kullanılan Teknolojiler

- **HTML5 (Semantic Elements)**  
  - `header`, `nav`, `main`, `section`, `article`, `footer` vb.

- **CSS3**  
  - Flexbox  
  - Grid (bazı kısımlarda)  
  - Media queries ile responsive tasarım  
  - Kart tasarımları, hover efektleri, temel gölge ve köşe yuvarlama kullanımı  

- **JavaScript (ES6+)**  
  - `const` ve `let` kullanımı  
  - Arrow function’lar  
  - `async / await` yapısı  
  - DOM manipülasyonu ile içerik render etme  

- **fetch API**  
  - `/assets/data/projects.json` içindeki projeleri asenkron olarak okuma  
  - JSON verisini parçalayarak DOM’a basma  

- **JSON**  
  - Proje kartlarının başlık, etiket ve açıklama verileri için yapılandırılmış veri kaynağı  

- **Git & GitHub**  
  - Projenin versiyon kontrolü  
  - GitHub repository üzerinde tutulması  

- **GitHub Pages**  
  - Projenin canlı ortamda yayınlanması  

---

## Proje Dosya Yapısı

```text
/
├── index.html          # Ana HTML dosyası (uygulama giriş noktası)
├── README.md           # Bu açıklama dosyası
└── assets/
    ├── css/
    │   └── style.css   # Tüm stil dosyaları
    ├── js/
    │   └── app.js      # SPA router, sayfa render fonksiyonları, form doğrulama
    ├── data/
    │   └── projects.json   # Proje kartlarının verilerini içeren JSON dosyası
    └── img/
        └── ...         # Skill ikonları, profil fotoğrafı vb.


## 🧭 SPA Router Mantığı

Projede geleneksel çok sayfalı yapı yerine, **hash tabanlı bir SPA router** kullanılmıştır.

### 🔧 Temel Çalışma Mantığı

1. **Kullanıcı menüde bir bağlantıya tıklar:**
   - `Hakkımda` → `#/about`
   - `Projelerim` → `#/projects`
   - `Yetenekler` → `#/skills`
   - `İletişim` → `#/contact`

2. **URL’deki `window.location.hash` değiştiğinde** `router()` fonksiyonu otomatik olarak tetiklenir.

3. **router() fonksiyonu**, hash değerine göre ilgili render fonksiyonunu çağırır:

   | Hash değeri      | Çalışan fonksiyon     |
   |------------------|------------------------|
   | `#/about`        | `renderAbout()`        |
   | `#/projects`     | `renderProjects()`     |
   | `#/skills`       | `renderSkills()`       |
   | `#/contact`      | `renderContact()`      |

4. Seçilen sayfaya ait HTML içeriği, JavaScript içinde oluşturulur ve şu şekilde DOM’a eklenir:

```js
document.getElementById("app-root").innerHTML = "...";

5.Bu sayede kullanıcı farklı sayfalara geçerken tam sayfa yenilenmesi olmaz, yalnızca ilgili içerik güncellenir.
Böylece uygulama SPA (Single Page Application) gibi davranır.

🚀 Projenin Çalıştırılması

Bu proje tamamen statiktir; backend gerektirmez.
Çalıştırmak için yalnızca bir tarayıcı yeterlidir.

🔽 1. Repository’yi İndir
git clone <repo-linki>

📁 2. Proje Klasörüne Gir
cd proje-klasoru

🌐 3. index.html Dosyasını Aç

Açmanın iki yolu vardır:

Dosyaya çift tıklayarak

Tarayıcıda File > Open menüsünden seçerek

Ardından:

Menüden sayfalar arasında geçiş yapabilirsin

Projeler bölümündeki JSON’dan gelen verileri görebilirsin

İletişim formu doğrulamasını test edebilirsin

## GitHub Pages Üzerinde Yayına Alma

GitHub Pages ile projeyi canlıya almak için:

1.Repository ayarlarına gir (Settings)

2.Sol menüden Pages bölümüne tıkla

3."Branch" alanını:

main (veya master)

/root
olarak ayarla

4.Kaydet → GitHub birkaç dakika içinde sana bir URL verecek

Bu URL üzerinden proje canlı olarak sunulur.

## GitHub Bilgileri

GitHub Repository:
(buraya kendi repo linkini yazacaksın)

GitHub Pages Canlı Link:
(buraya canlı linkini ekleyeceksin)
