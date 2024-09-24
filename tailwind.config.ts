import forms from "@tailwindcss/forms";
import { type Config } from "tailwindcss";
import { addIconSelectors } from "@iconify/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [forms(), addIconSelectors(["heroicons"]), require("tailwindcss-animate")],
  darkMode: ["selector", ".dark", "class"],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
