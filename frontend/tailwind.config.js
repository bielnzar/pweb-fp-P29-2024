const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        backgroundLight: 'var(--background-light)',
        backgroundDark: 'var(--background-dark)',
        textLight: 'var(--text-light)',
        textDark: 'var(--text-dark)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-primary-gradient': {
          background: 'var(--primary-gradient)',
        },
      });
    }),
  ],
};
