module.exports = {
  content: ['App.js',
    './signup//*.{html,js}',
    './screens//*.{html,js}',
    './Premium//*.{html,js}',
    './components//*.{html,js}'],

  theme: {
    extend: {
      colors: {
        'custom-yellow': '#DCF8C6',
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
