export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./client-server/f1-app/src/**/*.{js,jsx,ts,tsx}",
    "./client-server/f1-app/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-slide-in-top',
    'animate-slide-in-bottom',
    'animate-fade-in',
    'animate-scale-in',
    'animate-float',
    'animate-glow',
    'animate-shimmer',
    'animate-race-start',
    'animate-podium-rise',
    'animate-champagne',
    'stagger-1',
    'stagger-2',
    'stagger-3',
    'stagger-4',
    'stagger-5',
  ],
}
