/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: () => ({
        'mobile-landing': "url('./src/assets/bg-mobile-landing.jpeg')",
        'desktop-landing': "url('./src/assets/bg-desktop-landing.jpeg')",
      }),
      fontFamily: () => ({
        'julius': ["Julius Sans One", "sans-serif"]
      }),
      colors: {
        googleBlue: '#4285F4',
        darkGoogleBlue: '#4275D4',
        brightYellow: "#FFEB3B",
        googleGreen: "#34A853"
      }
    },
  },
  plugins: [],
}

