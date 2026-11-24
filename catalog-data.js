const homeCategories = [
  { id: 'copos', name: 'Copos' },
  { id: 'potes', name: 'Potes' },
  { id: 'bandejas', name: 'Bandejas' },
  { id: 'delivery', name: 'Delivery' },
  { id: 'garrafas', name: 'Garrafas' },
  { id: 'talheres', name: 'Talheres' },
];

const jinCategories = [
  { id:'copos', name:'Copos', image:'copo.webp' },
  { id:'fast-food', name:'Fast food', image:'fast-food-mfx02.webp' },
  { id:'freezer', name:'Freezer e micro-ondas', image:'pote-freezer.webp' },
  { id:'laminados', name:'Laminados', image:'laminado.webp' },
  { id:'padaria', name:'Padaria', image:'padaria-mp15.webp' },
  { id:'potes', name:'Potes', image:'pote.webp' },
  { id:'filmes-pvc', name:'Filmes PVC', image:'filme-pvc-domestico.webp' },
  { id:'bandejas', name:'Bandejas', image:'bandeja.webp' },
  { id:'delivery', name:'Embalagens para delivery', image:'delivery.webp' },
  { id:'garrafas', name:'Garrafas', image:'garrafa.webp' },
  { id:'talheres', name:'Talheres', image:'talheres.webp' },
  { id:'papel', name:'Papéis', image:'papel-manteiga.webp' },
  { id:'lanchonete', name:'Lanchonete', image:'lanchonete-hm05.webp' },
  { id:'hortifruti', name:'Hortifruti', image:'hortifruti-mei.webp' },
];

const specializedCategories = { '5034':'fast-food', '5303':'freezer', '5304':'freezer' };
const extraProducts = [
  { id:'5096', category:'fast-food', name:'Embalagem MFX02', code:'MFX02', pack:'60 unidades', image:'fast-food-mfx02.webp', source:'mfx02-01x60/5096' },
  { id:'4059', category:'laminados', name:'Bandeja laminada preta M05', code:'M05', pack:'400 unidades', image:'laminado.webp', source:'m05-preta-laminada-01x400/4059' },
  { id:'5225', category:'padaria', name:'Embalagem MP15 com tampa alta cristal', code:'MP15', pack:'150 unidades', image:'padaria-mp15.webp', source:'mp15-tp-alta-cristal-01x150/5225' },
  { id:'0003', category:'filmes-pvc', name:'Filme PVC Linha Doméstica', code:'0003', pack:'Linha doméstica', image:'filme-pvc-domestico.webp', source:'linha-domestica/0003' },
  { id:'0002', category:'filmes-pvc', name:'Filme PVC HM Life Manual', code:'0002', pack:'Linha manual', image:'filme-pvc-hm-life.webp', source:'linha-hm-life-manual/0002' },
  { id:'0001', category:'filmes-pvc', name:'Filme PVC HM Life Máquina Automática', code:'0001', pack:'Linha para máquinas automáticas', image:'filme-pvc-hm-life.webp', source:'linha-hm-life-maquina-automatica/0001' },
  { id:'2071', category:'papel', name:'Papel manteiga cortado', code:'2071', pack:'1.600 unidades', image:'papel-manteiga.webp', source:'papel-manteiga-cortado-1x1600/2071' },
  { id:'1205', category:'potes', name:'Pote PL26', code:'PL26', pack:'24 × 25 unidades', image:'pote-pl26.webp', source:'pl26-24x25/1205' },
  { id:'5500', category:'lanchonete', name:'Embalagem funda HM05', code:'HM05', pack:'150 unidades', image:'lanchonete-hm05.webp', source:'hm05-funda-01x150/5500' },
  { id:'5150', category:'hortifruti', name:'Embalagem MEI-110 sem furo', code:'MEI-110', pack:'Modelo sem furo', image:'hortifruti-mei.webp', source:'mei110-sem-furo/5150' },
];

const homeProducts = [
  { id:'5072', category:'copos', name:'Copo térmico CP-700', code:'CP-700', pack:'24 × 15 unidades', image:'copo.webp', source:'copo-termico-cp700-24x15/5072' },
  { id:'3311', category:'potes', name:'Pote com lacre Cast Pack', code:'3311', pack:'250 ml · 4 × 125 unidades', image:'pote.webp', source:'-pote-lacre-cast-pack-250ml-04x125/3311' },
  { id:'4060', category:'bandejas', name:'Bandeja M-05P', code:'M-05P', pack:'Linha Standard', image:'bandeja.webp', source:'m05p/4060' },
  { id:'5082', category:'delivery', name:'Embalagem MO600-2 com tampa', code:'MO600-2', pack:'50 unidades', image:'delivery.webp', source:'mo6002-com-tampa-01x50/5082' },
  { id:'2044', category:'garrafas', name:'Garrafa PET 300 ml', code:'2044', pack:'300 ml · 100 unidades', image:'garrafa.webp', source:'garrafa-nova-pet-01x100-300-ml/2044' },
  { id:'5519', category:'talheres', name:'Kit garfo e faca branco', code:'5519', pack:'150 unidades', image:'talheres.webp', source:'kit-garfo-faca-branco-01x150/5519' },
  { id:'5303', category:'potes', name:'Embalagem MPP14', code:'MPP14', pack:'750 ml · 100 unidades', image:'pote-freezer.webp', source:'mpp14-750ml-c-100/5303' },
  { id:'5071', category:'copos', name:'Copo térmico CP-500', code:'CP-500', pack:'18 × 25 unidades', image:'copo-500.webp', source:'copo-termico-cp500-18x25/5071' },
  { id:'5070', category:'copos', name:'Copo térmico CP-300', code:'CP-300', pack:'24 × 25 unidades', image:'copo-300.webp', source:'copo-termico-cp300-24x25/5070' },
  { id:'5304', category:'potes', name:'Embalagem MPP16', code:'MPP16', pack:'500 ml · 100 unidades', image:'pote-500.webp', source:'mpp16-500ml-c-100/5304' },
  { id:'5055', category:'potes', name:'Pote Meiwa CPS-2', code:'CPS-2', pack:'150 ml · 24 × 30 unidades', image:'pote-150.webp', source:'cps2-pote-meiwa-150ml-24x30/5055' },
  { id:'2217', category:'bandejas', name:'Bandeja M-54', code:'M-54', pack:'Linha Standard', image:'bandeja-m54.webp', source:'m54/2217' },
  { id:'5043', category:'delivery', name:'Embalagem MO90F', code:'MO90F', pack:'100 unidades', image:'delivery-mo90.webp', source:'mo90f-01x100/5043' },
  { id:'5034', category:'delivery', name:'Embalagem MC500 com tampa', code:'MC500', pack:'200 unidades', image:'delivery-mc500.webp', source:'mc500-c-tp-01x200/5034' },
  { id:'5518', category:'talheres', name:'Colher Master branca', code:'5518', pack:'500 unidades', image:'colher.webp', source:'colher-master-branca-01x500/5518' },
];


const jinProducts = [...homeProducts, ...extraProducts].map(product => ({
  ...product,
  category: specializedCategories[product.id] || product.category,
  slug: product.source.replace(/\//g, '-').replace(/^-/, ''),
}));
