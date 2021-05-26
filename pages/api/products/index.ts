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
      category,
      tag,
      // categoryIn,
      min,
      max,
    },
  } = req;

  try {
    const params = {
      first: !before ? Number(first) : undefined,
      last: before ? Number(first) || Number(last) : undefined,
      after,
      before,
      search,
      exclude,
      locale,
      category: category ? category : undefined,
      tag: tag ? tag : undefined,
      // categoryIn: categoryIn ? categoryIn : category ? category : null,
      maxPrice: isNaN(Number(max))
        ? undefined
        : parseFloat(Number(max).toFixed(2)),
      minPrice: isNaN(Number(min))
        ? undefined
        : parseFloat(Number(min).toFixed(2)),
      order: !before && !after,
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
