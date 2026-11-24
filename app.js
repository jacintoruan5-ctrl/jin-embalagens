const categories = homeCategories;
const products = homeProducts;

const slides = [
  { label:'Embalagens para o setor alimentício', title:'A embalagem certa', emphasis:'para cada negócio.', description:'Do balcão ao delivery, encontre embalagens e descartáveis para a rotina do seu negócio.', link:'Explorar catálogo', href:'#produtos' },
  { label:'Personalização', title:'Sua marca em', emphasis:'cada entrega.', description:'Escolha a embalagem e solicite uma simulação com seu logotipo à equipe Jin.', link:'Ver personalização', href:'#personalizacao' },
  { label:'Atendimento regional', title:'A Jin mais perto', emphasis:'do seu negócio.', description:'Conheça a matriz em Campinas e as filiais. Fale com a equipe para confirmar a entrega na sua cidade.', link:'Encontrar uma unidade', href:'#unidades' },
];

const get = id => document.getElementById(id);
const categoryName = id => categories.find(category => category.id === id)?.name ?? '';
const findProduct = id => jinProducts.find(product => product.id === id);
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const number = new Intl.NumberFormat('pt-BR');
const alphabet = new Intl.Collator('pt-BR', { numeric: true });
const pageSize = 4;
const maxQuantity = 9999;
const whatsapp = 'https://wa.me/5519997794448';
const productDialog = get('product-dialog');
const quoteDialog = get('quote-dialog');
const searchInput = get('search');
const catalogSearch = get('catalog-search');
const catalogCategory = get('catalog-category');
const catalogSort = get('catalog-sort');
let slide = 0;
let page = 0;
let toastTimer;
let quote = loadQuote();

function loadQuote() {
  try {
    const saved = JSON.parse(localStorage.getItem('jin-quote') || '{}') ?? {};
    return Object.fromEntries(jinProducts.flatMap(({ id }) => {
      const quantity = Number(saved[id]);
      return Number.isInteger(quantity) && quantity > 0 && quantity <= maxQuantity ? [[id, quantity]] : [];
    }));
  } catch {
    return {};
  }
}

function productImage(product, decorative = false) {
  return '<img src="assets/' + product.image + '" alt="' + (decorative ? '' : product.name) + '" width="460" height="340" loading="lazy">';
}

