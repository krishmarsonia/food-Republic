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
        primepink: "#FF4A6F",
        backGrey: "#FEF5E4",
        magicgreen: "#10B985",
        lightPink: "#fff8f9"
      }
    },
    
  },
  plugins: [
    function ({addUtilities} : any){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }
      }

      addUtilities(newUtilities);
    },
    require("tailwind-scrollbar-hide")
  ],
  darkMode: "class"
};
export default config;
