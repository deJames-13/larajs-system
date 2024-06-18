/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./public/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Rubik', 'system-ui'],
      serif: ['Rubik', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      body: ['"Rubik"', 'Font Awesome']
      // display: ['""'],
    }
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  daisyui: {
    themes: ['corporate', 'dark', 'business'],
    base: true,
    styled: true,
    utils: true,
    logs: true,
    prefix: '',
    darkTheme: false
  },
}

