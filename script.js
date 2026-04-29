document.addEventListener('DOMContentLoaded', () => {

  /* ========= Smooth scroll ========= */
  function scrollToSection(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
  }
  window.scrollToSection = scrollToSection; // buat bisa dipanggil dari HTML

  /* ========= Cursor bubble effect ========= */
  document.addEventListener('mousemove', (e) => {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.style.left = `${e.clientX}px`;
    b.style.top = `${e.clientY}px`;
    document.body.appendChild(b);
    setTimeout(()=> b.remove(), 700);
  });

  /* ========= Heart particles while scrolling ========= */
  (function heartSpawner(){
    let last = 0;
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if(now - last < 800) return;
      last = now;
      spawnHeart();
    });

    function spawnHeart(){
      const h = document.createElement('div');
      h.className = 'p-heart';
      h.style.left = (10 + Math.random()*80) + 'vw';
      h.style.fontSize = (12 + Math.random()*18) + 'px';
      h.innerText = '💗';
      document.body.appendChild(h);
      setTimeout(()=> h.remove(), 7000);
    }
  })();

  /* ========= First Meet Upload ========= */
  const firstMeetInput = document.querySelector('.firstmeet input[type="file"]');
  const firstMeetImg = document.getElementById('firstMeetPreview');
  if(firstMeetInput && firstMeetImg){
    firstMeetInput.addEventListener('change', (e) => {
      if(!e.target.files || !e.target.files[0]) return;
      firstMeetImg.src = URL.createObjectURL(e.target.files[0]);
      firstMeetImg.style.display = 'block';
    });
  }

  /* ========= Music Control ========= */
  const musicToggle = document.getElementById('musicToggle');
  const musicInput = document.getElementById('musicInput');
  const audio = document.getElementById('bgAudio');
  let playing = false;

  if(musicToggle && musicInput && audio){
    musicToggle.addEventListener('click', ()=>{
      if(!audio.src){
        musicInput.click();
        return;
      }
      if(playing){ audio.pause(); musicToggle.innerText='▶️'; }
      else { audio.play(); musicToggle.innerText='⏸️'; }
      playing = !playing;
    });

    musicInput.addEventListener('change', (e)=>{
      if(!e.target.files[0]) return;
      audio.src = URL.createObjectURL(e.target.files[0]);
      audio.play();
      playing = true;
      musicToggle.innerText='⏸️';
    });
  }

  /* ========= Opening Modal ========= */
  const openingModal = document.getElementById("openingModal");
  const openGiftBtn = document.getElementById("openGiftBtn");
  if(openingModal && openGiftBtn){
    openGiftBtn.addEventListener("click", () => {
      openingModal.style.opacity = "0";
      openingModal.style.pointerEvents = "none";
      setTimeout(() => {
        openingModal.style.display = "none";
      }, 500);
    });
  }

  /* ========= Gallery Zoom ========= */
  const galleryModal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('closeModal');

  if(galleryModal && modalImg && closeBtn){
    const imgs = document.querySelectorAll('.gallery-item img');
    imgs.forEach(img => {
      img.addEventListener('click', (e)=>{
        e.stopPropagation(); // cegah bubble
        galleryModal.style.display = 'flex';
        modalImg.src = img.src;
      });
    });

    closeBtn.addEventListener('click', () => {
      galleryModal.style.display = 'none';
    });

    galleryModal.addEventListener('click', (e)=>{
      if(e.target === galleryModal) galleryModal.style.display = 'none';
    });
  }

});

/* =================================================
   EXTRA SCRIPT — ADD ONLY (DEBUGGED)
   ================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========= Easter Egg: Double Click Logo ========= */
  const logo = document.querySelector('.logo');

  if (!logo) {
    console.warn('Easter egg: .logo not found');
    return;
  }

  logo.style.cursor = 'pointer';

  logo.addEventListener('dblclick', () => {
    showEasterEgg();
  });

  function showEasterEgg() {
    if (document.getElementById('easterEggBox')) return;

    const box = document.createElement('div');
    box.id = 'easterEggBox';
    box.innerHTML = `
      🎉 Easter Egg Found!<br>
      Happy Birthday, Bila 😆<br>
      <small>(iya, ini sengaja)</small>
    `;
    box.style.position = 'fixed';
    box.style.bottom = '24px';
    box.style.left = '50%';
    box.style.transform = 'translateX(-50%)';
    box.style.padding = '14px 20px';
    box.style.fontSize = '14px';
    box.style.textAlign = 'center';
    box.style.borderRadius = '16px';
    box.style.background = 'rgba(255,255,255,0.9)';
    box.style.backdropFilter = 'blur(10px)';
    box.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    box.style.zIndex = '9999';

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 5000);
  }

});

/* =====================================
   QR FAKE LOADING (VISIBLE & RELIABLE)
   ADD-ONLY
   ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('qrSurpriseBtn');
  const overlay = document.getElementById('qrLoading');
  const bar = document.querySelector('.qr-bar-fill');
  const text = document.getElementById('qrLoadingText');

  if (!btn || !overlay || !bar || !text) {
    console.warn('QR loading elements not found');
    return;
  }

  btn.addEventListener('click', () => {

    // 1. Tampilkan overlay
    overlay.style.display = 'flex';

    // 2. Reset animasi bar (IMPORTANT)
    bar.style.animation = 'none';
    bar.offsetHeight; // force reflow
    bar.style.animation = 'qrLoad 3.5s forwards';

    // 3. Ganti teks bertahap
    const messages = [
      'Menyiapkan kejutan…',
      'Pastikan ini hari ulang tahun kamu 🎂',
      'Sedikit lagi…'
    ];

    let i = 0;
    text.textContent = messages[i];

    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        text.textContent = messages[i];
      }
    }, 1100);

    // 4. Redirect SETELAH animasi SELESAI
    setTimeout(() => {
      clearInterval(interval);

      // 🔗 GANTI LINK INI
      window.location.href = 'https://link-kamu-di-sini';
    }, 3700);

  });

});

