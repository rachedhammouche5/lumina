/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 👈 هذا يـقـرا ملفات الـ app
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 👈 هذا يـقـرا ملفات الـ components
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // 👈 احتياطي
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}