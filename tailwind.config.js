/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        //utiliser shadow-custom, car tailwind ajoute automatiquement le nom de la propriété css
        custom: "0 0 20px 15px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        "slate-gray": "#6D6D6D",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
