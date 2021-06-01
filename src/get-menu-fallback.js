// fonction destiné à retourner un tableau des données du menu
// corectif du bug wp-graphql

export default async function getMenu(locale = "fr") {
  let megaMenuFallBackData = locale === "fr" ? megamenu : megamenuEn;
  let menuFallBackData = locale === "fr" ? menu : menuEn;
  const data = await fetch(
    locale === "fr"
      ? `https://photo.paris/wp-json/wp/v2/menu`
      : `https://photo.paris/wp-json/wp/v2/menu?lang=en`
  ).catch((e) => {
    return menu;
  });
  const megamenuList = await fetch(
    locale === "fr"
      ? `https://photo.paris/wp-json/wp/v2/megamenu`
      : `https://photo.paris/wp-json/wp/v2/megamenu?lang=en`
  ).catch((e) => {
    return menuFallBackData;
  });
  let collection = await megamenuList.json();
  if (collection?.code === "rest_no_route") {
    collection = megaMenuFallBackData;
  }
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

const megamenu = [
  {
    id: 7889,
    date: "2018-11-11T01:48:19",
    date_gmt: "2018-11-11T00:48:19",
    guid: {
      rendered: "https://photo.paris/?megamenu=gallery",
    },
    modified: "2018-11-11T19:38:06",
    modified_gmt: "2018-11-11T18:38:06",
    slug: "gallery",
    status: "publish",
    type: "megamenu",
    link: "https://photo.paris/?megamenu=gallery&lang=en",
    title: {
      rendered: "Gallery",
    },
    content: {
      rendered:
        '<div class="vc_row wpb_row vc_row-fluid"><div class="wpb_column vc_column_container vc_col-sm-10 responsive_js_composer_custom_css_875457336"><div class="vc_column-inner"><div class="wpb_wrapper"><div class="vc_row wpb_row vc_inner vc_row-fluid vc_custom_1541955174782 responsive_js_composer_custom_css_64954951"><div class="wpb_column vc_column_container vc_col-sm-4"><div class="vc_column-inner"><div class="wpb_wrapper">            <div class="ciloe-custommenu style4  ciloe_custom_css_1963034225  responsive_js_composer_custom_css_1163384750">\n\t\t\t\t\t\t\t\t\t\t\t\t\t                        <h2 class="widgettitle">Style</h2>\n\t\t\t\t\t\t\t\t\t\t<ul id="menu-shop-primaire-en" class="menu"><li id="menu-item-7701" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7701"><a title="Contemporary photographs" href="https://photo.paris/categorie/contemporary-photographs/?lang=en">Contemporary photographs</a></li>\n<li id="menu-item-7704" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7704"><a title="Original old photographs" href="https://photo.paris/categorie/original-old-photographs/?lang=en">Original old photographs</a></li>\n<li id="menu-item-7703" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7703"><a title="Colour photo" href="https://photo.paris/categorie/contemporary-photographs/colour-photo-paris/?lang=en">Colour photo</a></li>\n<li id="menu-item-7702" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7702"><a title="Black and white photographs" href="https://photo.paris/categorie/contemporary-photographs/black-white-photo/?lang=en">Black and white photographs</a></li>\n</ul>\t\t\t\t\t\t\t\t            </div>\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="vc_column-inner"><div class="wpb_wrapper">            <div class="ciloe-custommenu style4   ">\n\t\t\t\t\t\t\t\t\t\t\t\t\t                        <h2 class="widgettitle">Topic</h2>\n\t\t\t\t\t\t\t\t\t\t<ul id="menu-shop-themes-en" class="menu"><li id="menu-item-7938" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7938"><a title="Celebrities" href="https://photo.paris/categorie/original-old-photographs/celebrities/?lang=en">Celebrities</a></li>\n<li id="menu-item-7942" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7942"><a title="Landscapes" href="https://photo.paris/categorie/contemporary-photographs/landscapes/?lang=en">Landscapes</a></li>\n<li id="menu-item-7940" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7940"><a title="Street and daily life" href="https://photo.paris/categorie/contemporary-photographs/street-photo-and-daily-life-paris/?lang=en">Street and daily life</a></li>\n<li id="menu-item-8064" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-8064"><a title="Landscapes" href="https://photo.paris/categorie/contemporary-photographs/landscapes/?lang=en">Landscapes</a></li>\n<li id="menu-item-7943" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7943"><a title="Paris roofs" href="https://photo.paris/categorie/contemporary-photographs/paris-roofs/?lang=en">Paris roofs</a></li>\n<li id="menu-item-11589" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-11589"><a title="Travel photographs" href="https://photo.paris/categorie/contemporary-photographs/travel-photographs/?lang=en">Travel photographs</a></li>\n<li id="menu-item-7941" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7941"><a title="Famous Paris monuments" href="https://photo.paris/categorie/contemporary-photographs/famous-paris-monuments/?lang=en">Famous Paris monuments</a></li>\n<li id="menu-item-8063" class="menu-item menu-item-type-taxonomy menu-item-object-product_tag menu-item-8063"><a title="Paris roofs" href="https://photo.paris/etiquette/paris-roofs/?lang=en">Paris roofs</a></li>\n</ul>\t\t\t\t\t\t\t\t            </div>\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="vc_column-inner"><div class="wpb_wrapper">            <div class="ciloe-custommenu style4   ">\n\t\t\t\t\t\t\t\t\t\t\t\t\t                        <h2 class="widgettitle">Artists</h2>\n\t\t\t\t\t\t\t\t\t\t<ul id="menu-shop-artistes-en" class="menu"><li id="menu-item-7706" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7706"><a title="Adrien Le Falher" href="https://photo.paris/categorie/artists/adrien-le-falher-en/?lang=en">Adrien Le Falher</a></li>\n<li id="menu-item-7707" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7707"><a title="Corinne Wargnier" href="https://photo.paris/categorie/artists/corinne-wargnier-en/?lang=en">Corinne Wargnier</a></li>\n<li id="menu-item-7708" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7708"><a title="Fikry Botros" href="https://photo.paris/categorie/artists/fikry-botros-en/?lang=en">Fikry Botros</a></li>\n<li id="menu-item-7711" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7711"><a title="Kioro" href="https://photo.paris/categorie/artists/kioro-photographer-paris/?lang=en">Kioro</a></li>\n<li id="menu-item-15312" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-15312"><a title="Jean-Mathieu Saponaro" href="https://photo.paris/categorie/artists/jean-mathieu-saponaro-eng/?lang=en">Jean-Mathieu Saponaro</a></li>\n<li id="menu-item-7712" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7712"><a title="Luc Mercelis" href="https://photo.paris/categorie/artists/luc-mercelis-phographer-paris/?lang=en">Luc Mercelis</a></li>\n<li id="menu-item-7709" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7709"><a title="Manu Wino" href="https://photo.paris/categorie/artists/manu-wino-en/?lang=en">Manu Wino</a></li>\n<li id="menu-item-7710" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7710"><a title="Xavier Mathieu" href="https://photo.paris/categorie/artists/xavier-mathieu-en/?lang=en">Xavier Mathieu</a></li>\n</ul>\t\t\t\t\t\t\t\t            </div>\n\t\t\t</div></div></div></div></div></div></div></div>\n',
      protected: false,
    },
    template: "",
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v16.2 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery - Paris est une Photo</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://photo.paris/?megamenu=gallery&#038;lang=en" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery - Paris est une Photo" />\n<meta property="og:url" content="https://photo.paris/?megamenu=gallery&amp;lang=en" />\n<meta property="og:site_name" content="Paris est une Photo" />\n<meta property="article:publisher" content="https://fr-fr.facebook.com/galerieparisestunephoto/" />\n<meta property="article:modified_time" content="2018-11-11T18:38:06+00:00" />\n<meta name="twitter:card" content="summary" />\n<meta name="twitter:label1" content="Est. reading time">\n\t<meta name="twitter:data1" content="1 minute">\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://photo.paris/#organization","name":"Paris est une photo","url":"https://photo.paris/","sameAs":["https://fr-fr.facebook.com/galerieparisestunephoto/","https://www.instagram.com/parisestunephoto/"],"logo":{"@type":"ImageObject","@id":"https://photo.paris/#logo","inLanguage":"en-US","url":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","contentUrl":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","width":800,"height":684,"caption":"Paris est une photo"},"image":{"@id":"https://photo.paris/#logo"}},{"@type":"WebSite","@id":"https://photo.paris/#website","url":"https://photo.paris/","name":"Paris est une Photo","description":"","publisher":{"@id":"https://photo.paris/#organization"},"potentialAction":[{"@type":"SearchAction","target":"https://photo.paris/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://photo.paris/?megamenu=gallery&lang=en#webpage","url":"https://photo.paris/?megamenu=gallery&lang=en","name":"Gallery - Paris est une Photo","isPartOf":{"@id":"https://photo.paris/#website"},"datePublished":"2018-11-11T00:48:19+00:00","dateModified":"2018-11-11T18:38:06+00:00","breadcrumb":{"@id":"https://photo.paris/?megamenu=gallery&lang=en#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://photo.paris/?megamenu=gallery&lang=en"]}]},{"@type":"BreadcrumbList","@id":"https://photo.paris/?megamenu=gallery&lang=en#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"WebPage","@id":"https://photo.paris/?lang=en","url":"https://photo.paris/?lang=en","name":"Accueil"}},{"@type":"ListItem","position":2,"item":{"@id":"https://photo.paris/?megamenu=gallery&lang=en#webpage"}}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu/7889",
        },
      ],
      collection: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu",
        },
      ],
      about: [
        {
          href: "https://photo.paris/wp-json/wp/v2/types/megamenu",
        },
      ],
      "wp:attachment": [
        {
          href: "https://photo.paris/wp-json/wp/v2/media?parent=7889",
        },
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true,
        },
      ],
    },
  },
  {
    id: 7890,
    date: "2018-11-11T01:36:23",
    date_gmt: "2018-11-11T00:36:23",
    guid: {
      rendered: "https://photo.paris/?megamenu=collection",
    },
    modified: "2020-11-19T21:00:03",
    modified_gmt: "2020-11-19T20:00:03",
    slug: "collection",
    status: "publish",
    type: "megamenu",
    link: "https://photo.paris/?megamenu=collection&lang=en",
    title: {
      rendered: "Collection",
    },
    content: {
      rendered:
        '<div class="vc_row wpb_row vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-11 responsive_js_composer_custom_css_1592379688"><div class="vc_column-inner vc_custom_1568649691207"><div class="wpb_wrapper"><div class="vc_row wpb_row vc_inner vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-3 responsive_js_composer_custom_css_45487958"><div class="vc_column-inner"><div class="wpb_wrapper">\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_2122056639   responsive_js_composer_custom_css_84658156">\n                    <a href="https://photo.paris/categorie/contemporary-photographs/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2020/07/palette-clair-kioro-scaled-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/contemporary-photographs/?lang=en">Contemporary</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_383873388   responsive_js_composer_custom_css_1503989298">\n                    <a href="https://photo.paris/categorie/original-old-photographs/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/Dennis-Stock-compresse-scaled-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/original-old-photographs/?lang=en">Antique photographs</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-3 responsive_js_composer_custom_css_197623732"><div class="vc_column-inner"><div class="wpb_wrapper">\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_1131392894   responsive_js_composer_custom_css_1852891444">\n                    <a href="https://photo.paris/categorie/our-favorites/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/Journée-plage-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/our-favorites/?lang=en">Our favorites</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_792059163   responsive_js_composer_custom_css_1610337536">\n                    <a href="https://photo.paris/categorie/contemporary-photographs/bestsellers/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/In-good-hands-CP-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/contemporary-photographs/bestsellers/?lang=en">Bestsellers</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-3 responsive_js_composer_custom_css_823463613"><div class="vc_column-inner"><div class="wpb_wrapper">\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_837857923   responsive_js_composer_custom_css_2121645148">\n                    <a href="https://photo.paris/categorie/frames/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/cadre-standard-alpha-nielsen-scaled-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/frames/?lang=en">Frames</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_174695283   responsive_js_composer_custom_css_2040465922">\n                    <a href="https://photo.paris/categorie/art-prints-eng/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/BATACLAN-e1569310527535-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/art-prints-eng/?lang=en">Lithographs</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-2 vc_hidden-sm vc_hidden-xs responsive_js_composer_custom_css_675413085"><div class="vc_column-inner"><div class="wpb_wrapper"><div class="ciloe-title-short-desc block-content text-left style1  f6419e87-5be7894f2d88e   responsive_js_composer_custom_css_253655170"><div class="has-line"> <h3 class="block-title" style="color: #000000;">Our collection</h3></div> <div class="block-short_desc" style="color: #0a0a0a;"><p>Find our entire collection, current exhibitions and our old photos</p>\n</div><a style="color: #000000;" class="block-link" href="https://photo.paris/gallery/?lang=en" target="_self">Shop</a></div></div></div></div></div></div></div></div></div>\n',
      protected: false,
    },
    template: "",
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v16.2 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Collection - Paris est une Photo</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://photo.paris/?megamenu=collection&#038;lang=en" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Collection - Paris est une Photo" />\n<meta property="og:url" content="https://photo.paris/?megamenu=collection&amp;lang=en" />\n<meta property="og:site_name" content="Paris est une Photo" />\n<meta property="article:publisher" content="https://fr-fr.facebook.com/galerieparisestunephoto/" />\n<meta property="article:modified_time" content="2020-11-19T20:00:03+00:00" />\n<meta name="twitter:card" content="summary" />\n<meta name="twitter:label1" content="Est. reading time">\n\t<meta name="twitter:data1" content="2 minutes">\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://photo.paris/#organization","name":"Paris est une photo","url":"https://photo.paris/","sameAs":["https://fr-fr.facebook.com/galerieparisestunephoto/","https://www.instagram.com/parisestunephoto/"],"logo":{"@type":"ImageObject","@id":"https://photo.paris/#logo","inLanguage":"en-US","url":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","contentUrl":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","width":800,"height":684,"caption":"Paris est une photo"},"image":{"@id":"https://photo.paris/#logo"}},{"@type":"WebSite","@id":"https://photo.paris/#website","url":"https://photo.paris/","name":"Paris est une Photo","description":"","publisher":{"@id":"https://photo.paris/#organization"},"potentialAction":[{"@type":"SearchAction","target":"https://photo.paris/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://photo.paris/?megamenu=collection&lang=en#webpage","url":"https://photo.paris/?megamenu=collection&lang=en","name":"Collection - Paris est une Photo","isPartOf":{"@id":"https://photo.paris/#website"},"datePublished":"2018-11-11T00:36:23+00:00","dateModified":"2020-11-19T20:00:03+00:00","breadcrumb":{"@id":"https://photo.paris/?megamenu=collection&lang=en#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://photo.paris/?megamenu=collection&lang=en"]}]},{"@type":"BreadcrumbList","@id":"https://photo.paris/?megamenu=collection&lang=en#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"WebPage","@id":"https://photo.paris/?lang=en","url":"https://photo.paris/?lang=en","name":"Accueil"}},{"@type":"ListItem","position":2,"item":{"@id":"https://photo.paris/?megamenu=collection&lang=en#webpage"}}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu/7890",
        },
      ],
      collection: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu",
        },
      ],
      about: [
        {
          href: "https://photo.paris/wp-json/wp/v2/types/megamenu",
        },
      ],
      "wp:attachment": [
        {
          href: "https://photo.paris/wp-json/wp/v2/media?parent=7890",
        },
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true,
        },
      ],
    },
  },
];
const megamenuEn = [
  {
    id: 7889,
    date: "2018-11-11T01:48:19",
    date_gmt: "2018-11-11T00:48:19",
    guid: {
      rendered: "https://photo.paris/?megamenu=gallery",
    },
    modified: "2018-11-11T19:38:06",
    modified_gmt: "2018-11-11T18:38:06",
    slug: "gallery",
    status: "publish",
    type: "megamenu",
    link: "https://photo.paris/?megamenu=gallery&lang=en",
    title: {
      rendered: "Gallery",
    },
    content: {
      rendered:
        '<div class="vc_row wpb_row vc_row-fluid"><div class="wpb_column vc_column_container vc_col-sm-10 responsive_js_composer_custom_css_875457336"><div class="vc_column-inner"><div class="wpb_wrapper"><div class="vc_row wpb_row vc_inner vc_row-fluid vc_custom_1541955174782 responsive_js_composer_custom_css_64954951"><div class="wpb_column vc_column_container vc_col-sm-4"><div class="vc_column-inner"><div class="wpb_wrapper">            <div class="ciloe-custommenu style4  ciloe_custom_css_1963034225  responsive_js_composer_custom_css_1163384750">\n\t\t\t\t\t\t\t\t\t\t\t\t\t                        <h2 class="widgettitle">Style</h2>\n\t\t\t\t\t\t\t\t\t\t<ul id="menu-shop-primaire-en" class="menu"><li id="menu-item-7701" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7701"><a title="Contemporary photographs" href="https://photo.paris/categorie/contemporary-photographs/?lang=en">Contemporary photographs</a></li>\n<li id="menu-item-7704" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7704"><a title="Original old photographs" href="https://photo.paris/categorie/original-old-photographs/?lang=en">Original old photographs</a></li>\n<li id="menu-item-7703" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7703"><a title="Colour photo" href="https://photo.paris/categorie/contemporary-photographs/colour-photo-paris/?lang=en">Colour photo</a></li>\n<li id="menu-item-7702" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7702"><a title="Black and white photographs" href="https://photo.paris/categorie/contemporary-photographs/black-white-photo/?lang=en">Black and white photographs</a></li>\n</ul>\t\t\t\t\t\t\t\t            </div>\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="vc_column-inner"><div class="wpb_wrapper">            <div class="ciloe-custommenu style4   ">\n\t\t\t\t\t\t\t\t\t\t\t\t\t                        <h2 class="widgettitle">Topic</h2>\n\t\t\t\t\t\t\t\t\t\t<ul id="menu-shop-themes-en" class="menu"><li id="menu-item-7938" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7938"><a title="Celebrities" href="https://photo.paris/categorie/original-old-photographs/celebrities/?lang=en">Celebrities</a></li>\n<li id="menu-item-7942" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7942"><a title="Landscapes" href="https://photo.paris/categorie/contemporary-photographs/landscapes/?lang=en">Landscapes</a></li>\n<li id="menu-item-7940" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7940"><a title="Street and daily life" href="https://photo.paris/categorie/contemporary-photographs/street-photo-and-daily-life-paris/?lang=en">Street and daily life</a></li>\n<li id="menu-item-8064" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-8064"><a title="Landscapes" href="https://photo.paris/categorie/contemporary-photographs/landscapes/?lang=en">Landscapes</a></li>\n<li id="menu-item-7943" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7943"><a title="Paris roofs" href="https://photo.paris/categorie/contemporary-photographs/paris-roofs/?lang=en">Paris roofs</a></li>\n<li id="menu-item-11589" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-11589"><a title="Travel photographs" href="https://photo.paris/categorie/contemporary-photographs/travel-photographs/?lang=en">Travel photographs</a></li>\n<li id="menu-item-7941" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7941"><a title="Famous Paris monuments" href="https://photo.paris/categorie/contemporary-photographs/famous-paris-monuments/?lang=en">Famous Paris monuments</a></li>\n<li id="menu-item-8063" class="menu-item menu-item-type-taxonomy menu-item-object-product_tag menu-item-8063"><a title="Paris roofs" href="https://photo.paris/etiquette/paris-roofs/?lang=en">Paris roofs</a></li>\n</ul>\t\t\t\t\t\t\t\t            </div>\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-4"><div class="vc_column-inner"><div class="wpb_wrapper">            <div class="ciloe-custommenu style4   ">\n\t\t\t\t\t\t\t\t\t\t\t\t\t                        <h2 class="widgettitle">Artists</h2>\n\t\t\t\t\t\t\t\t\t\t<ul id="menu-shop-artistes-en" class="menu"><li id="menu-item-7706" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7706"><a title="Adrien Le Falher" href="https://photo.paris/categorie/artists/adrien-le-falher-en/?lang=en">Adrien Le Falher</a></li>\n<li id="menu-item-7707" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7707"><a title="Corinne Wargnier" href="https://photo.paris/categorie/artists/corinne-wargnier-en/?lang=en">Corinne Wargnier</a></li>\n<li id="menu-item-7708" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7708"><a title="Fikry Botros" href="https://photo.paris/categorie/artists/fikry-botros-en/?lang=en">Fikry Botros</a></li>\n<li id="menu-item-7711" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7711"><a title="Kioro" href="https://photo.paris/categorie/artists/kioro-photographer-paris/?lang=en">Kioro</a></li>\n<li id="menu-item-15312" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-15312"><a title="Jean-Mathieu Saponaro" href="https://photo.paris/categorie/artists/jean-mathieu-saponaro-eng/?lang=en">Jean-Mathieu Saponaro</a></li>\n<li id="menu-item-7712" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7712"><a title="Luc Mercelis" href="https://photo.paris/categorie/artists/luc-mercelis-phographer-paris/?lang=en">Luc Mercelis</a></li>\n<li id="menu-item-7709" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7709"><a title="Manu Wino" href="https://photo.paris/categorie/artists/manu-wino-en/?lang=en">Manu Wino</a></li>\n<li id="menu-item-7710" class="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7710"><a title="Xavier Mathieu" href="https://photo.paris/categorie/artists/xavier-mathieu-en/?lang=en">Xavier Mathieu</a></li>\n</ul>\t\t\t\t\t\t\t\t            </div>\n\t\t\t</div></div></div></div></div></div></div></div>\n',
      protected: false,
    },
    template: "",
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v16.2 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery - Paris est une Photo</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://photo.paris/?megamenu=gallery&#038;lang=en" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery - Paris est une Photo" />\n<meta property="og:url" content="https://photo.paris/?megamenu=gallery&amp;lang=en" />\n<meta property="og:site_name" content="Paris est une Photo" />\n<meta property="article:publisher" content="https://fr-fr.facebook.com/galerieparisestunephoto/" />\n<meta property="article:modified_time" content="2018-11-11T18:38:06+00:00" />\n<meta name="twitter:card" content="summary" />\n<meta name="twitter:label1" content="Est. reading time">\n\t<meta name="twitter:data1" content="1 minute">\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://photo.paris/#organization","name":"Paris est une photo","url":"https://photo.paris/","sameAs":["https://fr-fr.facebook.com/galerieparisestunephoto/","https://www.instagram.com/parisestunephoto/"],"logo":{"@type":"ImageObject","@id":"https://photo.paris/#logo","inLanguage":"en-US","url":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","contentUrl":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","width":800,"height":684,"caption":"Paris est une photo"},"image":{"@id":"https://photo.paris/#logo"}},{"@type":"WebSite","@id":"https://photo.paris/#website","url":"https://photo.paris/","name":"Paris est une Photo","description":"","publisher":{"@id":"https://photo.paris/#organization"},"potentialAction":[{"@type":"SearchAction","target":"https://photo.paris/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://photo.paris/?megamenu=gallery&lang=en#webpage","url":"https://photo.paris/?megamenu=gallery&lang=en","name":"Gallery - Paris est une Photo","isPartOf":{"@id":"https://photo.paris/#website"},"datePublished":"2018-11-11T00:48:19+00:00","dateModified":"2018-11-11T18:38:06+00:00","breadcrumb":{"@id":"https://photo.paris/?megamenu=gallery&lang=en#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://photo.paris/?megamenu=gallery&lang=en"]}]},{"@type":"BreadcrumbList","@id":"https://photo.paris/?megamenu=gallery&lang=en#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"WebPage","@id":"https://photo.paris/?lang=en","url":"https://photo.paris/?lang=en","name":"Accueil"}},{"@type":"ListItem","position":2,"item":{"@id":"https://photo.paris/?megamenu=gallery&lang=en#webpage"}}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu/7889",
        },
      ],
      collection: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu",
        },
      ],
      about: [
        {
          href: "https://photo.paris/wp-json/wp/v2/types/megamenu",
        },
      ],
      "wp:attachment": [
        {
          href: "https://photo.paris/wp-json/wp/v2/media?parent=7889",
        },
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true,
        },
      ],
    },
  },
  {
    id: 7890,
    date: "2018-11-11T01:36:23",
    date_gmt: "2018-11-11T00:36:23",
    guid: {
      rendered: "https://photo.paris/?megamenu=collection",
    },
    modified: "2020-11-19T21:00:03",
    modified_gmt: "2020-11-19T20:00:03",
    slug: "collection",
    status: "publish",
    type: "megamenu",
    link: "https://photo.paris/?megamenu=collection&lang=en",
    title: {
      rendered: "Collection",
    },
    content: {
      rendered:
        '<div class="vc_row wpb_row vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-11 responsive_js_composer_custom_css_1592379688"><div class="vc_column-inner vc_custom_1568649691207"><div class="wpb_wrapper"><div class="vc_row wpb_row vc_inner vc_row-fluid vc_row-o-content-middle vc_row-flex"><div class="wpb_column vc_column_container vc_col-sm-3 responsive_js_composer_custom_css_45487958"><div class="vc_column-inner"><div class="wpb_wrapper">\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_2122056639   responsive_js_composer_custom_css_84658156">\n                    <a href="https://photo.paris/categorie/contemporary-photographs/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2020/07/palette-clair-kioro-scaled-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/contemporary-photographs/?lang=en">Contemporary</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_383873388   responsive_js_composer_custom_css_1503989298">\n                    <a href="https://photo.paris/categorie/original-old-photographs/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/Dennis-Stock-compresse-scaled-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/original-old-photographs/?lang=en">Antique photographs</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-3 responsive_js_composer_custom_css_197623732"><div class="vc_column-inner"><div class="wpb_wrapper">\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_1131392894   responsive_js_composer_custom_css_1852891444">\n                    <a href="https://photo.paris/categorie/our-favorites/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/Journée-plage-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/our-favorites/?lang=en">Our favorites</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_792059163   responsive_js_composer_custom_css_1610337536">\n                    <a href="https://photo.paris/categorie/contemporary-photographs/bestsellers/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/In-good-hands-CP-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/contemporary-photographs/bestsellers/?lang=en">Bestsellers</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-3 responsive_js_composer_custom_css_823463613"><div class="vc_column-inner"><div class="wpb_wrapper">\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_837857923   responsive_js_composer_custom_css_2121645148">\n                    <a href="https://photo.paris/categorie/frames/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/cadre-standard-alpha-nielsen-scaled-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/frames/?lang=en">Frames</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t\t\t\t                <div class="ciloe-banner ciloe-countdown style5  light text-left position-left ciloe_custom_css_174695283   responsive_js_composer_custom_css_2040465922">\n                    <a href="https://photo.paris/categorie/art-prints-eng/?lang=en" class="media_thumb">\n                    \t<figure>\n                    \t\t<img class="fami-img fami-lazy lazy " width="681" height="350" src="https://photo.paris/site/wp-content/themes/ciloe/assets/images/noimage/no_image_transparent-681x350.png" data-src="https://photo.paris/site/wp-content/uploads/2018/11/BATACLAN-e1569310527535-681x350.jpg" alt="" title="" />                    \t</figure>\t\t\n                    </a>\n\t\t\t\t\t                        <h3 class="banner-title"><a\n                                    href="https://photo.paris/categorie/art-prints-eng/?lang=en">Lithographs</a>\n                        </h3>\n\t\t\t\t\t\n                </div>\n            \t\t\t\n\t\t\t</div></div></div><div class="wpb_column vc_column_container vc_col-sm-2 vc_hidden-sm vc_hidden-xs responsive_js_composer_custom_css_675413085"><div class="vc_column-inner"><div class="wpb_wrapper"><div class="ciloe-title-short-desc block-content text-left style1  f6419e87-5be7894f2d88e   responsive_js_composer_custom_css_253655170"><div class="has-line"> <h3 class="block-title" style="color: #000000;">Our collection</h3></div> <div class="block-short_desc" style="color: #0a0a0a;"><p>Find our entire collection, current exhibitions and our old photos</p>\n</div><a style="color: #000000;" class="block-link" href="https://photo.paris/gallery/?lang=en" target="_self">Shop</a></div></div></div></div></div></div></div></div></div>\n',
      protected: false,
    },
    template: "",
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v16.2 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Collection - Paris est une Photo</title>\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="https://photo.paris/?megamenu=collection&#038;lang=en" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Collection - Paris est une Photo" />\n<meta property="og:url" content="https://photo.paris/?megamenu=collection&amp;lang=en" />\n<meta property="og:site_name" content="Paris est une Photo" />\n<meta property="article:publisher" content="https://fr-fr.facebook.com/galerieparisestunephoto/" />\n<meta property="article:modified_time" content="2020-11-19T20:00:03+00:00" />\n<meta name="twitter:card" content="summary" />\n<meta name="twitter:label1" content="Est. reading time">\n\t<meta name="twitter:data1" content="2 minutes">\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://photo.paris/#organization","name":"Paris est une photo","url":"https://photo.paris/","sameAs":["https://fr-fr.facebook.com/galerieparisestunephoto/","https://www.instagram.com/parisestunephoto/"],"logo":{"@type":"ImageObject","@id":"https://photo.paris/#logo","inLanguage":"en-US","url":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","contentUrl":"https://photo.paris/site/wp-content/uploads/2016/04/logo_black.png","width":800,"height":684,"caption":"Paris est une photo"},"image":{"@id":"https://photo.paris/#logo"}},{"@type":"WebSite","@id":"https://photo.paris/#website","url":"https://photo.paris/","name":"Paris est une Photo","description":"","publisher":{"@id":"https://photo.paris/#organization"},"potentialAction":[{"@type":"SearchAction","target":"https://photo.paris/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://photo.paris/?megamenu=collection&lang=en#webpage","url":"https://photo.paris/?megamenu=collection&lang=en","name":"Collection - Paris est une Photo","isPartOf":{"@id":"https://photo.paris/#website"},"datePublished":"2018-11-11T00:36:23+00:00","dateModified":"2020-11-19T20:00:03+00:00","breadcrumb":{"@id":"https://photo.paris/?megamenu=collection&lang=en#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://photo.paris/?megamenu=collection&lang=en"]}]},{"@type":"BreadcrumbList","@id":"https://photo.paris/?megamenu=collection&lang=en#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"WebPage","@id":"https://photo.paris/?lang=en","url":"https://photo.paris/?lang=en","name":"Accueil"}},{"@type":"ListItem","position":2,"item":{"@id":"https://photo.paris/?megamenu=collection&lang=en#webpage"}}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu/7890",
        },
      ],
      collection: [
        {
          href: "https://photo.paris/wp-json/wp/v2/megamenu",
        },
      ],
      about: [
        {
          href: "https://photo.paris/wp-json/wp/v2/types/megamenu",
        },
      ],
      "wp:attachment": [
        {
          href: "https://photo.paris/wp-json/wp/v2/media?parent=7890",
        },
      ],
      curies: [
        {
          name: "wp",
          href: "https://api.w.org/{rel}",
          templated: true,
        },
      ],
    },
  },
];

