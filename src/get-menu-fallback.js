// fonction destiné à retourner un tableau des données du menu
// corectif du bug wp-graphql

export default async function getMenu(locale = "fr") {
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
  const collection = await megamenuList.json();
  const parsed = await data.json();
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
