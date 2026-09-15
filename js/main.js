// Mind The Small Print — shared site behaviour
// Vanilla JS, no build step, no dependencies.

document.addEventListener('DOMContentLoaded', function () {
  // Footer copyright year
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  initArticleFilters();
});

function initArticleFilters() {
  var grid = document.getElementById('article-grid');
  if (!grid) return; // only present on articles.html

  var pills = Array.prototype.slice.call(document.querySelectorAll('.filter-pill'));
  var searchInput = document.getElementById('article-search');
  var emptyState = document.getElementById('empty-state');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));

  var activeCategory = 'All';

  function applyFilters() {
    var query = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute('data-category');
      var title = card.getAttribute('data-title') || '';
      var excerpt = card.getAttribute('data-excerpt') || '';

      var matchesCategory = activeCategory === 'All' || category === activeCategory;
      var matchesQuery = !query || title.indexOf(query) !== -1 || excerpt.indexOf(query) !== -1;

      var visible = matchesCategory && matchesQuery;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  function selectCategory(category) {
    var match = pills.filter(function (p) { return p.getAttribute('data-filter') === category; })[0];
    if (!match) return;
    pills.forEach(function (p) { p.classList.remove('active'); });
    match.classList.add('active');
    activeCategory = category;
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      selectCategory(pill.getAttribute('data-filter'));
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Deep-link support: ?category=Sports%20Law pre-selects that filter pill
  // (used by the "What I cover" links on the About page).
  var params = new URLSearchParams(window.location.search);
  var requestedCategory = params.get('category');
  if (requestedCategory) {
    selectCategory(requestedCategory);
  }
  applyFilters();
}
