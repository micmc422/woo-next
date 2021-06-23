export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_label: label,
    event_category: category,
    value: value,
  });
};
/* items format data
 "items": [
    {
      "id": "P12345",
      "name": "Android Warhol T-Shirt",
      "list_name": "Search Results",
      "brand": "Google",
      "category": "Apparel/T-Shirts",
      "variant": "Black",
      "list_position": 1,
      "quantity": 2,
      "price": '2.0'
    }
  ]
  */
export const productView = (item) => {
  window.gtag("event", "view_item", {
    event_label: item.name,
    event_category: "view_item",
    value: [item],
  });
};
export const gaAddToCart = (item) => {
  window.gtag("event", "add_to_cart", {
    event_label: item.name,
    event_category: "add_to_cart",
    value: [item],
  });
};
