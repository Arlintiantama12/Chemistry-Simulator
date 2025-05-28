/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chemistry': {
          'alkali': '#ef4444',
          'alkaline': '#f97316',
          'transition': '#3b82f6',
          'nonmetal': '#22c55e',
          'metalloid': '#a855f7',
          'noble': '#06b6d4',
          'metal': '#9ca3af',
          'halogen': '#eab308',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-chemistry-alkali',
    'bg-chemistry-alkaline', 
    'bg-chemistry-transition',
    'bg-chemistry-nonmetal',
    'bg-chemistry-metalloid',
    'bg-chemistry-noble',
    'bg-chemistry-metal',
    'bg-chemistry-halogen',
  ]
}
