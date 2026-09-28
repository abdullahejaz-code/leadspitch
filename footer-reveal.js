/* LeadsPitch — curtain-reveal sync. ISOLATED FILE; replace wholesale. */
(function () {
  var footer = document.querySelector('.site-footer') || document.querySelector('footer');
  var sheet  = document.querySelector('main');
  if (!footer || !sheet) return;

  var last = 0, ticking = false, idle = null;

  function apply() {
    ticking = false;
    var h = footer.offsetHeight;
    if (h && h !== last) { last = h; sheet.style.marginBottom = h + 'px'; }
  }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
  function idleQueue() { clearTimeout(idle); idle = setTimeout(queue, 120); }

  window.addEventListener('resize', idleQueue, { passive: true });
  window.addEventListener('orientationchange', idleQueue);
  window.addEventListener('load', queue);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
  queue();
})();