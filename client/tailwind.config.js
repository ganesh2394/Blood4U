/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this to scan all your component files
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      fontFamily: {
        notosans: ["Noto Sans", "sans-serif"],
        worksans: ["Work Sans", "sans-serif"],
        racesansone: ["Racing Sans One", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
