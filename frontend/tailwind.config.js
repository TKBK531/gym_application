/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Include TypeScript files
  mode: "jit", // Enable JIT mode for faster compilation
  theme: {
    extend: {
      colors: {
        "primary-red": "#8B0000",
        "primary-shade-1": "#EB0000",
        "primary-shade-2": "#B30707",
        "primary-shade-3": "#8B0000", // This was a duplicate of primary-red
        "primary-shade-4": "#7E0000",
        "primary-shade-5": "#560606",
        "secondary-golden": "#F6BC0C",
        "secondary-golden-shade-1": "#fada79",
        "info-dark-blue": "#002A3A",
      },
      backgroundImage: {
        // Move gradients here
        "regal-sunset":
          "linear-gradient(to bottom right, #EB0000, #F6BC0C, #7E0000)",
        "fiery-depth": "linear-gradient(to right, #560606, #B30707)",
        "golden-ember": "linear-gradient(to top, #7E0000, #F6BC0C, #8B0000)",
        "royal-contrast": "linear-gradient(to bottom left, #8B0000, #002A3A)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        base: ["16px", "1.5"], // Default font size
        sub: ["14px", "1.5"], // Smaller font size
        heading1: ["clamp(2.5rem, 4vw, 4rem)", { lineHeight: 1.2 }], // Responsive heading
        heading2: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: 1.3 }], // Responsive heading
        heading3: ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: 1.4 }], // Responsive heading
        heading4: ["20px", "1.5"], // Smaller heading
      },
    },
    screens: {
      xs: "480px",
      ss: "620px", // Add a screen size between xs and sm if needed
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
