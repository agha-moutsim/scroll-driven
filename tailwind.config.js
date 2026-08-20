/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        dark: '#111',
        gray: {
          400: '#444',
          500: '#555',
          600: '#7c7c7c',
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
        pulse: 'pulse 2s infinite ease-out',
        scroll: 'scroll 1.5s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        scroll: {
          '0%': { top: '6px', opacity: '1' },
          '100%': { top: '20px', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
