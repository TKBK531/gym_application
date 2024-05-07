/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#8B0000",
        primary_shade_1: "#EB0000",
        primary_shade_2: "#B30707",
        primary_shade_3: "#8B0000",
        primary_shade_4: "#7E0000",
        primary_shade_5: "#560606",
        secondary: "#F6BC0C",
        info: "#002A3A",
        // dimWhite: "rgba(255, 255, 255, 0.7)",
        // dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
