/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'beige': '#edeec9',
        'dark-beige': '#ddb892',
        'light-green': '#606c38',
        'dark-green': '#283618',
        'light-brown': '#dda15e',
        'dark-brown' : '#bc6c25'
      },
    },
  },
  plugins: [],
};
