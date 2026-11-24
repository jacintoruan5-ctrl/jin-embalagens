(() => {
  const current = document.body.dataset.section;
  const active = section => current === section ? ' aria-current="page"' : '';
  const categories = jinCategories.map(category =>
    `<a href="${jinPage('produtos/', 'categoria=' + category.id, '#catalogo')}">${category.name}</a>`
  ).join('');
  document.getElementById('site-chrome').outerHTML = `
    <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <div class="utility-bar"><div class="container utility-inner">
      <span><span data-icon="pin"></span> Distribuição a partir de Campinas, SP</span>
      <a href="${jinPage('contato/', '', '#unidades')}">Nossas unidades</a>
      <a href="tel:+551937467000"><span data-icon="phone"></span> (19) 3746-7000</a>
    </div></div>
    <header class="site-header container">
      <a class="brand" href="${jinPage()}" aria-label="Jin Embalagens, início"><img src="${jinAsset('jin-logo.png')}" alt="" width="58" height="47"></a>
      <nav class="main-nav" id="menu" aria-label="Menu principal">
        <a href="${jinPage()}">Início</a>
        <a href="${jinPage('produtos/')}"${active('produtos')}>Catálogo</a>
        <details class="nav-categories"><summary>Categorias <span data-icon="chevron-down"></span></summary><div id="category-menu">${categories}</div></details>
        <a href="${jinPage('quem-somos/')}"${active('quem-somos')}>Sobre a Jin</a>
        <a href="${jinPage('produtos/', '', '#personalizacao')}">Personalização</a>
        <a href="${jinPage('contato/')}"${active('contato')}>Contato</a>
      </nav>
      <form class="search" action="${jinPage('produtos/')}" role="search"><span data-icon="search"></span><label class="sr-only" for="search">Pesquisar no catálogo</label><input id="search" type="search" name="busca" placeholder="Buscar embalagens…" autocomplete="off"></form>
      <div class="header-actions">
        <button class="bag-button" id="open-quote" type="button" aria-label="Lista de orçamento"><span data-icon="bag"></span><span class="bag-label">Orçamento</span><span class="cart-count" hidden>0</span></button>
        <button class="icon-button menu-button" id="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><span data-icon="menu"></span></button>
      </div>
    </header>`;
  document.getElementById('site-bottom').outerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div><a class="brand" href="${jinPage()}" aria-label="Jin Embalagens, início"><img src="${jinAsset('jin-logo-branco.png')}" alt="" width="63" height="49"></a><p>Embalagens e descartáveis para o segmento alimentício.</p></div>
      <div><h2>Explore</h2><a href="${jinPage('produtos/')}">Catálogo</a><a href="${jinPage('quem-somos/','','#setores')}">Segmentos</a><a href="${jinPage('produtos/','','#personalizacao')}">Personalização</a></div>
      <div><h2>Sobre a Jin</h2><a href="${jinPage('quem-somos/')}">Quem somos</a><a href="${jinPage('contato/','','#unidades')}">Nossas unidades</a><a href="${jinPage('contato/')}">Atendimento</a></div>
      <div><h2>Fale com a Jin</h2><a href="tel:+551937467000">(19) 3746-7000</a><a href="mailto:sac@jin.com.br">sac@jin.com.br</a><a href="https://wa.me/5519997794448">WhatsApp comercial</a></div>
    </div>
    <div class="container footer-bottom"><span>Jin Embalagens</span><a href="https://jin.com.br/">Site oficial</a></div>
  </footer>
  <dialog id="quote-dialog" class="dialog drawer" aria-labelledby="quote-title">
    <div class="dialog-top"><h2 id="quote-title">Lista de orçamento</h2><button class="icon-button close-dialog" type="button" aria-label="Fechar lista" autofocus><span data-icon="x"></span></button></div>
    <div id="quote-items"></div>
    <form id="quote-form" class="quote-form" hidden>
      <p>Revise os itens e abra o WhatsApp para enviar o pedido à Jin.</p>
      <label for="quote-name">Seu nome</label><input id="quote-name" name="name" autocomplete="name" required maxlength="100">
      <label for="quote-note">Mensagem <span>(opcional)</span></label><textarea id="quote-note" name="note" rows="3" maxlength="500"></textarea>
      <button type="submit" class="button button-primary"><span data-icon="message"></span> Abrir no WhatsApp</button>
    </form>
  </dialog>
  <div class="toast" id="toast" role="status"></div>
  `;
  const menu = document.getElementById('menu');
  const button = document.getElementById('menu-toggle');
  const dropdown = menu.querySelector('details');
  button.addEventListener('click', () => toggleMenu(!menu.hasAttribute('data-open')));
  document.querySelector('.site-header').addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
    else if (menu.hasAttribute('data-open')) { toggleMenu(false); button.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-categories')) dropdown.open = false;
  });
})();
