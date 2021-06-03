// fonction destiné à retourner un tableau des données du menu
// corectif du bug wp-graphql

// auto retry on error
const fetch = require("@vercel/fetch-retry")(require("node-fetch"));

export default async function getMenu(locale = "fr") {
  // let megaMenuFallBackData = locale === "fr" ? megamenu : megamenuEn;
  // let menuFallBackData = locale === "fr" ? menu : menuEn;
  const data = await fetch(
    locale === "fr"
      ? `https://photo.paris/wp-json/wp/v2/menu`
      : `https://photo.paris/wp-json/wp/v2/menu?lang=en`
  );
  const megamenuList = await fetch(
    locale === "fr"
      ? `https://photo.paris/wp-json/wp/v2/megamenu`
      : `https://photo.paris/wp-json/wp/v2/megamenu?lang=en`
  );
  let collection = await megamenuList.json();

  let parsed = await data.json();

  const base = [];
  parsed.map((item) => {
    !item.title.includes("wpml-ls-flag") &&
      base.push({
        title: item.title,
        url: item.url,
      });
  });
  return {
    base,
    collection:
      collection.filter((item) => item.slug === "collection")[0].content
        .rendered || [],
  };
}
