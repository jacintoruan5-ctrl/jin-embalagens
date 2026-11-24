const jinRoot = new URL('./', document.currentScript.src);
const jinAsset = name => new URL('assets/' + name, jinRoot).href;

function jinPage(path = '', search = '', hash = '') {
  const url = new URL(path + (jinRoot.protocol === 'file:' ? 'index.html' : ''), jinRoot);
  url.search = search;
  url.hash = hash;
  return url.href;
}

for (const link of document.querySelectorAll('[data-page-link]')) {
  link.href = jinPage(link.dataset.pageLink, link.dataset.pageQuery || '', link.dataset.pageHash || '');
}
