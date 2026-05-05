/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Starter brand palette — retune freely.
        // Warm gold accent (paying homage to the toll-booth-on-the-honor-system motif).
        brand: {
          50: '#fdf8ec',
          100: '#faecc7',
          200: '#f4d68b',
          300: '#edbb4f',
          400: '#e1a730',
          500: '#c08820',
          600: '#9c6818',
          700: '#754d11',
          800: '#4d320a',
          900: '#2a1b05',
        },
        ink: {
          50: '#f5f4f0',
          100: '#dcd9d1',
          200: '#a8a39a',
          300: '#6c6962',
          400: '#3d3b37',
          500: '#26241f',
          600: '#1a1815',
          700: '#100f0d',
          800: '#080706',
          900: '#020201',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        readable: '68ch',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
