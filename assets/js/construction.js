/* LeadsPitch under-construction bar + first-visit popup.
   Include once near the end of <body>:
   <script src="/assets/js/construction.js" defer></script>
   Change LAUNCH_DATE for the real launch. The popup shows once per browser;
   clear localStorage key "lp-construction-dismissed" to see it again. */
(function () {
  'use strict';

  var LAUNCH_DATE = new Date('2026-12-03T12:00:00Z');
  var DISMISS_KEY = 'lp-construction-dismissed';
  var BAR_H = 40;
  var ACCENT = '#39FF14';

  function remaining() { return LAUNCH_DATE.getTime() - Date.now(); }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function fmt(ms) {
    if (ms <= 0) return 'live now';
    var s = Math.floor(ms / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;
    return d + 'd ' + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's';
  }

  var css = [
    '#lp-construction-bar{position:sticky;top:0;z-index:90;display:flex;align-items:center;justify-content:center;gap:.65rem;height:' + BAR_H + 'px;padding:0 .75rem;overflow:hidden;white-space:nowrap;background:' + ACCENT + ';color:#04120a;font-family:var(--font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);font-size:13px;font-weight:600;letter-spacing:.01em;line-height:1;}',
    '#lp-construction-bar b{font-variant-numeric:tabular-nums;font-weight:800;}',
    '#lp-construction-bar .lp-cb-emoji{margin-right:.35rem;}',
    '.lp-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;}',
    '.lp-cm{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;padding:1.25rem;background:rgba(0,0,0,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-family:var(--font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);animation:lp-cm-in .22s ease both;}',
    '@keyframes lp-cm-in{from{opacity:0;}to{opacity:1;}}',
    '.lp-cm-card{position:relative;width:100%;max-width:460px;max-height:calc(100dvh - 2.5rem);overflow-y:auto;padding:clamp(1.5rem,5vw,2.25rem);border:1px solid rgba(57,255,20,.35);border-radius:20px;background:#0b0b0d;color:#f4f4f2;box-shadow:0 40px 90px rgba(0,0,0,.6);animation:lp-cm-rise .28s cubic-bezier(.22,1,.36,1) both;}',
    '@keyframes lp-cm-rise{from{opacity:0;transform:translateY(14px) scale(.98);}to{opacity:1;transform:none;}}',
    '.lp-cm-x{position:absolute;top:.75rem;right:.75rem;width:40px;height:40px;display:grid;place-items:center;border:0;border-radius:999px;background:transparent;color:#b9b9b3;font-size:24px;line-height:1;cursor:pointer;}',
    '.lp-cm-x:hover,.lp-cm-x:focus-visible{background:rgba(255,255,255,.08);color:#fff;}',
    '.lp-cm-kicker{margin:0 0 .75rem;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:' + ACCENT + ';}',
    '.lp-cm-title{margin:0 0 .75rem;font-size:clamp(1.25rem,4vw,1.6rem);line-height:1.25;font-weight:700;letter-spacing:-.02em;color:#fff;}',
    '.lp-cm-desc{margin:0 0 1.5rem;font-size:15px;line-height:1.6;color:#c9c9c4;}',
    '.lp-cm-desc b{color:#fff;font-variant-numeric:tabular-nums;}',
    '.lp-cm-go{width:100%;padding:.9rem 1.25rem;border:0;border-radius:999px;background:' + ACCENT + ';color:#04120a;font:inherit;font-weight:700;cursor:pointer;transition:transform .15s ease,filter .15s ease;}',
    '.lp-cm-go:hover{filter:brightness(1.08);}',
    '.lp-cm-go:active{transform:scale(.985);}',
    'html.lp-modal-open,html.lp-modal-open body{overflow:hidden;}',
    '@media (max-width:560px){#lp-construction-bar{font-size:11.5px;gap:.4rem;}#lp-construction-bar .lp-cb-pre{display:none;}}',
    '@media (prefers-reduced-motion:reduce){.lp-cm,.lp-cm-card{animation:none;}}'
  ].join('');

  var style = document.createElement('style');
  style.id = 'lp-construction-style';
  style.textContent = css;
  document.head.appendChild(style);

  /* ---- bar ---- */
  var bar = document.createElement('div');
  bar.id = 'lp-construction-bar';
  bar.innerHTML =
    '<span class="lp-cb-label"><span class="lp-cb-emoji" aria-hidden="true">\uD83D\uDEA7</span>Site under construction</span>' +
    '<span class="lp-cb-count"><span class="lp-cb-pre">Full launch in </span><b class="lp-cb-time">--</b></span>' +
    '<span class="lp-sr">Site under construction. Full launch in about seven days.</span>';
  document.body.insertBefore(bar, document.body.firstChild);

  /* Sticky header sits below the bar instead of underneath it. */
  var headers = document.querySelectorAll('.site-header');
  for (var i = 0; i < headers.length; i++) headers[i].style.top = BAR_H + 'px';

  /* ---- popup ---- */
  var wrap = null;
  var lastFocus = null;

  function closePopup() {
    if (!wrap) return;
    var el = wrap;
    wrap = null;
    el.parentNode && el.parentNode.removeChild(el);
    document.documentElement.classList.remove('lp-modal-open');
    document.removeEventListener('keydown', onKey, true);
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (!wrap) return;
    if (e.key === 'Escape') { e.preventDefault(); closePopup(); return; }
    if (e.key !== 'Tab') return;
    var f = wrap.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openPopup() {
    if (wrap) return;
    lastFocus = document.activeElement;
    wrap = document.createElement('div');
    wrap.className = 'lp-cm';
    wrap.innerHTML =
      '<div class="lp-cm-card" role="dialog" aria-modal="true" aria-labelledby="lp-cm-title" aria-describedby="lp-cm-desc">' +
        '<button class="lp-cm-x" type="button" aria-label="Close">&times;</button>' +
        '<p class="lp-cm-kicker">\uD83D\uDEA7 Under construction</p>' +
        '<h2 class="lp-cm-title no-heading-fall" id="lp-cm-title">We&rsquo;re putting the finishing touches on LeadsPitch.</h2>' +
        '<p class="lp-cm-desc" id="lp-cm-desc">Full launch in <b class="lp-cm-time">about 7 days</b>. You can explore the site right now \u2014 a few pages and prices are still being finalised.</p>' +
        '<button class="lp-cm-go" type="button">Explore the site</button>' +
      '</div>';
    document.body.appendChild(wrap);
    document.documentElement.classList.add('lp-modal-open');
    document.addEventListener('keydown', onKey, true);

    wrap.addEventListener('click', function (e) {
      if (e.target === wrap) closePopup();
    });
    wrap.querySelector('.lp-cm-x').addEventListener('click', closePopup);
    wrap.querySelector('.lp-cm-go').addEventListener('click', closePopup);
    wrap.querySelector('.lp-cm-go').focus();
  }

  function maybeShowPopup() {
    if (wrap || remaining() <= 0) return;
    try { if (localStorage.getItem(DISMISS_KEY) === '1') return; } catch (e) {}
    openPopup();
  }

  /* Let the first-visit splash finish before the popup appears. */
  if (document.getElementById('splash')) {
    document.addEventListener('splash:done', function () { setTimeout(maybeShowPopup, 500); }, { once: true });
    setTimeout(maybeShowPopup, 6500); /* failsafe if the splash event never fires */
  } else {
    setTimeout(maybeShowPopup, 700);
  }

  /* ---- countdown ---- */
  function tick() {
    var ms = remaining();
    var time = bar.querySelector('.lp-cb-time');
    if (time) time.textContent = fmt(ms);
    var pre = bar.querySelector('.lp-cb-pre');
    if (pre) pre.textContent = ms > 0 ? 'Full launch in ' : '';
    var modalTime = wrap && wrap.querySelector('.lp-cm-time');
    if (modalTime) modalTime.textContent = fmt(ms);
    if (ms <= 0) clearInterval(timer);
  }

  tick();
  var timer = setInterval(tick, 1000);
})();
