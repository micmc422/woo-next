import { NextApiRequest, NextApiResponse } from "next";
import client, { clientEng } from "src/components/ApolloClient";
import GET_PRODUCTS_QUERY from "src/queries/get-products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  const {
    query: {
      first = 24,
      last,
      after,
      before,
      search,
      exclude,
      locale = "fr",
      category = "",
      categoryIn,
      min,
      max,
    },
  } = req;

  try {
    const params = {
      first: !last ? first : null,
      last,
      after,
      before,
      search,
      exclude,
      locale,
      category: category ? category : null,
      categoryIn: categoryIn ? categoryIn : null,
      maxPrice: isNaN(Number(max)) ? null : Number(max).toFixed(2),
      minPrice: isNaN(Number(min)) ? null : Number(min).toFixed(2),
    };
    const apolloCli = locale === "fr" ? client : clientEng;
    const { data } = await apolloCli.query({
      query: GET_PRODUCTS_QUERY,
      variables: params,
    });

    // res.status(200).json({ params });
    res.status(200).json({ ...data });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
  /*
   */
}
