module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: [
      "./src/components/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./pages/*.{js,ts,jsx,tsx}",
    ],
    option: {
      safelist: {
        standard: ["pb-4", "md:pb-8", "lg:pb-16", "md:relative"],
        greedy: ["/safe$/"],
      },
    },
  },
  theme: {
    fontFamily: {
      serif: ["Cardo", "serif"],
      sans: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      translate: {
        screen: "100vh",
      },
      colors: {
        brand: {
          50: "#fef7df",
          100: "#fceeba",
          200: "#fae695",
          300: "#f9dd70",
          400: "#f7d54b",
          500: "#f5cc26",
          600: "#c9a338",
          700: "#a28345",
          800: "#7f6c4d",
          900: "#635a4f",
        },
        facebook: "#3b5998",
        instagram: "#e1306c",
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["hover"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
