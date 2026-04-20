/* ============================================
   TRDEFI ANIMATIONS — GSAP + ScrollTrigger
   Reference: effortless-puffpuff-66e283.netlify.app
   ============================================ */

(function() {
  'use strict';

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Register plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    initCursor();
    initNavbar();
    initHeroFragments();
    initHeroText();
    initCollectionCards();
    initPromiseSection();
  }

  /* ---- CUSTOM CURSOR ---- */
  function initCursor() {
    var cursor = document.getElementById('cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', function(e) {
      gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'none'
      });
    });

    document.addEventListener('mousedown', function() {
      gsap.to(cursor, {
        scaleX: 0.8,
        scaleY: 0.8,
        duration: 0.1
      });
    });

    document.addEventListener('mouseup', function() {
      gsap.to(cursor, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.1
      });
    });

    // Show cursor when mouse enters page
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
  }

  /* ---- NAVBAR SCROLL EFFECT ---- */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ---- HERO FRAGMENTS EXPLODE ---- */
  function initHeroFragments() {
    var fragments = document.querySelectorAll('.fragment');
    if (!fragments.length) return;

    fragments.forEach(function(frag, i) {
      var randomX = (Math.random() - 0.5) * 400;
      var randomY = (Math.random() - 0.5) * 400;
      var randomRotation = Math.random() * 120 - 60;

      gsap.fromTo(frag,
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1
        },
        {
          x: randomX,
          y: randomY,
          rotation: randomRotation,
          opacity: 0,
          scale: 0.3,
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
          },
          delay: i * 0.05
        }
      );
    });
  }

  /* ---- HERO TEXT REVEAL ---- */
  function initHeroText() {
    var heroText1 = document.getElementById('hero-text-1');
    var heroText2 = document.getElementById('hero-text-2');

    if (heroText1) {
      gsap.from(heroText1, {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }

    if (heroText2) {
      gsap.from(heroText2, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      });
    }
  }

  /* ---- COLLECTION CARDS STAGGERED REVEAL ---- */
  function initCollectionCards() {
    var cards = document.querySelectorAll('.collection-card');
    if (!cards.length) return;

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.collections-grid',
        start: 'top 80%'
      }
    });
  }

  /* ---- PROMISE SECTION SLIDE IN ---- */
  function initPromiseSection() {
    var promiseContent = document.querySelector('.promise-section__content');
    if (!promiseContent) return;

    gsap.from(promiseContent, {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.promise-section',
        start: 'top 70%'
      }
    });
  }

})();
