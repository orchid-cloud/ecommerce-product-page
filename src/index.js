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