function categoryHref(id) {
  return (id === 'todos' ? location.href.split(/[?#]/)[0] : '?categoria=' + id) + '#produtos';
}

function getFilters() {
  const params = new URLSearchParams(location.search);
  const category = params.get('categoria');
  const order = params.get('ordem');
  return {
    category: categoryName(category) ? category : 'todos',
    query: params.get('busca')?.trim() ?? '',
    order: order === 'az' || order === 'za' ? order : 'destaques',
  };
}

function updateFilters(filters, { move = false, replace = false } = {}) {
  const { category, query, order } = { ...getFilters(), ...filters };
  const url = new URL(location.href);
  url.search = '';
  if (category !== 'todos') url.searchParams.set('categoria', category);
  if (query) url.searchParams.set('busca', query);
  if (order !== 'destaques') url.searchParams.set('ordem', order);
  if (move) url.hash = 'produtos';
  if (url.href !== location.href) history[replace ? 'replaceState' : 'pushState'](null, '', url);
  page = 0;
  renderCatalog();
  updateNavigation();
  if (move) get('produtos').scrollIntoView();
}

function renderCatalog() {
  const { category, query, order } = getFilters();
  for (const input of [searchInput, catalogSearch]) {
    if (input.value !== query && (document.activeElement !== input || input.value.trim() !== query)) input.value = query;
  }
  catalogCategory.value = category;
  catalogSort.value = order;
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const matches = products.filter(product => (
    (category === 'todos' || product.category === category) &&
    terms.every(term => normalize([product.name, product.code, product.id, product.pack, categoryName(product.category)].join(' ')).includes(term))
  ));
  if (order !== 'destaques') {
    matches.sort((first, second) => (order === 'az' ? 1 : -1) * alphabet.compare(first.name, second.name));
  }
  const filtered = category !== 'todos' || Boolean(query) || order !== 'destaques';
  const last = Math.max(Math.ceil(matches.length / pageSize) - 1, 0);
  page = Math.min(page, last);
  get('catalog-status').textContent = number.format(matches.length) + (matches.length === 1 ? ' produto encontrado' : ' produtos encontrados');
  get('reset-catalog').hidden = !filtered;
  get('catalog-pagination').hidden = last === 0;
  get('page-status').textContent = 'Página ' + number.format(page + 1) + ' de ' + number.format(last + 1);
  get('product-prev').disabled = page === 0;
  get('product-next').disabled = page === last;

  for (const card of get('category-grid').querySelectorAll('a')) {
    if (card.dataset.category === category) card.setAttribute('aria-current', 'true');
    else card.removeAttribute('aria-current');
  }

  get('product-grid').innerHTML = matches.length ? matches.slice(page * pageSize, (page + 1) * pageSize).map(product => `
    <article class="product-card">
      <button class="product-image" type="button" data-detail="${product.id}" aria-label="Ver detalhes de ${product.name}">${productImage(product, true)}</button>
      <div class="product-copy">
        <p class="product-category">${categoryName(product.category)} <span>Ref. ${product.code}</span></p>
        <h3><button class="product-title" type="button" data-detail="${product.id}">${product.name}</button></h3>
        <p class="metadata">${product.pack}</p>
        <p class="price">Preço sob consulta</p>
        <button class="button button-primary" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name} ao orçamento">${icon('bag')} Adicionar à lista</button>
      </div>
    </article>`).join('') : '<p class="empty">Nenhuma embalagem encontrada. Tente outro termo ou limpe os filtros.</p>';
}

function renderSlide() {
  const item = slides[slide];
  get('hero-label').textContent = item.label;
  get('hero-title').innerHTML = item.title + ' <em>' + item.emphasis + '</em>';
  get('hero-description').textContent = item.description;
  const link = get('hero-link');
  link.href = slide === 0 ? categoryHref('todos') : item.href;
  if (slide === 0) link.dataset.category = 'todos';
  else delete link.dataset.category;
  link.innerHTML = item.link + ' ' + icon('arrow-right');
  get('inicio').dataset.slide = slide;
  for (const [index, button] of [...get('hero-dots').children].entries()) {
    button.setAttribute('aria-pressed', String(index === slide));
  }
}

function changeSlide(index) {
  slide = (index + slides.length) % slides.length;
  renderSlide();
}

function renderDetail(product) {
  const fullPage = findProduct(product.id);
  get('product-dialog-title').textContent = product.name;
  get('product-detail').innerHTML = `
    <div class="detail-image">${productImage(product)}</div>
    <div class="detail-info">
      <p>${categoryName(product.category)} · Ref. ${product.code}</p>
      <p class="metadata">${product.pack}</p>
      <p class="price">Preço sob consulta</p>
      <a class="text-link" href="${jinPage('produtos/' + fullPage.slug + '/')}">Ver ficha completa</a>
    </div>
    <form class="detail-form" data-product="${product.id}">
      <label for="detail-quantity">Quantidade de lotes</label>
      <input id="detail-quantity" name="quantity" type="number" min="1" max="${maxQuantity}" step="1" value="1" required>
      <button type="submit" class="button button-primary">${icon('bag')} Adicionar à lista</button>
    </form>`;
  productDialog.showModal();
}

function notify(message) {
  clearTimeout(toastTimer);
  get('toast').textContent = message;
  toastTimer = setTimeout(() => { get('toast').textContent = ''; }, 3200);
}

function updateQuote() {
  const quantity = Object.values(quote).reduce((total, value) => total + value, 0);
  const badge = document.querySelector('.cart-count');
  badge.hidden = quantity === 0;
  badge.textContent = quantity > 99 ? '99+' : number.format(quantity);
  get('open-quote').setAttribute('aria-label', quantity ? 'Lista de orçamento, ' + number.format(quantity) + ' lotes' : 'Lista de orçamento');
}

function saveQuote() {
  try { localStorage.setItem('jin-quote', JSON.stringify(quote)); } catch { /* The current page can still prepare an estimate. */ }
  updateQuote();
}

function addProduct(id, quantity) {
  const product = findProduct(id);
  if (!product || !Number.isInteger(quantity) || quantity < 1) return false;
  const next = (quote[id] ?? 0) + quantity;
  if (next > maxQuantity) {
    if (productDialog?.open) productDialog.close();
    notify('Limite de 9.999 lotes por produto.');
    return false;
  }
  quote[id] = next;
  saveQuote();
  if (productDialog?.open) productDialog.close();
  notify(product.name + ' adicionado à lista.');
  return true;
}

function renderQuote() {
  const entries = Object.entries(quote);
  get('quote-form').hidden = entries.length === 0;
  get('quote-items').innerHTML = entries.length ? entries.map(([id, quantity]) => {
    const product = findProduct(id);
    return `<div class="quote-line">
      <div><strong>${product.name}</strong><p class="metadata">Ref. ${product.code} · ${product.pack}</p></div>
      <input type="number" min="1" max="${maxQuantity}" step="1" required form="quote-form" data-quantity="${id}" value="${quantity}" aria-label="Lotes de ${product.name}">
      <button class="icon-button" type="button" data-remove="${id}" aria-label="Remover ${product.name}">${icon('x')}</button>
    </div>`;
  }).join('') : '<p class="empty">A sua lista está vazia. Adicione embalagens do catálogo para montar seu orçamento.</p>';
}

function toggleMenu(open) {
  const button = get('menu-toggle');
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  button.innerHTML = icon(open ? 'x' : 'menu');
  get('menu').toggleAttribute('data-open', open);
}

function updateNavigation() {
  const hash = location.hash || '#inicio';
  for (const link of document.querySelectorAll('.main-nav > a')) {
    if (link.getAttribute('href') === hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

for (const placeholder of document.querySelectorAll('[data-icon]')) placeholder.outerHTML = icon(placeholder.dataset.icon);
if (get('inicio')) {
  get('category-grid').innerHTML = categories.map(category => {
    const product = products.find(item => item.category === category.id);
    return `<a class="category-card" data-category="${category.id}" href="${categoryHref(category.id)}"><span class="category-image">${productImage(product, true)}</span><span>${category.name}</span></a>`;
  }).join('');
  get('category-menu').innerHTML = categories.map(category => `<a href="${categoryHref(category.id)}" data-category="${category.id}">${category.name}</a>`).join('');
  for (const category of categories) catalogCategory.add(new Option(category.name, category.id));
  get('hero-dots').innerHTML = slides.map((item, index) => `<button type="button" data-slide="${index}" aria-label="${item.label}"></button>`).join('');
  get('hero-prev').addEventListener('click', () => changeSlide(slide - 1));
  get('hero-next').addEventListener('click', () => changeSlide(slide + 1));
  get('hero-dots').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button) changeSlide(Number(button.dataset.slide));
  });
  function changeCatalogPage(direction) {
    page += direction;
    renderCatalog();
    get('product-grid').querySelector('[data-detail]')?.focus({ preventScroll: true });
    get('product-grid').scrollIntoView({ block: 'start' });
  }
  get('product-prev').addEventListener('click', () => changeCatalogPage(-1));
  get('product-next').addEventListener('click', () => changeCatalogPage(1));
  get('reset-catalog').addEventListener('click', () => {
    updateFilters({ category: 'todos', query: '', order: 'destaques' });
    catalogSearch.focus({ preventScroll: true });
  });
  get('menu-toggle').addEventListener('click', () => toggleMenu(!get('menu').hasAttribute('data-open')));
  get('menu').addEventListener('keydown', event => {
    if (event.key === 'Escape' && get('menu').hasAttribute('data-open')) {
      toggleMenu(false);
      get('menu-toggle').focus();
    }
  });
  get('search-form').addEventListener('submit', event => {
    event.preventDefault();
    updateFilters({ category: 'todos', query: searchInput.value.trim() }, { move: true });
    catalogSearch.focus({ preventScroll: true });
  });
  searchInput.addEventListener('input', () => updateFilters({ category: 'todos', query: searchInput.value.trim() }, { replace: true }));
  catalogSearch.addEventListener('input', () => updateFilters({ query: catalogSearch.value.trim() }, { replace: true }));
  catalogCategory.addEventListener('change', () => updateFilters({ category: catalogCategory.value }));
  catalogSort.addEventListener('change', () => updateFilters({ order: catalogSort.value }));
  document.addEventListener('click', event => {
    const categoryLink = event.target.closest('a[data-category]');
    if (categoryLink && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      updateFilters({ category: categoryLink.dataset.category, query: '' }, { move: true });
    }
    const dropdown = document.querySelector('.nav-categories');
    if (!event.target.closest('.nav-categories')) dropdown.open = false;
    const menuLink = event.target.closest('#menu a');
    if (menuLink) {
      dropdown.open = false;
      const wasOpen = get('menu').hasAttribute('data-open');
      toggleMenu(false);
      if (wasOpen && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        const destination = categoryLink ? get('products-title') : get(menuLink.hash.slice(1));
        destination?.setAttribute('tabindex', '-1');
        destination?.focus({ preventScroll: true });
        if (categoryLink) get('produtos').scrollIntoView();
      }
    }
  });
  get('product-grid').addEventListener('click', event => {
    const detail = event.target.closest('[data-detail]');
    const add = event.target.closest('[data-add]');
    if (detail) renderDetail(products.find(product => product.id === detail.dataset.detail));
    if (add) addProduct(add.dataset.add, 1);
  });
  productDialog.addEventListener('submit', event => {
    event.preventDefault();
    addProduct(event.target.dataset.product, Number(new FormData(event.target).get('quantity')));
  });
  productDialog.querySelector('.close-dialog').addEventListener('click', () => productDialog.close());
  window.addEventListener('popstate', () => { page = 0; renderCatalog(); updateNavigation(); });
  window.addEventListener('hashchange', updateNavigation);
  renderSlide();
  renderCatalog();
  updateNavigation();
}

function openQuote() {
  renderQuote();
  if (!quoteDialog.open) quoteDialog.showModal();
}
get('open-quote').addEventListener('click', openQuote);
quoteDialog.querySelector('.close-dialog').addEventListener('click', () => quoteDialog.close());
get('quote-items').addEventListener('change', event => {
  const field = event.target.closest('[data-quantity]');
  if (field && field.validity.valid) { quote[field.dataset.quantity] = Number(field.value); saveQuote(); }
});
get('quote-items').addEventListener('click', event => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  delete quote[button.dataset.remove];
  saveQuote();
  renderQuote();
  (quoteDialog.querySelector('[data-quantity]') ?? quoteDialog.querySelector('.close-dialog')).focus();
});
get('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.target);
  const fields = [...get('quote-items').querySelectorAll('[data-quantity]')];
  if (!fields.length) return;
  const lines = fields.map(field => {
    const product = findProduct(field.dataset.quantity);
    return '• ' + number.format(Number(field.value)) + ' lote(s) — ' + product.name + ' (ref. ' + product.code + ', ' + product.pack + ')';
  });
  const note = form.get('note').trim();
  const message = ['Olá, meu nome é ' + form.get('name').trim() + '. Gostaria de solicitar um orçamento:', ...lines, note].filter(Boolean).join('\n');
  window.open(whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
function refreshQuote() {
  quote = loadQuote();
  updateQuote();
  if (quoteDialog.open) renderQuote();
}
window.addEventListener('storage', event => { if (event.key === 'jin-quote' || event.key === null) refreshQuote(); });
window.addEventListener('pageshow', event => { if (event.persisted) refreshQuote(); });
updateQuote();
