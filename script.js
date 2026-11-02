/* Progressive enhancement: content and project details work without JavaScript. */
'use strict';

// Mobile navigation: preserve a usable full navigation when JavaScript is off.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
navigation.dataset.collapsible = 'true';
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

// Project filtering uses hidden so filtered cards also leave the keyboard order.
const filterControls = document.querySelector('.filter-controls');
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filterControls.hidden = false;
filters.forEach(button => {
  button.addEventListener('click', () => {
    let visibleCount = 0;
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    projects.forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) visibleCount += 1;
    });
    document.querySelector('#filter-status').textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown.`;
  });
});

// Keep the current section visible in navigation, without moving focus.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navigation.querySelectorAll('a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, {rootMargin: '-12% 0px -60% 0px', threshold: 0});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Clipboard access may be unavailable outside localhost or a secure connection.
const copyButton = document.querySelector('#copy-email');
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText('rissaworkk@gmail.com');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Please select and copy the email address above.';
    }
  });
}

// Animate each section as it enters the screen. Content stays visible if the
// browser doesn't support animations, or if JavaScript is disabled.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeAnimations = new Set();

function animateEntrance(element, delay = 0) {
  if (motionPreference.matches || typeof element.animate !== 'function') return;

  const animation = element.animate([
    { opacity: 0, transform: 'translateY(28px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: 700,
    delay,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fill: 'backwards'
  });

  activeAnimations.add(animation);
  animation.onfinish = () => activeAnimations.delete(animation);
  animation.oncancel = () => activeAnimations.delete(animation);
}

// Give neighbouring cards a short stagger rather than showing all at once.
const cardDelays = new Map();
document.querySelectorAll('.skills-grid, .project-grid, .achievement-grid').forEach(group => {
  Array.from(group.children).forEach((card, index) => cardDelays.set(card, index * 100));
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateEntrance(entry.target, cardDelays.get(entry.target) || 0);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll(
    '.section-heading, .about > div, .timeline li, .skill-card, ' +
    '.project-card, .experience > div, .experience-card, ' +
    '.achievement-section h2, .achievement-grid article, ' +
    '.contact .eyebrow, .contact h2, .contact > p:not(.eyebrow), .contact .email-link, .contact .button-row'
  ).forEach(element => revealObserver.observe(element));
}

// A short opening animation when project details are expanded.
document.querySelectorAll('.project-card details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) animateEntrance(details.querySelector('.project-details'));
  });
});

// Respect changes to the motion setting even while the page is open.
motionPreference.addEventListener('change', event => {
  if (event.matches) activeAnimations.forEach(animation => animation.cancel());
});
