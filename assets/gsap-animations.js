/* ============================================
   TRDEFI — GSAP Animations v4
   Full GSAP + ScrollTrigger Implementation
   ============================================ */

(function() {
  // Wait for DOM + GSAP loaded
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    initHeroFragmentAnimation();
    initCustomCursor();
    initSmoothScroll();
    initScrollReveal();
    initHeroParallax();
    initHoverEffects();
    initPromiseReveal();
    initNavGlow();
    initWatermarkFade();

    // Refresh ScrollTrigger after all animations initialized
    ScrollTrigger.refresh();
  }

  // =============================================
  // 1. HERO FRAGMENT ANIMATION — THE MAIN EVENT
  // =============================================
  function initHeroFragmentAnimation() {
    const hero = document.querySelector('.hero-banner');
    if (!hero) return;

    // Get all fragment rectangles
    const fragments = hero.querySelectorAll('.hero-banner__float-rect');
    if (fragments.length === 0) return;

    // Build the scroll-linked timeline
    // Fragments start covering the hero text, then scatter as user scrolls
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        pin: false
      }
    });

    // Each fragment gets a unique "explode" animation
    fragments.forEach((frag, i) => {
      const xMove = (Math.random() > 0.5 ? 1 : -1) * (150 + Math.random() * 200);
      const yMove = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 200);
      const rot = (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 180);
      const scale = 0.3 + Math.random() * 0.5;
      const opacity = 0.1 + Math.random() * 0.4;

      tl.to(frag, {
        x: xMove,
        y: yMove,
        rotation: rot,
        scale: scale,
        opacity: opacity,
        ease: 'power2.inOut',
        duration: 1
      }, 0);
    });

    // Also fade out the overlay as user scrolls
    const overlay = hero.querySelector('.hero-banner__overlay');
    if (overlay) {
      tl.to(overlay, {
        opacity: 0,
        ease: 'power1.in',
        duration: 0.5
      }, 0);
    }

    // Hero content slides in on page load
    const content = hero.querySelector('.hero-banner__content');
    const titleBlocks = hero.querySelectorAll('.hero-banner__title-block');
    const subtitle = hero.querySelector('.hero-banner__subtitle');
    const cta = hero.querySelector('.hero-banner__cta');
    const watermark = hero.querySelector('.hero-banner__watermark');

    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    }

    if (titleBlocks.length > 0) {
      gsap.fromTo(titleBlocks,
        { opacity: 0, x: -80, rotateY: -15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
      );
    }

    if (subtitle) {
      gsap.fromTo(subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.0 }
      );
    }

    if (cta) {
      gsap.fromTo(cta,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 1.3 }
      );
    }

    if (watermark) {
      gsap.fromTo(watermark,
        { opacity: 0, letterSpacing: '0.5em' },
        { opacity: 0.25, letterSpacing: '0.15em', duration: 1.5, ease: 'power2.out', delay: 1.5 }
      );
    }

    // Corner decorations fade in
    const corners = hero.querySelectorAll('.hero-banner__corner');
    if (corners.length > 0) {
      gsap.fromTo(corners,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(2)', delay: 0.8 }
      );
    }
  }

  // =============================================
  // 2. CUSTOM CURSOR — Yellow-green ring
  // =============================================
  function initCustomCursor() {
    const ring = document.createElement('div');
    ring.className = 'gsap-cursor-ring';
    ring.style.cssText = 'position:fixed;width:28px;height:28px;border:1.5px solid rgba(154,205,50,0.85);border-radius:50%;pointer-events:none;z-index:99999;transition:transform 0.08s linear,opacity 0.2s ease,border-color 0.2s ease;mix-blend-mode:normal;opacity:0;';
    document.body.appendChild(ring);

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      ring.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => ring.style.opacity = '0');

    // Expand on interactive elements
    const interactive = 'a, button, .collection-card, .product-card, [role="button"], input, .cta-button, .hero-banner__cta';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive)) {
        ring.style.transform = 'translate(-50%,-50%) scale(2)';
        ring.style.borderColor = 'rgba(154,205,50,1)';
        ring.style.borderWidth = '2px';
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive)) {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'rgba(154,205,50,0.85)';
        ring.style.borderWidth = '1.5px';
      }
    });

    function animate() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      ring.style.transform = 'translate(-50%,-50%)';
      requestAnimationFrame(animate);
    }
    animate();
  }

  // =============================================
  // 3. SMOOTH SCROLL
  // =============================================
  function initSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          gsap.to(window, { scrollTo: top, duration: 1, ease: 'power3.inOut' });
        }
      });
    });
  }

  // =============================================
  // 4. SCROLL REVEAL — Collection cards stagger
  // =============================================
  function initScrollReveal() {
    const cards = document.querySelectorAll('.collection-card');
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, rotateY: -8 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          },
          delay: (i % 4) * 0.1
        }
      );
    });

    // Section headers
    document.querySelectorAll('.collections-grid__title, .promise-section__title, .featured-product__title').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    });
  }

  // =============================================
  // 5. HERO PARALLAX
  // =============================================
  function initHeroParallax() {
    const hero = document.querySelector('.hero-banner');
    const bg = hero ? hero.querySelector('.hero-banner__bg') : null;
    if (!bg) return;

    gsap.to(bg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // =============================================
  // 6. HOVER EFFECTS — Scale + glow
  // =============================================
  function initHoverEffects() {
    // Collection cards
    document.querySelectorAll('.collection-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.04, zIndex: 10, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, zIndex: 1, duration: 0.4, ease: 'power2.out' });
      });
    });

    // CTA buttons glow
    document.querySelectorAll('.hero-banner__cta, .promise-section__cta, .site-header__cta').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { boxShadow: '0 0 40px rgba(255,105,180,0.6)', y: -3, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { boxShadow: 'none', y: 0, duration: 0.4, ease: 'power2.out' });
      });
    });

    // Nav links color
    document.querySelectorAll('.site-header__nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: '#ff73c3', duration: 0.25 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: '', duration: 0.25 });
      });
    });

    // Collection card overlay text reveal
    document.querySelectorAll('.collection-card').forEach(card => {
      const category = card.querySelector('.collection-card__category');
      const name = card.querySelector('.collection-card__name');
      const desc = card.querySelector('.collection-card__desc');
      if (category) {
        card.addEventListener('mouseenter', () => {
          gsap.to([category, name, desc].filter(Boolean), {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to([category, name, desc].filter(Boolean), {
            opacity: 0, y: 10, stagger: 0.03, duration: 0.25, ease: 'power2.in'
          });
        });
      }
    });
  }

  // =============================================
  // 7. PROMISE SECTION — Slide in left
  // =============================================
  function initPromiseReveal() {
    const left = document.querySelector('.promise-section__left');
    const right = document.querySelector('.promise-section__image-wrapper');
    if (left) {
      gsap.fromTo(left,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: left, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    }
    if (right) {
      gsap.fromTo(right,
        { opacity: 0, x: 80, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 1.2, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: right, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    }

    // Promise title glitch on hover
    const title = document.querySelector('.promise-section__title');
    if (title) {
      title.addEventListener('mouseenter', () => {
        gsap.to(title, {
          keyframes: [
            { x: -3, duration: 0.05 },
            { x: 3, duration: 0.05 },
            { x: -2, duration: 0.05 },
            { x: 2, duration: 0.05 },
            { x: 0, duration: 0.05 }
          ],
          ease: 'none',
          repeat: 2
        });
      });
    }
  }

  // =============================================
  // 8. NAV — Glassmorphism on scroll
  // =============================================
  function initNavGlow() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    gsap.to(header, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top -100',
        end: 'max',
        onUpdate: (self) => {
          if (self.progress > 0) {
            header.style.background = 'rgba(0,0,0,0.85)';
            header.style.backdropFilter = 'blur(12px)';
            header.style.WebkitBackdropFilter = 'blur(12px)';
          } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.WebkitBackdropFilter = '';
          }
        }
      }
    });
  }

  // =============================================
  // 9. WATERMARK — Subtle breathing
  // =============================================
  function initWatermarkFade() {
    document.querySelectorAll('[class*="watermark"]').forEach(wm => {
      wm.style.pointerEvents = 'none';
    });
  }

  // =============================================
  // 10. GLITCH EFFECT — Periodic on hero title
  // =============================================
  function initGlitchLoop() {
    const title = document.querySelector('.hero-banner__title-block');
    if (!title) return;

    function doGlitch() {
      gsap.to(title, {
        keyframes: [
          { x: -4, skewX: -3, duration: 0.06, ease: 'none' },
          { x: 4, skewX: 3, duration: 0.06, ease: 'none' },
          { x: -2, skewX: -1, duration: 0.04, ease: 'none' },
          { x: 2, skewX: 1, duration: 0.04, ease: 'none' },
          { x: 0, skewX: 0, duration: 0.02, ease: 'none' }
        ],
        repeat: 1,
        onComplete: () => {}
      });
    }

    // Glitch every 8 seconds
    setInterval(doGlitch, 8000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
