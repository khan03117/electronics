/** @type {import('tailwindcss').Config} */
import withMt from "@material-tailwind/react/utils/withMT";
export default withMt({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem'
      },
      colors: {
        primary: "#ff6162",
        secondary: "#111",
      }
    },
  },
  plugins: [],
})

