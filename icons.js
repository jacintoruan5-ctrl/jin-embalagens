const icons = {
  bag: '<path d="M5 8h14l2 13H3L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
  package: '<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Zm0 0 9 4 9-4m-9 4v10M7.5 5l9 4v4"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="m6 6 12 12M6 18 18 6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'arrow-right': '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  'arrow-up-right': '<path d="M6 18 18 6M8 6h10v10"/>',
  pin: '<path d="M20 10c0 5-8 10-8 10s-8-5-8-10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2a13 13 0 0 1-8-8l2-2-2-4Z"/>',
  headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2M3 13h4v7H5a2 2 0 0 1-2-2v-5Zm18 0h-4v7h2a2 2 0 0 0 2-2v-5Z"/>',
  truck: '<path d="M1 5h14v12H1V5Zm14 4h4l4 4v4h-8"/><circle cx="6" cy="18" r="2" fill="white"/><circle cx="19" cy="18" r="2" fill="white"/>',
  message: '<path d="M20 10a8 8 0 0 1-12 7l-5 2 1.5-5A8 8 0 1 1 20 10Z"/><path d="M8 10h8M8 13h5"/>',
};

function icon(name) {
  return '<span data-icon="' + name + '"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg></span>';
}
