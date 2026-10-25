/* Tech4PM static-site navigation.
   The page source (src/index.html) uses #route links so it also works as a single-file preview.
   On the built site every route is its own page, so this script turns #route links into real
   paths, redirects old #route URLs, and makes the program page's language switch load the
   Armenian or English URL. */
(function () {
  var ROUTES = ['ai', 'program', 'courses', 'live', 'docs', 'lesson', 'schedule', 'teams',
    'resources', 'about', 'contact', 'privacy', 'terms', 'cookies', 'refunds'];
  var EN = window.T4P_LANG === 'en';

  function pathFor(r) {
    if (!r || r === 'home') return '/';
    if (r === 'program' || r === 'course-ai-pm-program') return EN ? '/en/program/' : '/program/';
    if (r.indexOf('course-') === 0) return '/courses/' + r.slice(7) + '/';
    if (r.indexOf('doc-') === 0) return '/docs/' + r.slice(4) + '/';
    if (ROUTES.indexOf(r) >= 0) return '/' + r + '/';
    return null;
  }

  function fix() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i], p = pathFor(a.getAttribute('href').slice(1));
      if (p === null) continue;
      if (a.hasAttribute('data-pick')) p = '/schedule/?course=' + encodeURIComponent(a.getAttribute('data-pick'));
      else if (a.hasAttribute('data-role')) p = '/ai/?role=' + encodeURIComponent(a.getAttribute('data-role'));
      a.setAttribute('href', p);
    }
  }
  window.T4P_fix = fix;
  fix();
  if (window.MutationObserver && document.body) {
    new MutationObserver(fix).observe(document.body, { childList: true, subtree: true });
  }

  // Old bookmarks such as tech4pm.com/#program, and in-page hash changes.
  function fromHash() {
    var p = pathFor(location.hash.slice(1));
    if (p && location.hash.length > 1 && p !== location.pathname) location.replace(p);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  document.addEventListener('click', function (e) {
    // On the schedule page, picking a course stays on the page (the page script selects it).
    var pick = e.target.closest && e.target.closest('a[data-pick]');
    if (pick && window.T4P_ROUTE === 'schedule') { e.preventDefault(); return; }
    // Language switch on the program page loads the matching URL.
    var lang = e.target.closest && e.target.closest('[data-lang]');
    if (lang && window.T4P_ROUTE === 'program') {
      e.preventDefault();
      e.stopImmediatePropagation();
      var target = lang.getAttribute('data-lang') === 'en' ? '/en/program/' : '/program/';
      if (target !== location.pathname) location.assign(target);
    }
  }, true);
})();
