(() => {
  const form = get('detail-order');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const quantity = Number(new FormData(form).get('quantity'));
    if (addProduct(form.dataset.product,quantity) && event.submitter?.value === 'quote') openQuote();
  });
})();
