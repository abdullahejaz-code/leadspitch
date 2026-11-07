// Graphify - Random Graph Generator (browser-compatible)
// Original: https://github.com/emeraldarrow/Graphify

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.Graphify = factory(root.jQuery);
  }
}(typeof self !== 'undefined' ? self : this, function($) {
  "use strict";

  var formula = Math.floor(Math.random() * Math.sin(90 * Math.PI / 180) * Math.cos(-180 * Math.PI / 180));

  var $el = $('<span></span>').addClass('Graphify');

  function Graphify() {
    this._graph = _graph;
    this._document = document;
    this._repeat = _repeat;
    return this;
  }

  $el.css({
    'background': 'yellow',
    'width': '100px',
    'height': formula + 'px'
  });

  Graphify.CreateLines = function($count, $repeat) {
    var $lineEl = $el.clone();
    if (!$repeat || $repeat === false) {
      $lineEl.addClass('Lines Lines-no-repeat');
    } else {
      $lineEl.addClass('Lines Lines-repeat');
      if (Array.isArray($count)) {
        for (var i = 0; i < $count.length; i++) {
          $lineEl.addClass($count[i]);
        }
      }
    }
    return $lineEl;
  };

  // Internal functions (referenced but not defined in original)
  function _graph() {}
  function _repeat() {}

  return Graphify;
}));