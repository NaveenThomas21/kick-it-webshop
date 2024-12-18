/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
                primary: '#00000066',
        secondary: 'grey',
        "dark-purple":"#081A51",
        "light-white":"rgba(255,255,255,0.17)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          zxl: '6rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'scale-up': 'scaleUp 0.5s ease-in-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
        'pulse-3-once': 'pulseAnimation 3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseAnimation: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 0.5 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.text-stroke': {
            '-webkit-text-stroke': '2px black',
            color: 'transparent',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
