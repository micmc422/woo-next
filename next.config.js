const { i18n } = require("./next-i18next.config");
const path = require("path");
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  /*
  future: {
    webpack5: false,
  },
   */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["photo.paris", "via.placeholder.com"],
  },
  i18n,
  redirects: [
    {
      source: "https://photo.paris/commande/order-received/*",
      destination: "/commande/order-received*",
      permanent: true,

    }
  ],
  rewrites: [
    {
      source: "/category/:category*",
      destination: "/categorie/:category*",
      permanent: true,
    },
    {
      source: "/en/:gallery*",
      destination: "/en/:galerie-photo*",
      permanent: true,
    },
  ],
});
