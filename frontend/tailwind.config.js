/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "background-dark": "#2A2933",
        "app-white" : "#FFFFFF",
        "background-medium": "#3F3D4C",
        "highlight-color": "#8B7EFF",
        "text-grey": "#B3B3B3",
        "valid-green": "#4CAF50",
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
