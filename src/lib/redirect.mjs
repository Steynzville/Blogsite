export function redirectPath(search) {
  const params = new URLSearchParams(search);
  const marked = params.get('__veluce_path');
  if (marked && marked.startsWith('/') && !marked.startsWith('//') && !marked.includes('\\')) return marked;
  // Support old bookmarked Pages redirects, but never arbitrary query parameters.
  const old = search.slice(1);
  if (/^(article\/|category\/|articles(?:&|$)|about(?:&|$)|contact(?:&|$)|privacy(?:&|$)|terms(?:&|$)|affiliate(?:&|$))/.test(old)) {
    const [route, ...query] = old.split('&');
    return '/' + route + (query.length ? '?' + query.join('&').replaceAll('~and~', '&') : '');
  }
  return null;
}
export function restoreRedirect(win) {
  const path = redirectPath(win.location.search);
  if (path) win.history.replaceState(null, '', path);
}
