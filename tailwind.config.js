/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        sand: {
          50: "#fdf8f0",
          100: "#f9edd8",
          200: "#f2d9a8",
          300: "#e8c06e",
          400: "#dda03c",
          500: "#c8861e",
          600: "#a96a14",
          700: "#875212",
          800: "#6e4215",
          900: "#5a3815",
        },
        slate: {
          850: "#1a2233",
          950: "#0d1117",
        },
      },
    },
  },
  plugins: [],
};