const menu = [
  {
    ID: 7668,
    post_author: "12",
    post_date: "2018-11-11 01:49:46",
    post_date_gmt: "2018-11-11 00:49:46",
    post_content: "",
    post_title: "NOTRE COLLECTION",
    post_excerpt: "E-SHOP",
    post_status: "publish",
    comment_status: "closed",
    ping_status: "closed",
    post_password: "",
    post_name: "7668",
    to_ping: "",
    pinged: "",
    post_modified: "2020-11-16 12:51:01",
    post_modified_gmt: "2020-11-16 11:51:01",
    post_content_filtered: "",
    post_parent: 0,
    guid: "https://photo.paris/?p=7668",
    menu_order: 1,
    post_type: "nav_menu_item",
    post_mime_type: "",
    comment_count: "0",
    filter: "raw",
    db_id: 7668,
    menu_item_parent: "0",
    object_id: "7666",
    object: "megamenu",
    type: "post_type",
    type_label: "Mega menu item",
    url: "https://photo.paris/?megamenu=collection",
    title: "NOTRE COLLECTION",
    target: "",
    attr_title: "E-SHOP",
    description: "",
    classes: [""],
    xfn: "",
    img_icon: "",
    do_shortcode: "",
    font_icon: "",
    item_icon_type: "none",
    mega_menu_width: "",
    mega_menu_url: "",
    img_icon_hover: "",
    img_note: "",
    enable_login_logout: "",
    enable_minicart: "",
    enable_currency_switcher: "",
    hiden_title: "",
  },
  {
    ID: 8626,
    post_author: "12",
    post_date: "2018-11-25 12:15:30",
    post_date_gmt: "2018-11-25 11:15:30",
    post_content: " ",
    post_title: "",
    post_excerpt: "",
    post_status: "publish",
    comment_status: "closed",
    ping_status: "closed",
    post_password: "",
    post_name: "encadrement-2",
    to_ping: "",
    pinged: "",
    post_modified: "2020-11-16 12:51:01",
    post_modified_gmt: "2020-11-16 11:51:01",
    post_content_filtered: "",
    post_parent: 0,
    guid: "https://photo.paris/?p=8626",
    menu_order: 2,
    post_type: "nav_menu_item",
    post_mime_type: "",
    comment_count: "0",
    filter: "raw",
    db_id: 8626,
    menu_item_parent: "0",
    object_id: "8597",
    object: "page",
    type: "post_type",
    type_label: "Page",
    url: "https://photo.paris/encadrement/",
    title: "ENCADREMENT",
    target: "",
    attr_title: "",
    description: "",
    classes: [""],
    xfn: "",
    img_icon: "",
    do_shortcode: "",
    font_icon: "",
    item_icon_type: "none",
    mega_menu_width: "",
    mega_menu_url: "",
    img_icon_hover: "",
    img_note: "",
    enable_login_logout: "",
    enable_minicart: "",
    enable_currency_switcher: "",
    hiden_title: "",
  },
  {
    ID: 8086,
    post_author: "12",
    post_date: "2018-11-16 11:10:24",
    post_date_gmt: "2018-11-16 10:10:24",
    post_content: "",
    post_title: "DECOUVRIR LA GALERIE",
    post_excerpt: "",
    post_status: "publish",
    comment_status: "closed",
    ping_status: "closed",
    post_password: "",
    post_name: "concept",
    to_ping: "",
    pinged: "",
    post_modified: "2020-11-16 12:51:01",
    post_modified_gmt: "2020-11-16 11:51:01",
    post_content_filtered: "",
    post_parent: 0,
    guid: "https://photo.paris/?p=8086",
    menu_order: 3,
    post_type: "nav_menu_item",
    post_mime_type: "",
    comment_count: "0",
    filter: "raw",
    db_id: 8086,
    menu_item_parent: "0",
    object_id: "19",
    object: "page",
    type: "post_type",
    type_label: "Page",
    url: "https://photo.paris/concept/",
    title: "DECOUVRIR LA GALERIE",
    target: "",
    attr_title: "",
    description: "",
    classes: [""],
    xfn: "",
    img_icon: "",
    do_shortcode: "",
    font_icon: "",
    item_icon_type: "none",
    mega_menu_width: "",
    mega_menu_url: "",
    img_icon_hover: "",
    img_note: "",
    enable_login_logout: "",
    enable_minicart: "",
    enable_currency_switcher: "",
    hiden_title: "",
  },
];

