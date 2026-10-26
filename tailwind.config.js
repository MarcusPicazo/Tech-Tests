/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      reading: '900px', // umbral para el layout de lectura (texto/preguntas)
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        // Baloo 2 para titulos redondeados, Nunito para texto corrido.
        display: ['"Baloo 2"', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        // Permite usar font-400 / font-600 / font-700 / font-800 de forma explicita.
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
      },
      colors: {
        // Paleta alegre y de alto contraste (estilo Duolingo).
        brand: {
          50: '#eefbf3',
          100: '#d6f5e0',
          200: '#a5e6c2',
          300: '#78dd9d',
          400: '#43c574',
          500: '#22b14c', // verde principal
          600: '#178f3d',
          700: '#137033',
          800: '#12592c',
          900: '#0f4926',
        },
        sky: {
          400: '#38bdf8',
          500: '#1ca0e6',
          600: '#1b81c4',
        },
        sun: {
          400: '#ffd12e',
          500: '#ffb703',
          600: '#e29500',
        },
        coral: {
          400: '#ff7a6b',
          500: '#f5473d',
          600: '#d62f2f',
        },
        ink: {
          DEFAULT: '#2b2d42',
          soft: '#4b4f66',
          faint: '#8a8fa6',
        },
        paper: '#f6f7fb',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(43, 45, 66, 0.25)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-40px)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        pop: 'pop 320ms ease-out',
        'slide-in-right': 'slide-in-right 260ms ease-out',
        'slide-out-left': 'slide-out-left 220ms ease-in',
        shimmer: 'shimmer 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};
