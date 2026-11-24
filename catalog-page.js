(() => {
  const search = get('catalog-search');
  const category = get('catalog-category');
  const sort = get('catalog-sort');
  const grid = get('product-grid');
  const tabs = get('catalog-tabs');
  const labels = new Map(jinCategories.map(item => [item.id, item.name]));
  const pageSize = 9;
  let page = 1;

  function filters() {
    const params = new URLSearchParams(location.search);
    const line = params.get('categoria');
    const order = params.get('ordem');
    return { line:labels.has(line) ? line : 'todos', text:params.get('busca') || '', order:order === 'az' || order === 'za' ? order : 'destaques' };
  }

  function linkTo({line,text,order}, hash = location.hash) {
    const params = new URLSearchParams();
    if (line !== 'todos') params.set('categoria', line);
    if (text.trim()) params.set('busca', text.trim());
    if (order !== 'destaques') params.set('ordem', order);
    return jinPage('produtos/', params, hash);
  }

  function apply(changes, replace = false, hash = location.hash) {
    const target = linkTo({ ...filters(), ...changes }, hash);
    if (target !== location.href) history[replace ? 'replaceState' : 'pushState'](null, '', target);
    page = 1;
    render();
  }

  for (const option of jinCategories) category.add(new Option(option.name, option.id));
  for (const option of [{ id:'todos', name:'Todas' }, ...jinCategories]) {
    const link = document.createElement('a');
    link.dataset.line = option.id;
    link.textContent = option.name;
    tabs.append(link);
  }
  function render() {
    const state = filters();
    const {line,text,order} = state;
    if (document.activeElement !== search || search.value.trim() !== text) search.value = text;
    category.value = line;
    sort.value = order;
    for (const link of tabs.children) {
      link.href = linkTo({ ...state, line:link.dataset.line }, '#catalogo');
      if (link.dataset.line === line) link.setAttribute('aria-current','true');
      else link.removeAttribute('aria-current');
    }
    const words = normalize(text).split(/\s+/).filter(Boolean);
    const results = jinProducts.filter(product => {
      if (line !== 'todos' && product.category !== line) return false;
      const searchable = normalize([product.name,product.code,product.id,product.pack,labels.get(product.category)].join(' '));
      return words.every(word => searchable.includes(word));
    });
    if (order !== 'destaques') results.sort((a,b) => (order === 'az' ? 1 : -1) * alphabet.compare(a.name,b.name));
    const last = Math.max(1, Math.ceil(results.length / pageSize));
    page = Math.max(1, Math.min(page,last));
    get('catalog-status').textContent = results.length === 1 ? '1 produto encontrado' : results.length + ' produtos encontrados';
    get('reset-catalog').hidden = line === 'todos' && !text && order === 'destaques';
    get('catalog-pagination').hidden = last === 1;
    get('page-status').textContent = 'Página ' + page + ' de ' + last;
    get('product-prev').disabled = page === 1;
    get('product-next').disabled = page === last;
    grid.innerHTML = results.length ? results.slice((page-1)*pageSize,page*pageSize).map(product => {
      const href = jinPage('produtos/' + product.slug + '/');
      return `<article class="product-card">
        <a class="product-image" href="${href}" aria-label="Ver detalhes de ${product.name}"><img src="${jinAsset(product.image)}" alt="" width="460" height="340" loading="lazy"></a>
        <div class="product-copy"><p class="product-category">${labels.get(product.category)} <span>Ref. ${product.code}</span></p><h3><a class="product-title" href="${href}">${product.name}</a></h3>
        <p class="metadata">${product.pack}</p><p class="price">Preço sob consulta</p><button class="button button-primary" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name} à lista de orçamento">${icon('bag')} Adicionar à lista</button></div></article>`;
    }).join('') : '<p class="empty">Nenhum produto encontrado. Tente outro termo ou limpe os filtros.</p>';
  }

  function changePage(direction) {
    page += direction;
    render();
    grid.querySelector('a')?.focus({ preventScroll:true });
    grid.scrollIntoView({ block:'start' });
  }
  search.addEventListener('input', () => apply({text:search.value}, true));
  category.addEventListener('change', () => apply({line:category.value}));
  sort.addEventListener('change', () => apply({order:sort.value}));
  tabs.addEventListener('click', event => {
    const link = event.target.closest('[data-line]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    apply({line:link.dataset.line}, false, '#catalogo');
  });
  get('reset-catalog').addEventListener('click', () => {
    apply({line:'todos',text:'',order:'destaques'});
    search.focus({preventScroll:true});
  });
  get('product-prev').addEventListener('click', () => changePage(-1));
  get('product-next').addEventListener('click', () => changePage(1));
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (button) addProduct(button.dataset.add,1);
  });
  window.addEventListener('popstate', () => { page=1; render(); });
  render();
})();
