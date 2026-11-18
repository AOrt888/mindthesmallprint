// Mind The Small Print: shared site behaviour
// Vanilla JS, no build step, no dependencies.

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {
  // Footer copyright year
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  initMenu();
  initReveal();
  initLens();
  initProgress();
  initArticleFilters();
});

// Mobile menu button
function initMenu() {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

// Fade and spring sections in as they scroll into view
function initReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });
  items.forEach(function (el, i) {
    el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
    io.observe(el);
  });
}

// Magnifying lens over the strip of tiny "small print" text on the homepage.
// Follows the cursor on desktop and drifts slowly on touch screens.
function initLens() {
  var band = document.querySelector('.lens-band');
  if (!band) return;
  var text = band.querySelector('.lens-text');
  var lens = band.querySelector('.lens');
  var inner = lens.querySelector('.lens-inner');
  var copy = text.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  inner.appendChild(copy);

  var SCALE = 3;
  var pos = { x: band.clientWidth * 0.35, y: band.clientHeight / 2 };

  function place() {
    var w = band.clientWidth, h = band.clientHeight, r = lens.offsetWidth / 2;
    inner.style.width = w + 'px';
    inner.style.height = h + 'px';
    lens.style.left = (pos.x - r) + 'px';
    lens.style.top = (pos.y - r) + 'px';
    inner.style.transform = 'translate(' + (r - pos.x * SCALE - 4) + 'px,' + (r - pos.y * SCALE - 4) + 'px) scale(' + SCALE + ')';
  }

  window.addEventListener('resize', place);
  place();
  if (reduceMotion) return;

  var touch = window.matchMedia('(hover: none)').matches;
  if (!touch) {
    band.addEventListener('pointermove', function (e) {
      var rect = band.getBoundingClientRect();
      pos.x = e.clientX - rect.left;
      pos.y = e.clientY - rect.top;
      place();
    });
    return;
  }
  var t = 0;
  (function drift() {
    t += 0.006;
    var w = band.clientWidth, h = band.clientHeight, r = lens.offsetWidth / 2;
    pos.x = w / 2 + Math.sin(t) * (w / 2 - r - 10);
    pos.y = h / 2 + Math.sin(t * 1.7) * (h / 2 - r - 6);
    place();
    requestAnimationFrame(drift);
  })();
}

// Reading progress bar on article pages
function initProgress() {
  var bar = document.querySelector('.progress');
  if (!bar) return;
  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = 'scaleX(' + p + ')';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// Category filters and search on the Articles page
function initArticleFilters() {
  var grid = document.getElementById('article-grid');
  if (!grid) return; // only present on articles.html

  var pills = Array.prototype.slice.call(document.querySelectorAll('.filter-pill'));
  var searchInput = document.getElementById('article-search');
  var emptyState = document.getElementById('empty-state');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));

  var activeCategory = 'All';

  function applyFilters(animate) {
    var query = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      // Cards can belong to more than one category, stored comma-separated
      // (e.g. "Sports Law,Intellectual Property Law"), so a card shows up
      // whenever any of its categories match the active filter pill.
      var categories = (card.getAttribute('data-category') || '').split(',').map(function (c) { return c.trim(); });
      var title = card.getAttribute('data-title') || '';
      var excerpt = card.getAttribute('data-excerpt') || '';

      var matchesCategory = activeCategory === 'All' || categories.indexOf(activeCategory) !== -1;
      var matchesQuery = !query || title.indexOf(query) !== -1 || excerpt.indexOf(query) !== -1;

      var visible = matchesCategory && matchesQuery;
      card.classList.toggle('is-hidden', !visible);
      if (visible) {
        visibleCount++;
        if (animate && !reduceMotion) {
          card.classList.remove('pop');
          void card.offsetWidth;
          card.classList.add('pop');
        }
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  function selectCategory(category) {
    var match = pills.filter(function (p) { return p.getAttribute('data-filter') === category; })[0];
    if (!match) return;
    pills.forEach(function (p) { p.classList.remove('active'); p.setAttribute('aria-pressed', 'false'); });
    match.classList.add('active');
    match.setAttribute('aria-pressed', 'true');
    activeCategory = category;
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      selectCategory(pill.getAttribute('data-filter'));
      applyFilters(true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () { applyFilters(false); });
  }

  // Deep-link support: ?category=Sports%20Law pre-selects that filter pill
  // (used by the "What I cover" links on the homepage and About page).
  var params = new URLSearchParams(window.location.search);
  var requestedCategory = params.get('category');
  if (requestedCategory) {
    selectCategory(requestedCategory);
  }
  applyFilters(false);
}
