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
    themes: [
      {
        'cupcake': {
          'primary': '#6a3fa3',
          'primary-focus': '#9e74c7',
          'primary-content': '#ffffff',

          'secondary': '#e7739e',
          'secondary-focus': '#ffaedf',
          'secondary-content': '#ffffff',

          'accent': '#C58ACF',
          'accent-focus': '#C58Aee',
          'accent-content': '#ffffff',

          'neutral': '#261230',
          'neutral-focus': '#200f29',
          'neutral-content': '#ffffff',

          'base-100': '#F9F9F7',
          'base-200': '#e9e9e9',
          'base-300': '#d8d8d8',
          'base-content': '#261230',

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',

          '--rounded-box': '1rem',
          '--rounded-btn': '1.9rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '.25s',
          '--animation-input': '.2s',
          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',


        },
      },
    ],

    base: true,
    styled: true,
    utils: true,
    logs: true,
    prefix: '',
    darkTheme: false
  },
}

