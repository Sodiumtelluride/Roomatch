/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "background-dark": "#1E1E1E",
        "app-white" : "#FFFFFF",
        "background-medium": "#3F3D4C",
        "highlight-color": "#8B7EFF"
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
