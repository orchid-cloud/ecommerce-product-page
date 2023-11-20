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

// const lightbox = document.createElement('div');
// lightbox.id = 'lightbox';
// document.body.appendChild(lightbox);

// const images = document.querySelectorAll('img');
// images.forEach((image) => {
//   image.addEventListener('click', () => {
//     lightbox.classList.add('active');

//     const img = document.createElement('img');
//     img.src = image.src;
//     while (lightbox.firstChild) {
//       lightbox.removeChild(lightbox.firstChild);
//     }
//     lightbox.appendChild(img);
//   });
// });

// lightbox.addEventListener('click', (e) => {
//   if (e.target !== e.currentTarget) {
//     return;
//   } else {
//     lightbox.classList.remove('active');
//   }
// });

const lightbox = document.getElementById('lightbox');
const lightboxThumbs = document.querySelectorAll('[data-thumbs-item]');

function startPreview(src, index) {
  mainImg.src = src;

  openLightbox();
  removeThumbnailActive();
  lightboxThumbs[index].querySelector('div').classList.add('thumbnail-active');
}

document
  .querySelector('[data-main-image]')
  .addEventListener('click', (e) => startPreview(e.target.src, 0));

document.querySelectorAll('[data-main-thumb]').forEach((el, index) => {
  el.addEventListener('click', (e) => startPreview(e.target.src, index));
});

function lightboxIsOpen() {
  return lightbox.getAttribute('data-visible') === 'true';
}

function openLightbox() {
  const lightboxVisibility = lightbox.getAttribute('data-visible');

  if (lightboxVisibility === 'false') {
    lightbox.setAttribute('data-visible', 'true');
  }
}

function closeLightbox() {
  lightbox.setAttribute('data-visible', 'false');
}

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

let mainImg = document.getElementById('main-img');

lightboxThumbs.forEach((el) =>
  el.addEventListener('click', (e) => {
    removeThumbnailActive();

    let cover = e.target;
    let src = e.currentTarget.querySelector('img').src;
    mainImg.src = src;
    cover.classList.add('thumbnail-active');
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

// const thumbnailPictures = document.getElementById('thumbnail-pictures');

// thumbnailPictures.addEventListener('click', (e) =>
//   lightboxSlider(e.target.src, index)
// );
function lightboxSlider(e) {
  let direction = e.currentTarget.id === 'next' ? 1 : -1;
  const thumbnailNodes = document.querySelectorAll('[data-thumbs-item]');

  const listThumbsPictures = Array.prototype.slice.call(thumbnailNodes);

  const index = listThumbsPictures.findIndex((el) =>
    el.querySelector('.thumbnail-active')
  );

  const imgsrc = listThumbsPictures[index].querySelector('img').src;
  const nextIndex =
    index + direction < 0
      ? listThumbsPictures.length - 1
      : (index + direction) % listThumbsPictures.length;
  startPreview(imgsrc, nextIndex);
}

document
  .querySelectorAll('[data-lightbox-controll]')
  .forEach((el) => el.addEventListener('click', lightboxSlider));
