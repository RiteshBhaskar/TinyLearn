/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bubble: ['"Baloo 2"', '"Fredoka"', '"Nunito"', 'sans-serif'],
        fredoka: ['"Fredoka"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Baloo 2"', 'sans-serif'],
        sans: ['"Baloo 2"', '"Fredoka"', '"Nunito"', 'sans-serif'],
      },
      colors: {
        candy: {
          blue: '#4DA6FF',
          darkBlue: '#2575FC',
          lightBlue: '#E8F4FF',
          yellow: '#FFD93D',
          darkYellow: '#F39C12',
          lightYellow: '#FFF9E6',
          pink: '#FF7EB6',
          darkPink: '#E84393',
          lightPink: '#FFF0F6',
          green: '#6EDB8F',
          darkGreen: '#2ECC71',
          lightGreen: '#EDFDF2',
          purple: '#9B7EDE',
          darkPurple: '#6C5CE7',
          lightPurple: '#F3F0FF',
          orange: '#FF9F43',
          darkOrange: '#EE5253',
          lightOrange: '#FFF4EB',
          peach: '#FFEAA7',
          mint: '#55E6C1',
        }
      },
      boxShadow: {
        'toy-blue': '0 8px 0 0 #2575FC',
        'toy-yellow': '0 8px 0 0 #D48806',
        'toy-pink': '0 8px 0 0 #D63384',
        'toy-green': '0 8px 0 0 #1E8E3E',
        'toy-purple': '0 8px 0 0 #5E35B1',
        'toy-orange': '0 8px 0 0 #D35400',
        'toy-white': '0 8px 0 0 #CBD5E1',
      },
      animation: {
        'bounce-slow': 'bounceSlow 2.5s ease-in-out infinite',
        'wiggle': 'wiggle 1.2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'pop-in': 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'cloud-drift': 'cloudDrift 25s linear infinite',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.75)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110vw)' },
        }
      }
    },
  },
  plugins: [],
}
