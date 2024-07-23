/** @type {import('tailwindcss').Config} */
export default {
 

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "hijau-muda": "#CAFFFB",
        "hijau-tua": "#0FA588",
      },
    },
  },
  plugins: [],
};
