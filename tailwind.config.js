/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      accent1: "#55505C",
      accent2: "#5D737E",
      accent3: "#6a8796",
      accent3hover: "#7fa3b4",
      txt1: "#999999",
      txt2: "#dfdfdf",
      border1: "#6a8796",
      border2: "#789aaa",
      error: "#bb3b3b",
    },
    extend: {
      fontFamily: { main: ["Inria Sans", "sans-serif", "arial"] },
    },
  },
  plugins: [],
};
