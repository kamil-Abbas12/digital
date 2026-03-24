import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
      },
      colors: {
        brand: { 50:"#eef3ff", 100:"#dce6ff", 200:"#b9ccff", 300:"#86a5ff", 400:"#5a7ef7", DEFAULT:"#3659f5", 600:"#2442e0", 700:"#1d35c0", 800:"#1e2f9b", 900:"#1e2c7c" },
        surface: { DEFAULT:"#f8f9fd", card:"#ffffff", sidebar:"#ffffff" },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 16px -2px rgb(0 0 0 / 0.06)",
        wallet: "0 8px 40px -8px rgb(54 89 245 / 0.45)",
        btn: "0 4px 14px -2px rgb(54 89 245 / 0.50)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease both",
        "slide-in": "slideIn 0.4s ease both",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { from:{ opacity:"0", transform:"translateY(16px)" }, to:{ opacity:"1", transform:"translateY(0)" } },
        slideIn: { from:{ opacity:"0", transform:"translateX(-12px)" }, to:{ opacity:"1", transform:"translateX(0)" } },
        pulse2: { "0%,100%":{ opacity:"1" }, "50%":{ opacity:"0.6" } },
      },
    },
  },
  plugins: [],
};
export default config;
