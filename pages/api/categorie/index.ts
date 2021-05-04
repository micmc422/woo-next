import { NextApiRequest, NextApiResponse } from "next";
import client, { clientEng } from "src/components/ApolloClient";
import { GET_CATEGORIES_BASE } from "src/queries/get-categories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  const {
    query: { parent, locale = "fr" },
  } = req;

  try {
    const params = {
      parent,
      locale,
    };
    const apolloCli = locale === "fr" ? client : clientEng;
    const { data } = await apolloCli.query({
      query: GET_CATEGORIES_BASE,
      variables: params
    });

    res.status(200).json({ ...data });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
  /*
   */
}
