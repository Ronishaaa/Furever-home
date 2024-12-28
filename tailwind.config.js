/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "1.25rem",
    },
  },
  theme: {
    colors: {
      primaryCream: '#E8E1D9',
      primaryBrown: '#977D6C',
      primaryBlack: '#000000',
      secondaryWhite: '#FFFFFF',
      secondaryLightBrown: '#B18F6A',
      secondaryDarkBrown: '#4E2C1D',
      neutralLightGray: '#F5F5F5',
      neutralDarkGray: '#212121',
      warningRed: '#D32F2F',
      primaryGreen: '#388E3C',
      primaryBlue: '#1E88E5',
      secondaryYellow: '#FFEB3B',
      coral: '#FF7043', 
    },
  },
  plugins: [],
};
