import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "light-blue-I": "#3f81bf",
        "mid-blue-I": "#2d5c88",
      },
      fontFamily: {
        Jost: ["Jost", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        '2xl': '1680px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
