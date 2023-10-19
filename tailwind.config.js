/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./app/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}', './modules/**/*.{jsx,tsx}'],
   theme: {
      backgroundColor: ({ theme }) => ({
         ...theme('colors'),
         light: '#fafafa',
         soft: '#f4f5f6',
         strong: '#e5e8eb',
      }),
      borderColor: ({ theme }) => ({
         ...theme('colors'),
         soft: '#e4e5e7',
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
         transparent: 'transparent',
         white: '#fff',
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
         xs: '0.75rem', // 12px
         sm: '0.875rem', // 14px
         base: '1rem', // 16px
         lg: '1.125rem', // 18px
         xl: '1.25rem', // 20px
         '2xl': '1.3125rem', // 21px
         '3xl': '1.5rem', // 24px
         '4xl': '1.625rem', // 26px
         '5xl': '1.875rem', // 30px
         '6xl': '2.375rem', // 38px
         '7xl': '2.875rem', // 46px
         '8xl': '4.25rem', // 68px
      },
      textColor: ({ theme }) => ({
         ...theme('colors'),
         normal: '#1a1a1a',
         muted: '#6d7c90',
         inverted: '#fff',
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
