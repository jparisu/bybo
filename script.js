/**
 * ByBO - Build Your Brand Online
 * Main JavaScript - Scroll effects and animations
 */

(function() {
  'use strict';

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const fadeElements = document.querySelectorAll('.fade-in');

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  function handleNavbarScroll() {
    if (!navbar) return;

    const scrollY = window.scrollY;
    const scrollThreshold = 50;

    if (scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Throttle scroll events for performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  handleNavbarScroll();

  // ========================================
  // THEME TOGGLE (light / dark)
  // ========================================
  // The current theme is applied early by an inline script in <head>
  // (so there's no flash). Here we just handle the toggle + persistence.
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* localStorage unavailable — theme just won't persist */
      }
    });
  }

  // ========================================
  // MOBILE NAVIGATION TOGGLE
  // ========================================
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      closeDropdowns();

      // Animate hamburger to X
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ========================================
  // NAVBAR DROPDOWN MENUS (Home / Features)
  // ========================================
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  function closeDropdowns(except) {
    dropdowns.forEach(function(d) {
      if (d === except) return;
      d.classList.remove('open');
      const t = d.querySelector('.nav-dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function(dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains('open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    // Close the dropdown after picking an item
    dropdown.querySelectorAll('.nav-dropdown-menu a').forEach(function(link) {
      link.addEventListener('click', function() {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close any open dropdown when clicking outside the navbar
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
      closeDropdowns();
    }
  });

  // Close dropdowns with the Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDropdowns();
    }
  });

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ========================================
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    fadeElements.forEach(function(element) {
      fadeObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeElements.forEach(function(element) {
      element.classList.add('visible');
    });
  }

  // ========================================
  // ANIMATED STAT COUNTERS (count up from 0)
  // ========================================
  const counters = document.querySelectorAll('.stat-number[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // ms
    let startTime = null;

    function tick(timestamp) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }

    window.requestAnimationFrame(tick);
  }

  if (counters.length > 0) {
    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // run once
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(function(counter) {
        counterObserver.observe(counter);
      });
    } else {
      // Fallback: just show the final values
      counters.forEach(function(counter) {
        counter.textContent = counter.getAttribute('data-count') + (counter.getAttribute('data-suffix') || '');
      });
    }
  }

  // ========================================
  // PARALLAX EFFECT (Optional Enhancement)
  // ========================================
  const parallaxElements = document.querySelectorAll('.parallax-bg');

  function handleParallax() {
    parallaxElements.forEach(function(element) {
      const scrolled = window.pageYOffset;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;

      // Only apply parallax if element is in viewport
      if (scrolled > elementTop - window.innerHeight && scrolled < elementTop + elementHeight) {
        const yPos = (scrolled - elementTop) * 0.3;
        element.style.backgroundPositionY = yPos + 'px';
      }
    });
  }

  // Only use parallax on larger screens
  if (window.innerWidth > 768 && parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleParallax();
        });
      }
    });
  }

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(function(section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        const activeLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');
        if (activeLink) {
          document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.classList.remove('active');
          });
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ========================================
  // INTERACTIVE GUIDE STEPPER
  // ========================================
  const stepper = document.getElementById('stepper');

  if (stepper) {
    const railItems = Array.from(stepper.querySelectorAll('.rail-item'));
    const panels = Array.from(stepper.querySelectorAll('.step-panel'));
    const progressFill = stepper.querySelector('.rail-progress-fill');
    const progressLabel = stepper.querySelector('.rail-progress-label');
    const total = panels.length;
    // "Future" steps are optional extras and don't count toward the progress.
    const coreTotal = panels.filter(function(p) {
      return !p.hasAttribute('data-future');
    }).length;
    let activeIndex = 0;

    const isMobile = function() {
      return window.matchMedia('(max-width: 768px)').matches;
    };

    // Show a given step (used as the single source of truth).
    function setActive(index) {
      activeIndex = index;

      railItems.forEach(function(item, i) {
        item.classList.toggle('active', i === index);
      });
      panels.forEach(function(panel, i) {
        panel.classList.toggle('active', i === index);
      });

      const isFuture = panels[index].hasAttribute('data-future');
      if (progressFill) {
        progressFill.style.width = (isFuture ? 100 : ((index + 1) / coreTotal * 100)) + '%';
      }
      if (progressLabel) {
        progressLabel.textContent = isFuture
          ? 'Optional · future work'
          : ('Step ' + (index + 1) + ' of ' + coreTotal);
      }
    }

    // Left rail: click selects a step.
    railItems.forEach(function(item, i) {
      item.addEventListener('click', function() {
        setActive(i);
      });
    });

    panels.forEach(function(panel, i) {
      const header = panel.querySelector('.step-panel-header');

      // Header click: accordion toggle on mobile, re-select on desktop.
      header.addEventListener('click', function() {
        if (isMobile() && panel.classList.contains('active')) {
          panel.classList.remove('active');
          railItems[i].classList.remove('active');
        } else {
          setActive(i);
          if (isMobile()) {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });

      // Prev / Next buttons within each panel.
      const back = panel.querySelector('.step-back');
      const next = panel.querySelector('.step-next:not(.step-finish)');

      if (back) {
        back.addEventListener('click', function() {
          if (activeIndex > 0) {
            setActive(activeIndex - 1);
            if (isMobile()) {
              panels[activeIndex].querySelector('.step-panel-header')
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      }

      if (next) {
        next.addEventListener('click', function() {
          if (activeIndex < total - 1) {
            setActive(activeIndex + 1);
            if (isMobile()) {
              panels[activeIndex].querySelector('.step-panel-header')
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      }
    });

    // Start on the first step.
    setActive(0);
  }

  // ========================================
  // INTERACTIVE BUILDER (wizard)
  // ========================================
  const wizard = document.getElementById('wizard');

  if (wizard) {
    // Each style preset bundles colors + font + vibe, so the user only
    // makes one choice but the generated prompt is fully specified.
    const STYLE_PRESETS = {
      modern:   { label: 'Modern',   accent: '#00d4ff', theme: 'dark',  font: 'Inter',           vibe: 'clean and contemporary, with generous whitespace, crisp sans-serif type and subtle motion' },
      bright:   { label: 'Bright',   accent: '#ff6a00', theme: 'dark',  font: 'Poppins',         vibe: 'vivid and high-energy, with bold gradients, strong contrast and punchy colors' },
      sportive: { label: 'Sportive', accent: '#22c55e', theme: 'dark',  font: 'Montserrat',      vibe: 'dynamic and athletic, with angular shapes, strong diagonals and energetic accents' },
      elegant:  { label: 'Elegant',  accent: '#7c3aed', theme: 'light', font: 'Playfair Display', vibe: 'refined and premium, with a muted palette, serif headings and calm, roomy spacing' }
    };

    const PURPOSE_SECTIONS = {
      portfolio: 'a hero, an "About me" section, a projects/work gallery, and a contact section',
      business:  'a hero, a services section, a "Why choose us" section, testimonials, and a contact section',
      blog:      'a hero, a featured posts list, an "About" section, and a subscribe/contact section'
    };

    const panels = Array.from(wizard.querySelectorAll('.wizard-panel'));
    const progressFill = document.getElementById('wizProgressFill');
    const progressLabel = document.getElementById('wizProgressLabel');
    const total = panels.length;
    let current = 0;

    // Collected answers (with sensible defaults).
    const state = {
      name: '',
      about: '',
      purpose: 'portfolio',
      style: 'modern',
      user: ''
    };

    function slugify(text, fallback) {
      const slug = (text || '').toString().toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return slug || fallback;
    }

    function buildPrompt() {
      const preset = STYLE_PRESETS[state.style];
      const name = state.name.trim() || 'My Website';
      const about = state.about.trim() || 'a personal website';
      const sections = PURPOSE_SECTIONS[state.purpose];
      return [
        'Build a complete, responsive, STATIC one-page website using ONLY plain HTML, CSS and JavaScript.',
        '',
        'VERY IMPORTANT — do NOT use React, Next.js, Vue, Svelte, Vite, Tailwind, or any framework, bundler or build step. No npm, no package.json, no node_modules. The result must be plain static files that work just by opening index.html in a browser.',
        '',
        'Brand / site name: ' + name,
        'What it is about: ' + about,
        'Type of site: ' + state.purpose,
        '',
        'Visual style: ' + preset.vibe + '.',
        'Primary accent color: ' + preset.accent + '. Use a ' + preset.theme + ' background theme. Headings font: ' + preset.font + '.',
        '',
        'Include these sections, in order: ' + sections + '.',
        'The hero should show "' + name + '" as the headline, a short tagline, and a clear call-to-action button.',
        '',
        'Requirements:',
        '- Mobile-first and fully responsive.',
        '- Clean, semantic, accessible HTML.',
        '- Tasteful, smooth animations done with plain CSS/JS.',
        '- Output exactly three files — index.html, style.css and script.js — plus a resources/ folder for images. Nothing else.',
        '- Fill any missing text or images with sensible placeholders.'
      ].join('\n');
    }

    function refreshResult() {
      const preset = STYLE_PRESETS[state.style];
      const repo = slugify(state.name, 'my-website');
      const user = slugify(state.user, 'your-username');

      const promptEl = document.getElementById('promptText');
      const repoEl = document.getElementById('repoName');
      const urlEl = document.getElementById('liveUrl');
      const summaryEl = document.getElementById('planSummary');

      if (promptEl) promptEl.textContent = buildPrompt();
      if (repoEl) repoEl.textContent = repo;
      if (urlEl) urlEl.textContent = 'https://' + user + '.github.io/' + repo + '/';

      if (summaryEl) {
        const pills = [
          ['Name', state.name.trim() || 'My Website'],
          ['Type', state.purpose],
          ['Style', preset.label],
          ['Accent', preset.accent]
        ];
        summaryEl.innerHTML = pills.map(function(p) {
          return '<span class="plan-pill">' + p[0] + ': <strong>' + p[1] + '</strong></span>';
        }).join('');
      }
    }

    function setStep(index, scroll) {
      current = Math.max(0, Math.min(index, total - 1));
      panels.forEach(function(panel, i) {
        panel.classList.toggle('active', i === current);
      });
      if (progressFill) progressFill.style.width = ((current + 1) / total * 100) + '%';
      if (progressLabel) progressLabel.textContent = 'Step ' + (current + 1) + ' of ' + total;
      if (current === total - 1) refreshResult();
      // Bring the top of the wizard into view on user-driven step changes
      // (but not on the initial load).
      if (scroll) window.scrollTo({ top: wizard.offsetTop - 100, behavior: 'smooth' });
    }

    // Text inputs
    const nameInput = document.getElementById('fName');
    const aboutInput = document.getElementById('fAbout');
    const userInput = document.getElementById('fUser');
    if (nameInput) nameInput.addEventListener('input', function() { state.name = this.value; });
    if (aboutInput) aboutInput.addEventListener('input', function() { state.about = this.value; });
    if (userInput) userInput.addEventListener('input', function() { state.user = this.value; refreshResult(); });

    // Single-choice groups (chips + style cards)
    function wireChoice(containerId, key) {
      const group = document.getElementById(containerId);
      if (!group) return;
      const options = Array.from(group.children);
      options.forEach(function(opt) {
        opt.addEventListener('click', function() {
          options.forEach(function(o) {
            o.classList.remove('active');
            o.setAttribute('aria-checked', 'false');
          });
          opt.classList.add('active');
          opt.setAttribute('aria-checked', 'true');
          state[key] = opt.getAttribute('data-value');
        });
      });
    }
    wireChoice('fPurpose', 'purpose');
    wireChoice('fStyle', 'style');

    // Navigation
    wizard.querySelectorAll('.wizard-next').forEach(function(btn) {
      btn.addEventListener('click', function() { setStep(current + 1, true); });
    });
    wizard.querySelectorAll('.wizard-back').forEach(function(btn) {
      btn.addEventListener('click', function() { setStep(current - 1, true); });
    });
    wizard.querySelectorAll('.wizard-restart').forEach(function(btn) {
      btn.addEventListener('click', function() { setStep(0, true); });
    });

    // Copy buttons
    wizard.querySelectorAll('.copy-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const target = document.getElementById(btn.getAttribute('data-copy-target'));
        if (!target) return;
        const text = target.textContent;
        const done = function() {
          const original = btn.textContent;
          btn.textContent = 'Copied ✓';
          btn.classList.add('copied');
          window.setTimeout(function() {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function() { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      });
    });

    function fallbackCopy(text, done) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* no-op */ }
      document.body.removeChild(ta);
    }

    setStep(0);
  }

})();
