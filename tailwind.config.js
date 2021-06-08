module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  /*
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  */
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["Cardo", "serif"],
      sans: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      animation: {
        "ltr-linear-infinite": "ltr-linear-infinite 7s linear infinite",
        "rtl-linear-infinite": "rtl-linear-infinite 7s linear infinite",
      },
      keyframes: {
        "ltr-linear-infinite": {
          from: { "background-position": "0 0" },
          to: { "background-position": "80px 80px" },
        },
        "rtl-linear-infinite": {
          from: { "background-position": "0 0" },
          to: { "background-position": "-80px -80px" },
        },
      },
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
