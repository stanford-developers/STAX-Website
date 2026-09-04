// STAX — shared chrome + behavior
(function () {
  var body = document.body;
  var depth = parseInt(body.getAttribute('data-depth') || '0', 10);
  var page = body.getAttribute('data-page') || '';
  var root = depth === 1 ? '../' : '';
  var img = root + '../public/img/';

  var NAV = [
    ['home', 'index.html', 'Home'],
    ['research', 'research.html', 'Research'],
    ['about', 'about.html', 'About'],
    ['news', 'news.html', 'News'],
    ['events', 'events.html', 'Events'],
    ['careers', 'careers.html', 'Work With Us']
  ];
  var navHtml = NAV.map(function (n) {
    return '<a href="' + root + n[1] + '"' + (page === n[0] ? ' class="active" aria-current="page"' : '') + '>' + n[2] + '</a>';
  }).join('');

  // Skip link + Stanford Identity Bar (required, top of every page) + site header
  var header =
    '<a class="skip-link" href="#main">Skip to main content</a>' +
    '<header class="site" id="hdr"><div class="wrap bar">' +
      '<a class="brand" href="' + root + 'index.html">' +
        '<img class="gsb" src="' + img + 'gsb-logo.png" alt="Stanford Graduate School of Business">' +
        '<span class="aff">The Stanford Tax Lab</span>' +
      '</a>' +
      '<nav class="main" id="primary-nav" aria-label="Primary">' + navHtml + '</nav>' +
      '<button class="menu-btn" id="menuBtn" aria-label="Menu" aria-controls="primary-nav" aria-expanded="false">Menu</button>' +
    '</div></header>';
  var hp = document.getElementById('site-header');
  if (hp) hp.outerHTML = header;

  // Local footer (with required Accessibility link) + Stanford Global Footer (required, bottom of every page)
  var footer =
    '<footer class="site"><div class="wrap">' +
      '<div class="fgrid">' +
        '<div>' +
          '<img class="fgsb" src="' + img + 'gsb-logo.png" alt="Stanford Graduate School of Business">' +
          '<p class="full">The Stanford Tax Lab. A cross-disciplinary tax research group at the Stanford Graduate School of Business.</p>' +
        '</div>' +
        '<div><h5>Explore</h5>' +
          '<a class="fl" href="' + root + 'research.html">Research</a>' +
          '<a class="fl" href="' + root + 'about.html">About</a>' +
          '<a class="fl" href="' + root + 'news.html">News</a>' +
          '<a class="fl" href="' + root + 'events.html">Events</a>' +
          '<a class="fl" href="' + root + 'careers.html">Work With Us</a>' +
        '</div>' +
        '<div><h5>Contact</h5>' +
          '<a class="fl" href="mailto:stax@stanford.edu">stax@stanford.edu</a>' +
          '<a class="fl" href="https://www.gsb.stanford.edu/">655 Knight Way<br>Stanford, CA 94305</a>' +
        '</div>' +
      '</div>' +
      '<div class="fbot">' +
        '<nav class="fnav" aria-label="Stanford">' +
          '<a href="https://www.stanford.edu">Stanford Home</a>' +
          '<a href="https://visit.stanford.edu/plan/">Maps &amp; Directions</a>' +
          '<a href="https://www.stanford.edu/search/">Search Stanford</a>' +
          '<a href="https://emergency.stanford.edu">Emergency Info</a>' +
          '<a href="https://www.stanford.edu/site/terms/">Terms of Use</a>' +
          '<a href="https://www.stanford.edu/site/copyright/">Copyright</a>' +
          '<a href="https://www.stanford.edu/site/trademarks/">Trademarks</a>' +
          '<a href="https://non-discrimination.stanford.edu">Non-Discrimination</a>' +
          '<a href="https://accessibility.stanford.edu">Accessibility</a>' +
        '</nav>' +
        '<div class="fcopy">&copy; 2026 Stanford Graduate School of Business · Stanford University, Stanford, CA 94305</div>' +
      '</div>' +
    '</div></footer>';
  var fp = document.getElementById('site-footer');
  if (fp) fp.outerHTML = footer;

  // Skip-link target
  var m = document.querySelector('main');
  if (m && !m.id) m.id = 'main';

  // Sticky header shadow
  var hdr = document.getElementById('hdr');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu toggle
  var mb = document.getElementById('menuBtn');
  var nv = document.getElementById('primary-nav');
  if (mb && nv) {
    mb.addEventListener('click', function () {
      var open = nv.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nv.classList.contains('open')) {
        nv.classList.remove('open');
        mb.setAttribute('aria-expanded', 'false');
        mb.focus();
      }
    });
  }

  // Give the repeated "Read paper" links a distinct accessible name
  document.querySelectorAll('.paper').forEach(function (p) {
    var t = p.querySelector('h3');
    var dl = p.querySelector('.dl');
    if (t && dl && !dl.getAttribute('aria-label')) {
      dl.setAttribute('aria-label', 'Read paper: ' + t.textContent.trim());
    }
  });

  // Reveal on scroll
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 3, 3) * 70) + 'ms';
      io.observe(el);
    });
  }

  // Research category filter (aria-pressed toggle buttons)
  var filters = document.querySelectorAll('.filter');
  if (filters.length) {
    var papers = document.querySelectorAll('.paper[data-cat]');
    var applyFilter = function (cat) {
      papers.forEach(function (p) {
        var show = cat === 'all' ? true
          : cat === 'featured' ? p.getAttribute('data-featured') === 'true'
          : p.getAttribute('data-cat') === cat;
        p.hidden = !show;
        if (show) p.classList.add('in');
      });
      var empty = document.getElementById('papers-empty');
      if (empty) empty.hidden = [].some.call(papers, function (p) { return !p.hidden; });
    };
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        applyFilter(btn.getAttribute('data-filter'));
      });
    });
    var initial = document.querySelector('.filter[aria-pressed="true"]') || filters[0];
    applyFilter(initial.getAttribute('data-filter'));
  }

  // Events tabs (ARIA tablist). Panels render visible without JS; JS hides inactive.
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = [].slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var activate = function (i, focus) {
      tabs.forEach(function (t, j) {
        var sel = j === i;
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        t.tabIndex = sel ? 0 : -1;
        if (panels[j]) panels[j].hidden = !sel;
      });
      if (focus && tabs[i]) tabs[i].focus();
    };
    var start = 0;
    tabs.forEach(function (t, i) { if (t.getAttribute('aria-selected') === 'true') start = i; });
    activate(start, false);
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i, false); });
      t.addEventListener('keydown', function (e) {
        var n;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(n, true);
      });
    });
  }
})();
