/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // For the App Router
    './pages/**/*.{js,ts,jsx,tsx}', // For the Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // Any reusable components
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      screens: {
        xs: "475px", // Extra small screens
      },
    },
  },
  plugins: [],
};
