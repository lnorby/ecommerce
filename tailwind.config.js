/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./app/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}', './modules/**/*.{jsx,tsx}'],
   theme: {
      backgroundColor: ({ theme }) => ({
         ...theme('colors'),
         transparent: 'transparent',
      }),
      borderColor: ({ theme }) => ({
         ...theme('colors'),
         transparent: 'transparent',
      }),
      borderRadius: {
         none: '0',
         full: '9999px',
      },
      colors: {
         accent: {
            primary: '',
         },
      },
      container: ({ theme }) => ({
         center: true,
         padding: '1.25rem',
         screens: {
            sm: theme('screens.sm'),
            md: theme('screens.md'),
            lg: theme('screens.lg'),
            xl: theme('screens.xl'),
            '2xl': theme('screens.2xl'),
         },
      }),
      fontFamily: {
         primary: 'var(--font-inter)',
      },
      fontSize: {
         xs: '0.75rem',
         sm: '0.875rem',
         base: '1rem',
         lg: '1.125rem',
      },
      textColor: ({ theme }) => ({
         ...theme('colors'),
         normal: '#000',
         transparent: 'transparent',
      }),
      extend: {},
   },
   plugins: [],
};
