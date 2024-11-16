/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green': {
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
        },
        'yellow': {
          100: '#fef9c3',
          600: '#ca8a04',
          700: '#a16207',
        },
        'blue': {
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'indigo': {
          100: '#e0e7ff',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-green-100',
    'text-green-600',
    'text-green-700',
    'bg-yellow-100',
    'text-yellow-600',
    'text-yellow-700',
    'bg-blue-100',
    'text-blue-600',
    'text-blue-700',
    'bg-indigo-100',
    'text-indigo-600',
    'text-indigo-700',
  ],
};