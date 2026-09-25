/* ==========================================================================
   CURTAIN-REVEAL FOOTER — height sync (load ONCE per page, before </body>)
   --------------------------------------------------------------------------
   Keeps <main>'s bottom margin equal to the footer's REAL height so the page
   always has exactly enough scroll room to reveal the footer, and never
   more. No hardcoded footer height anywhere: ResizeObserver re-measures
   whenever the footer re-sizes (font load, theme switch, wrap change,
   orientation change, window resize).
   ========================================================================== */
(function () {
  'use strict';

  /* Page wrapper: every page wraps its content in <main>. */
  var footer = document.querySelector('footer');
  var main = document.querySelector('main');

  if (!footer || !main) return;

  function sync() {
    main.style.marginBottom = footer.offsetHeight + 'px';
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(sync).observe(footer);
  }

  window.addEventListener('resize', sync);
  window.addEventListener('orientationchange', sync);
  window.addEventListener('load', sync);

  /* Web fonts (Gevora/Inter) can change the footer's height once swapped in. */
  if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
    document.fonts.ready.then(sync);
  }

  sync();
})();
