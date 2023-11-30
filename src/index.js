// const { doc } = require('prettier');

const navigation = document.getElementById('navigation');
const navToggle = document.getElementById('mobile-nav-toggle');
const bg = document.getElementById('dark_bg');

navToggle.addEventListener('click', () => {
  const visibility = navigation.getAttribute('data-visible');

  if (visibility === 'false') {
    navigation.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
    bg.setAttribute('data-visible', true);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    closeNav();
  }
});

function closeNav() {
  navigation.setAttribute('data-visible', false);
  navToggle.setAttribute('aria-expanded', false);
  bg.setAttribute('data-visible', false);
  document.body.style.position = '';
  document.body.style.top = '';
}

document.addEventListener('click', (event) => {
  if (event.target.closest('#mobile-nav-toggle')) return;

  if (
    navigation.getAttribute('data-visible') === 'true' &&
    !event.target.closest('nav')
  ) {
    closeNav();
  }
});

//carousel for mobile

const buttons = document.querySelectorAll('[data-carousel-button]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
    const slides = button
      .closest('[data-carousel]')
      .querySelector('[data-slides]');

    const activeSlide = slides.querySelector('[data-active]');

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

//lightbox in desktop mode

document
  .querySelector('[data-main-image]')
  .addEventListener('click', (e) => startPreview(e.target.src, 0));

document.querySelectorAll('[data-main-thumb]').forEach((el, index) => {
  el.addEventListener('click', (e) => startPreview(e.target.src, index));
});

let mainLightboxImg = document.getElementById('main-img');

const lightbox = document.getElementById('lightbox');
const lightboxThumbs = document.querySelectorAll('[data-thumbs-item]');

function startPreview(src, index) {
  mainLightboxImg.src = src;

  openLightbox();
  removeThumbnailActive();
  lightboxThumbs[index].querySelector('div').classList.add('thumbnail-active');
}

function lightboxIsOpen() {
  return lightbox.getAttribute('data-visible') === 'true';
}

function openLightbox() {
  if (!lightboxIsOpen()) {
    lightbox.setAttribute('data-visible', 'true');
  }
}

function closeLightbox() {
  lightbox.setAttribute('data-visible', 'false');
}

//close on screen click
document.addEventListener('click', (event) => {
  if (
    lightboxIsOpen() &&
    (event.target.id === 'lightbox' || event.target.closest('#close-lightbox'))
  ) {
    closeLightbox();
  }
});

//close on escape btn
document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ('key' in evt) {
    isEscape = evt.key === 'Escape' || evt.key === 'Esc';
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    lightboxIsOpen() && closeLightbox();
  }
};

//lightbox image change on thumbnail click

lightboxThumbs.forEach((el) =>
  el.addEventListener('click', (e) => {
    removeThumbnailActive();

    let thumbCover = e.target;
    let thumb = e.currentTarget;

    mainLightboxImg.src = thumb.querySelector('img').src;
    thumbCover.classList.add('thumbnail-active');
  })
);

function removeThumbnailActive() {
  document
    .querySelectorAll('[data-thumbs-item] .thumbnail-active')
    .forEach((el) => {
      el.classList.remove('thumbnail-active');
    });
}

//slider lightbox on button click

function lightboxSlider(e) {
  let direction = e.currentTarget.id === 'next' ? 1 : -1;

  const thumbnailNodes = document.querySelectorAll('[data-thumbs-item]');
  const listThumbsPictures = Array.prototype.slice.call(thumbnailNodes);

  const index = listThumbsPictures.findIndex((el) =>
    el.querySelector('.thumbnail-active')
  );
  const nextIndex =
    index + direction < 0
      ? listThumbsPictures.length - 1
      : (index + direction) % listThumbsPictures.length;

  const imgsrc = listThumbsPictures[nextIndex].querySelector('img').src;
  startPreview(imgsrc, nextIndex);
}

document
  .querySelectorAll('[data-lightbox-controll]')
  .forEach((el) => el.addEventListener('click', lightboxSlider));

//buttons item quantity

const addItem = document.querySelector('#item-plus');
const deductItem = document.querySelector('#item-minus');

let itemQuantity = document.querySelector('#item-quantity');

addItem.addEventListener('click', () => {
  let currentItemNumber = parseInt(itemQuantity.innerHTML);
  itemQuantity.innerHTML = currentItemNumber + 1;
});

deductItem.addEventListener('click', () => {
  let currentItemNumber = parseInt(itemQuantity.innerHTML);
  itemQuantity.innerHTML = currentItemNumber === 0 ? 0 : currentItemNumber - 1;
});

//cart open

const cartShown = document.getElementById('cart-empty');
const cartToggle = document.getElementById('cart-toggle');

cartToggle.addEventListener('click', () => {
  const visibility = cartShown.getAttribute('data-visible');

  if (visibility === 'false') {
    cartShown.setAttribute('data-visible', true);
    cartToggle.setAttribute('area-expanded', true);
  } else {
    closeCart();
  }
});

function closeCart() {
  cartShown.setAttribute('data-visible', false);
  cartToggle.setAttribute('area-expanded', false);
}

//add to cart

const cartWithItem = document.getElementById('cart-filled');
const addToCart = document.getElementById('add-to-cart');
const quantityAdded = document.getElementById('quantity-added');
const totalPrice = document.getElementById('total-price');

addToCart.addEventListener('click', () => {
  const visibility = cartWithItem.getAttribute('data-visible');
  const currentItemNumber = parseInt(itemQuantity.innerHTML);

  if (visibility === 'false' && currentItemNumber > 0) {
    cartWithItem.setAttribute('data-visible', true);
    addToCart.setAttribute('area-expanded', true);
    quantityAdded.innerHTML = currentItemNumber;
    calculatePrice();
  } else return;
});

function calculatePrice() {
  const currentItemNumber = parseInt(itemQuantity.innerHTML);
  totalPrice.innerHTML = currentItemNumber * 125;
}
