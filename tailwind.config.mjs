/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#2337ff',
        'accent-dark': '#000d8a',
        black: 'rgb(15 18 25)',
        gray: 'rgb(96 115 159)',
        'gray-light': 'rgb(229 233 240)',
        'gray-dark': 'rgb(34 41 57)',
      },
      fontFamily: {
        sans: ['sans-serif'],
      },
      fontSize: {
        base: '20px',
        '18': '18px',
      },
      lineHeight: {
        '1.7': '1.7',
        '1.2': '1.2',
      },
      maxWidth: {
        '720': '720px',
      },
      width: {
        '720': '720px',
      },
      boxShadow: {
        'custom': '0 2px 6px rgb(96 115 159 / 25%), 0 8px 24px rgb(96 115 159 / 33%), 0 16px 32px rgb(96 115 159 / 33%)',
        'header': '0 2px 8px rgb(15 18 25 / 5%)',
      },
      backgroundImage: {
        'gray-gradient': 'linear-gradient(rgb(229 233 240 / 50%), #fff)',
      },
      borderRadius: {
        '2px': '2px',
        '8px': '8px',
        '0.2em': '0.2em',
      },
    },
  },
  plugins: [],
}