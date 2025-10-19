import getProducts from './api.js';
import {
  renderDatailPage,
  renderNotFound,
  uiElements,
  renderLoader,
  renderMenuCard,
} from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  const getMenu = await getProducts();
  console.log('get menu:', getMenu);

  if (window.location.pathname.includes('/index.html')) {
    renderLoader();
    console.log('pathname:', window.location.pathname);

    // verileri yükle
    renderMenuCard(getMenu);

    // Kategori alanındaki butonları gez ve her bir tıklanmayı yönet
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // tıklanılan button id’sine eriş
        const selectedCategory = button.id;

        // menüde id’si aynı olanları seç ve filteredMenu’ye aktar
        const filteredMenu = getMenu.filter(
          (item) => item.category == selectedCategory
        );

        // eğer 'all' seçildiyse varsayılan listeyi gönder
        if (selectedCategory == 'all') {
          renderMenuCard(getMenu);
        } else {
          // değilse filtrelenmiş olanı gönder
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    // URL’deki parametreye eriş
    const params = new URLSearchParams(window.location.search);
    console.log(params);

    // parametredeki id’ye eriş
    const itemId = +params.get('id');

    console.log('itemId: ', itemId);

    // menüde ilgili id’li ürünü bul
    const product = getMenu.find((item) => item.id == itemId);

    // ürün yoksa hata ver
    if (!product) {
      renderNotFound();
    } else {
      // ürünü göster
      renderDatailPage(product);
    }
  }
});
