/* LeadsPitch first-visit splash — include once, early in <body>:
   <script src="splash.js"></script>   (industries/: use ../splash.js)
   Plays once per browser session on whichever page opens first. */
(function () {
  'use strict';

  var KEY = 'lp-splash-seen';
  var alreadySeen = false;
  try { alreadySeen = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
  if (alreadySeen) return;
  try { sessionStorage.setItem(KEY, '1'); } catch (e) {}

  var script = document.currentScript;
  var base;
  try {
    base = new URL('./', script && script.src ? script.src : location.href);
  } catch (e) {
    base = null;
  }
  var fontUrl = base
    ? new URL('public/Gevora font.ttf', base).href
    : 'public/Gevora font.ttf';

  var WORD = 'LeadsPitch';
  var PANEL_COUNT = 8;

  var T = {
    letterStagger: 55,
    letterDuration: 420,
    panelStagger: 45,
    panelDuration: 750,
    hold: 260,
    buffer: 140
  };

  var css = [
    '@font-face{font-family:"Gevora";src:url("' + fontUrl + '") format("truetype");font-weight:400;font-style:normal;font-display:swap;}',
    ':root{',
    '--letter-stagger:' + T.letterStagger + 'ms;',
    '--letter-duration:' + T.letterDuration + 'ms;',
    '--panel-stagger:' + T.panelStagger + 'ms;',
    '--panel-duration:' + T.panelDuration + 'ms;',
    '--letter-ease:cubic-bezier(0.22,1,0.36,1);',
    '--panel-ease:cubic-bezier(0.55,0.02,0.85,0.40);',
    '}',
    'html.is-loading,html.is-loading body{overflow:hidden;height:100%;}',
    '.splash{position:fixed;inset:0;z-index:9999;display:flex;overflow:hidden;background:#000;user-select:none;-webkit-tap-highlight-color:transparent;}',
    '.splash.is-falling{background:transparent;}',
    '.splash__panel{position:relative;flex:1 1 0;min-width:0;height:100%;overflow:hidden;background:#000;will-change:transform;backface-visibility:hidden;}',
    '.splash__letter{display:inline-block;font-family:"Gevora","Arial Black",Impact,sans-serif;font-size:clamp(2.25rem,8.5vw,6.5rem);font-weight:400;letter-spacing:-0.01em;line-height:1;color:#fff;opacity:0;transform:translate3d(0,0.4em,0) scale(0.92);will-change:transform,opacity;}',
    '.splash.is-typing .splash__letter{animation:lp-letter-in var(--letter-duration) var(--letter-ease) both;animation-delay:calc(var(--li) * var(--letter-stagger));}',
    '@keyframes lp-letter-in{from{opacity:0;transform:translate3d(0,0.4em,0) scale(0.92);}to{opacity:1;transform:translate3d(0,0,0) scale(1);}}',
    '.splash.is-falling .splash__panel{animation:lp-panel-fall var(--panel-duration) var(--panel-ease) both;animation-delay:calc(var(--i) * var(--panel-stagger));}',
    '@keyframes lp-panel-fall{from{transform:translate3d(0,0,0);}to{transform:translate3d(0,110%,0);}}',
    '.splash__word{position:absolute;top:0;left:0;height:100%;display:flex;align-items:center;justify-content:center;white-space:nowrap;}',
    '@media (prefers-reduced-motion:reduce){.splash__letter{opacity:1;transform:none;}.splash.is-typing .splash__letter{animation:none;}.splash.is-falling .splash__panel{animation:none;}}'
  ].join('');

  var style = document.createElement('style');
  style.id = 'lp-splash-style';
  style.textContent = css;
  document.head.appendChild(style);

  var splash = document.createElement('div');
  splash.id = 'splash';
  splash.className = 'splash';
  splash.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(splash, document.body.firstChild);

  var root = document.documentElement;
  root.classList.add('is-loading');

  /* Failsafe registered immediately so a later error can never
     leave the page scroll-locked behind a stuck splash. */
  var finished = false;
  var guard = window.setTimeout(function () {
    teardown();
  }, 6000);

  var wordDone  = (WORD.length - 1) * T.letterStagger + T.letterDuration;
  var fallStart = wordDone + T.hold;
  var fallEnd   = fallStart + (PANEL_COUNT - 1) * T.panelStagger + T.panelDuration;

  var panels = [];
  var isFalling = false;

  function alignLayers() {
    if (isFalling) return;
    var splashRect = splash.getBoundingClientRect();
    for (var k = 0; k < panels.length; k++) {
      var layer  = panels[k].firstElementChild;
      if (!layer) continue;
      var offset = panels[k].getBoundingClientRect().left - splashRect.left;
      layer.style.width     = splashRect.width + 'px';
      layer.style.transform = 'translate3d(' + (-offset) + 'px,0,0)';
    }
  }

  function teardown() {
    if (finished) return;
    finished  = true;
    isFalling = true;
    window.clearTimeout(guard);
    window.removeEventListener('resize', alignLayers);
    if (splash.parentNode) splash.parentNode.removeChild(splash);
    root.classList.remove('is-loading');
    try { document.dispatchEvent(new Event('splash:done')); } catch (e) {}
  }

  function startFall() {
    if (finished) return;
    isFalling = true;
    splash.classList.add('is-falling');
  }

  try {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < PANEL_COUNT; i++) {
      var panel = document.createElement('div');
      panel.className = 'splash__panel';
      panel.style.setProperty('--i', i);
      var layer = document.createElement('div');
      layer.className = 'splash__word';
      for (var j = 0; j < WORD.length; j++) {
        var letter = document.createElement('span');
        letter.className = 'splash__letter';
        letter.textContent = WORD.charAt(j);
        letter.style.setProperty('--li', j);
        layer.appendChild(letter);
      }
      panel.appendChild(layer);
      frag.appendChild(panel);
    }
    splash.appendChild(frag);
    panels = Array.prototype.slice.call(splash.children);
    alignLayers();
    window.addEventListener('resize', alignLayers);
  } catch (e) {
    teardown();
    return;
  }

  var prefersReduced = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function play() {
    if (finished) return;
    splash.classList.add('is-typing');
    if (prefersReduced) {
      window.setTimeout(function () {
        if (finished) return;
        splash.style.transition = 'opacity 220ms ease';
        splash.style.opacity    = '0';
        window.setTimeout(teardown, 240);
      }, 800);
      return;
    }
    window.setTimeout(startFall, fallStart);
    window.setTimeout(teardown,  fallEnd + T.buffer);
  }

  function start() {
    requestAnimationFrame(function () {
      requestAnimationFrame(play);
    });
  }

  if (document.fonts && document.fonts.load) {
    var fontReady = document.fonts.load('400 1em "Gevora"').catch(function () {});
    var timedOut = new Promise(function (res) { setTimeout(res, 1200); });
    Promise.race([fontReady, timedOut]).then(start, start);
  } else {
    start();
  }
})();
