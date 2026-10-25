// Shows the English or French version: ?lang=fr|en first, then the browser
// language. The choice follows internal links so the whole visit stays in it.
(function () {
  var param = new URLSearchParams(location.search).get('lang');
  var lang = param === 'fr' || param === 'en'
    ? param
    : ((navigator.language || 'en').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en');

  function show(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    var visible = document.querySelector('[data-lang="' + lang + '"] h1');
    if (visible) {
      var heading = visible.textContent;
      document.title = heading.indexOf('IRCC Tracker') === 0 ? heading : heading + ' · IRCC Tracker';
    }
    document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
      var url = new URL(a.getAttribute('href'), location.href);
      url.searchParams.set('lang', lang);
      a.href = url.pathname + url.search;
    });
  }

  document.querySelectorAll('[data-switch]').forEach(function (button) {
    button.addEventListener('click', function () {
      show(button.getAttribute('data-switch'));
      var url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.pathname + url.search);
    });
  });
  show(lang);
})();
