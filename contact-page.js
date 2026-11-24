(() => {
  const branches = [
  {
    "city": "Campinas",
    "type": "Matriz",
    "address": "Rua Rui Idelfonso Martins Lisboa, 690, Campos dos Amarais, Campinas – SP",
    "phones": [
      "(19) 3746-7000",
      "(19) 99631-7599"
    ],
    "image": "institucional.webp",
    "map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.5905385455517!2d-47.1043694850353!3d-22.854633685038326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c71c7de1d96b%3A0x7dd620e0f7f7cb14!2sR.+Rui+Idelfonso+Martins+Lisboa%2C+690+-+Ch%C3%A1caras+Campos+dos+Amarais%2C+Campinas+-+SP%2C+13082-020!5e0!3m2!1spt-BR!2sbr!4v1566439410110!5m2!1spt-BR!2sbr"
  },
  {
    "city": "Itu",
    "type": "Filial",
    "address": "Rua Marginal Emicol, s/n, Condomínio Empresarial West Park, Jardim Emicol, Itu – SP",
    "phones": [
      "(11) 94242-8323"
    ],
    "image": "filial-itu.webp",
    "map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.773375774448!2d-47.33280138502657!3d-23.32397988480121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf5aff9bddc469%3A0x95ca43d3ff8d4e86!2sJin+Embalagens+-+Souza+Viveiros+Com%C3%A9rcio+De+Embalagens+Ltda.!5e0!3m2!1spt-BR!2sbr!4v1566441194258!5m2!1spt-BR!2sbr"
  },
  {
    "city": "Limeira",
    "type": "Filial",
    "address": "Via Prefeito Jurandyr Paixão, 2.800, Centro Industrial de Limeira, Limeira – SP",
    "phones": [
      "(19) 3444-1328"
    ],
    "image": "filial-limeira.webp",
    "map": "https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3683.345613094675!2d-47.3751898!3d-22.6035656!3m2!1i1024!2i768!4f13.1!2m1!1sVia+Prefeito+Jurandyr+Paix%C3%A3o%2C+2.800+centro+industrial+de+limeira+Limeira+SP!5e0!3m2!1spt-BR!2sbr!4v1566441653643!5m2!1spt-BR!2sbr"
  },
  {
    "city": "Valinhos",
    "type": "Filial",
    "address": "Rua Carlos Pedroso da Silveira, 106, Condomínio Industrial Portal do Anhanguera, Macuco, Valinhos – SP",
    "phones": [
      "(19) 3881-4421"
    ],
    "image": "filial-valinhos.webp",
    "map": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1836.4912390459128!2d-47.0469447!3d-22.9876718!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cc6e71c813e1%3A0xd2e7acbf9ea4fee3!2sR.+Carlos+Pedroso+da+Silveira+-+Macuco%2C+Valinhos+-+SP%2C+13274-465!5e0!3m2!1spt-BR!2sbr!4v1566441735078!5m2!1spt-BR!2sbr"
  },
  {
    "city": "Mogi Mirim",
    "type": "Filial",
    "address": "Rodovia SP-147, km 66,3, Condomínio Industrial W Park, São João da Glória, Mogi Mirim – SP",
    "phones": [
      "(19) 3746-7000",
      "(19) 99631-7599"
    ],
    "image": "filial-mogi.webp",
    "map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.567259054416!2d-47.02348388504256!3d-22.445307885248447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8f77db404ea2b%3A0x8c0728d6cd85fb95!2sW+PARK+Condominio+Industrial!5e0!3m2!1spt-BR!2sbr!4v1566441850372!5m2!1spt-BR!2sbr"
  }
];
  for (const unit of branches) {
    const article = document.createElement('article');
    article.className = 'branch-card';
    const phones = unit.phones.map(phone => `<a href="tel:+55${phone.replace(/\D/g,'')}">${phone}</a>`).join('');
    const directions = new URL('https://www.google.com/maps/dir/');
    directions.search = new URLSearchParams({api:'1',destination:unit.address});
    article.innerHTML = `<img src="${jinAsset(unit.image)}" alt="Unidade Jin Embalagens em ${unit.city}" width="407" height="350" loading="lazy">
      <div class="branch-copy"><p class="eyebrow">${unit.type} · SP</p><h3>${unit.city}</h3><address>${unit.address}</address><div class="branch-phones">${phones}</div>
      <details><summary>Ver mapa de ${unit.city} ${icon('chevron-down')}</summary><a class="text-link" href="${directions.href}">Traçar rota no Google Maps ${icon('arrow-up-right')}</a></details></div>`;
    const panel = article.querySelector('details');
    panel.addEventListener('toggle', () => {
      if (!panel.open || panel.querySelector('iframe')) return;
      const frame = document.createElement('iframe');
      frame.title = 'Localização da Jin Embalagens em ' + unit.city;
      frame.src = unit.map;
      frame.loading = 'lazy';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allowFullscreen = true;
      panel.insertBefore(frame, panel.querySelector('a'));
    });
    get('branches').append(article);
  }

  const form = get('contact-form');
  const draft = get('contact-draft');
  const email = get('open-email');
  const name = get('contact-name');
  const message = get('contact-message');
  form.addEventListener('input', event => {
    event.target.setCustomValidity('');
    draft.hidden = true;
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!name.value.trim()) name.setCustomValidity('Digite seu nome.');
    if (message.value.trim().length < 10) message.setCustomValidity('Escreva uma mensagem com pelo menos 10 caracteres.');
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const phone = values.get('phone').trim();
    const body = ['Nome: ' + name.value.trim(), 'E-mail: ' + values.get('email').trim()];
    if (phone) body.push('Telefone: ' + phone);
    body.push('', message.value.trim());
    email.href = 'mailto:sac@jin.com.br?subject=' + encodeURIComponent(values.get('topic')) + '&body=' + encodeURIComponent(body.join('\r\n'));
    draft.hidden = false;
    get('contact-status').textContent = 'Mensagem preparada. Abra seu aplicativo de e-mail e confirme o envio.';
    email.focus();
  });
})();
