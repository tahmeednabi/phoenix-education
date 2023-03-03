// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');
const path = require('path');

/** @type {import('tailwindcss/types').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './modules/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './slices/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    primaryColor: 'blue',
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1920px',
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: colors.blue,
        blue: {
          50: '#ffffff',
          100: '#d7d8ff',
          200: '#bdbeff',
          300: '#8090f8',
          400: '#5871f1',
          500: '#3c44e3',
          600: '#3941e0',
          700: '#314cd5',
          800: '#2335a8',
          900: '#1b1d91',
        },
        teal: {
          100: '#d7fcff',
          200: '#bbf5e7',
          300: '#81ece3',
          400: '#5de5e0',
          500: '#47c6d2',
          600: '#43d0d0',
          700: '#36b7b3',
          800: '#269393',
          900: '#1b917f',
        },
        dark: {
          100: '#d5d7e0',
          200: '#b2b3c0',
          300: '#888a98',
          400: '#5c5e70',
          500: '#424354',
          600: '#282831',
          700: '#1b1d25',
          800: '#121318',
          900: '#000000',
          1000: '#000000',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#98a3b2',
          500: '#6d7a8c',
          600: '#4c5869',
          700: '#3c434f',
          800: '#2c323b',
          900: '#24272f',
          1000: '#14171e',
          1100: '#0d0d13',
        },
        red: {
          100: 'rgb(255,255,255)',
          200: 'rgb(248,211,211)',
          300: 'rgb(241,167,167)',
          400: 'rgb(234,97,97)',
          500: 'rgb(228,78,78)',
          600: 'rgb(215,65,65)',
          700: 'rgb(192,65,65)',
          800: 'rgb(185,64,64)',
          900: 'rgb(154,60,60)',
          1000: 'rgb(112,39,39)',
        },
      },
      transitionProperty: {
        width: 'width',
      },
      animation: {
        opacity: 'kf_opacity 0.6s ease-out',
        modal: 'kf_modal 0.3s ease-out',
        shake: 'kf_shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'bg-blur': 'kf_blur 1s ease-out',
        'slide-left': 'kf_slide_left 0.5s ease-out',
        'slide-up': 'kf_slide_up 0.5s ease-out',
      },
      keyframes: {
        kf_modal: {
          '0%': {
            opacity: 0.5,
            filter: 'blur(2px)',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: 1,
            filter: 'blur(0px)',
            transform: 'translateY(0px)',
          },
        },
        kf_opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        kf_shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        kf_blur: {
          '0%': { backdropFilter: 'blur(0px)' },
          '100%': { backdropFilter: 'blur(8px)' },
        },
        kf_slide_left: {
          '0%': { transform: 'translateX(4rem)', opacity: 0 },
          '100%': { transform: 'translateX(0rem)', opacity: 1 },
        },
        kf_slide_up: {
          '0%': { transform: 'translateY(4rem)', opacity: 0 },
          '100%': { transform: 'translateY(0rem)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('children', '& *');
    },
    function ({ addVariant }) {
      addVariant('span', '& > span');
    },
  ],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