const menuEn = [
  {
    ID: 9079,
    post_author: "12",
    post_date: "2018-12-16 14:48:18",
    post_date_gmt: "2018-12-16 13:48:18",
    post_content: "",
    post_title: "OUR COLLECTION",
    post_excerpt: "OUR COLLECTION",
    post_status: "publish",
    comment_status: "closed",
    ping_status: "closed",
    post_password: "",
    post_name: "9079",
    to_ping: "",
    pinged: "",
    post_modified: "2020-11-16 12:51:54",
    post_modified_gmt: "2020-11-16 11:51:54",
    post_content_filtered: "",
    post_parent: 0,
    guid: "https://photo.paris/?p=9079",
    menu_order: 1,
    post_type: "nav_menu_item",
    post_mime_type: "",
    comment_count: "0",
    filter: "raw",
    db_id: 9079,
    menu_item_parent: "0",
    object_id: "7890",
    object: "megamenu",
    type: "post_type",
    type_label: "Mega menu item",
    url: "https://photo.paris/?megamenu=collection&lang=en",
    title: "OUR COLLECTION",
    target: "",
    attr_title: "OUR COLLECTION",
    description: "",
    classes: [""],
    xfn: "",
    img_icon: "",
    do_shortcode: "",
    font_icon: "",
    item_icon_type: "none",
    mega_menu_width: "",
    mega_menu_url: "",
    img_icon_hover: "",
    img_note: "",
    enable_login_logout: "",
    enable_minicart: "",
    enable_currency_switcher: "",
    hiden_title: "",
  },
  {
    ID: 8752,
    post_author: "12",
    post_date: "2018-11-26 18:00:31",
    post_date_gmt: "2018-11-26 17:00:31",
    post_content: " ",
    post_title: "",
    post_excerpt: "",
    post_status: "publish",
    comment_status: "closed",
    ping_status: "closed",
    post_password: "",
    post_name: "framing",
    to_ping: "",
    pinged: "",
    post_modified: "2020-11-16 12:51:54",
    post_modified_gmt: "2020-11-16 11:51:54",
    post_content_filtered: "",
    post_parent: 0,
    guid: "https://photo.paris/?p=8752",
    menu_order: 2,
    post_type: "nav_menu_item",
    post_mime_type: "",
    comment_count: "0",
    filter: "raw",
    db_id: 8752,
    menu_item_parent: "0",
    object_id: "8749",
    object: "page",
    type: "post_type",
    type_label: "Page",
    url: "https://photo.paris/framing/?lang=en",
    title: "FRAMING",
    target: "",
    attr_title: "",
    description: "",
    classes: [""],
    xfn: "",
    img_icon: "",
    do_shortcode: "",
    font_icon: "",
    item_icon_type: "none",
    mega_menu_width: "",
    mega_menu_url: "",
    img_icon_hover: "",
    img_note: "",
    enable_login_logout: "",
    enable_minicart: "",
    enable_currency_switcher: "",
    hiden_title: "",
  },
  {
    ID: 8089,
    post_author: "12",
    post_date: "2018-11-16 11:17:46",
    post_date_gmt: "2018-11-16 10:17:46",
    post_content: "",
    post_title: "DISCOVER THE GALLERY",
    post_excerpt: "",
    post_status: "publish",
    comment_status: "closed",
    ping_status: "closed",
    post_password: "",
    post_name: "8089",
    to_ping: "",
    pinged: "",
    post_modified: "2020-11-16 12:51:54",
    post_modified_gmt: "2020-11-16 11:51:54",
    post_content_filtered: "",
    post_parent: 0,
    guid: "https://photo.paris/8089/",
    menu_order: 3,
    post_type: "nav_menu_item",
    post_mime_type: "",
    comment_count: "0",
    filter: "raw",
    db_id: 8089,
    menu_item_parent: "0",
    object_id: "868",
    object: "page",
    type: "post_type",
    type_label: "Page",
    url: "https://photo.paris/concept/?lang=en",
    title: "DISCOVER THE GALLERY",
    target: "",
    attr_title: "",
    description: "",
    classes: [""],
    xfn: "",
    img_icon: "",
    do_shortcode: "",
    font_icon: "",
    item_icon_type: "none",
    mega_menu_width: "",
    mega_menu_url: "",
    img_icon_hover: "",
    img_note: "",
    enable_login_logout: "",
    enable_minicart: "",
    enable_currency_switcher: "",
    hiden_title: "",
  },
];
