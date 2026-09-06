(function () {
  'use strict';

  var rows = document.querySelectorAll('.row');

  // ---- Touch support: tap to pause ----
  rows.forEach(function (row) {
    var track = row.querySelector('.row__track');
    if (!track) return;

    row.addEventListener('touchstart', function () {
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    row.addEventListener('touchend', function () {
      track.style.animationPlayState = 'running';
    }, { passive: true });
  });

  // ---- Scroll entrance with stagger ----
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    rows.forEach(function (row, i) {
      row.style.opacity = '0';
      row.style.transform = 'translateY(16px)';
      row.style.transition = 'opacity 0.6s ease ' + (i * 100) + 'ms, transform 0.6s ease ' + (i * 100) + 'ms';
      observer.observe(row);
    });
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  var style = document.createElement('style');
  style.textContent = '.row.is-visible{opacity:1!important;transform:translateY(0)!important;}';
  document.head.appendChild(style);
});
