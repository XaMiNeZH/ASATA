/* ============================================================
   ASATA — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar ────────────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Mobile dropdown toggles
  document.querySelectorAll('.nav-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });

  // Active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  /* ── Scroll Reveal ─────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Counters ──────────────────────────────────────────── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target >= 1000 ? target.toLocaleString() : target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) >= 1000
          ? Math.floor(current).toLocaleString()
          : Math.floor(current);
      }
    }, step);
  }

  /* ── Lightbox ──────────────────────────────────────────── */
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let galleryImages = [];
  let currentIndex  = 0;

  function collectGalleryImages() {
    const items = document.querySelectorAll('[data-lightbox]');
    galleryImages = Array.from(items).map(item => item.getAttribute('data-lightbox'));
    return items;
  }

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  const items = collectGalleryImages();
  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext)  lightboxNext.addEventListener('click', showNext);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')    closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight')showNext();
  });

  /* ── Gallery Filter ────────────────────────────────────── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.masonry-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity .3s'; }, 10);
        } else {
          item.style.display = 'none';
        }
      });

      // Rebuild lightbox after filtering
      collectGalleryImages();
    });
  });

  /* ── Contact Form ──────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
      btn.style.background = '#2ecc71';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }

});
