/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./app/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}', './modules/**/*.{jsx,tsx}'],
   theme: {
      backgroundColor: ({ theme }) => ({
         ...theme('colors'),
         light: '#fafafa',
         soft: '#f4f5f6',
         strong: '#e5e8eb',
         white: '#fff',
         transparent: 'transparent',
      }),
      borderColor: ({ theme }) => ({
         ...theme('colors'),
         soft: '#e4e5e7',
         transparent: 'transparent',
      }),
      borderRadius: {
         none: '0',
         full: '9999px',
      },
      colors: {
         accent: {
            primary: '#d74544',
         },
         error: '#e00',
      },
      container: {
         center: true,
         padding: '1rem',
      },
      fontFamily: {
         primary: 'var(--font-dm-sans)',
         secondary: 'var(--font-playfair-display)',
      },
      fontSize: {
         xs: '0.75rem',
         sm: '0.875rem',
         base: '1rem',
         lg: '1.125rem',
         xl: '1.25rem',
         '2xl': '1.3125rem',
         '3xl': '1.5rem',
         '4xl': '1.625rem',
         '5xl': '1.875rem',
         '6xl': '2.375rem',
         '7xl': '2.875rem',
         '8xl': '4.25rem',
      },
      letterSpacing: {
         normal: 0,
         wider: '1px',
      },
      textColor: ({ theme }) => ({
         ...theme('colors'),
         normal: '#1a1a1a',
         muted: '#6d7c90',
         inverted: '#fff',
         transparent: 'transparent',
      }),
      transitionDuration: {
         DEFAULT: '250ms',
      },
      transitionTimingFunction: {
         DEFAULT: 'ease-in-out',
      },
      extend: {
         screens: {
            xl: '1140px',
            '2xl': '1400px',
         },
      },
   },
   plugins: [require('@tailwindcss/typography')],
};
