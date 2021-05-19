const { i18n } = require("./next-i18next.config");
const path = require("path");
module.exports = {
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  /*
   */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["photo.paris", "via.placeholder.com"],
  },
  i18n,
  future: {
    webpack5: false,
  },
};
