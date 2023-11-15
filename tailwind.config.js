/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    screens: {
      sm: { min: '280px', max: '540px' },
      // => @media (min-width: 280px and max-width: 540px) { ... }

      md: { min: '541px', max: '768px' },
      // => @media (min-width: 540px and max-width: 768px) { ... }

      lg: { min: '769px', max: '992px' },
      // => @media (min-width: 769px and max-width: 992px) { ... }

      xl: '993px',
      // => @media (min-width: 993px) { ... }
    },
    extend: {
      width: {
        '450px': '28rem',
        '1020px': '64rem',
      },
      backgroundImage: {
        'main-image': "url('../images/image-product-1.jpg')",
        'hamburger': "url('../images/icon-menu.svg')",
        'closed': "url('../images/icon-close.svg')",
      },
      colors: {
        orange: 'var(--orange)',
        orange_svg: '#ff7d1a',
        pale_orange: 'var(--pale-orange)',
        light_gray: 'var(--light-gray)',
        dark_gray: 'var(--dark-gray)',
        grayish_blue: 'var(--grayish_blue)',
        white: 'var(--white)',
        lightbox_bg: 'var(--lightbox-bg)',
      },
      variants: {
        fill: ['responsive', 'hover', 'focus'],
      },
    },
  },

  plugins: [],
};
