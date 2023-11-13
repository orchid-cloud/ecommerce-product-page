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
