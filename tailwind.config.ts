import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontSize: "18px",
            lineHeight: "1.7", // adjust if needed for readability
            maxWidth: "none", // 🚀 remove the 65ch cap
            "h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child": {
              marginTop: "0 !important",
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
export default config;
