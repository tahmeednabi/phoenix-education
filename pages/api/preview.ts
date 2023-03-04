import * as prismicNext from "@prismicio/next";

import { createClient } from "../../prismicio";
import { NextApiRequest, NextApiResponse } from "next";
import { linkResolver } from "@common/utils/link-resolver";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createClient({ req });

  prismicNext.setPreviewData({ req, res });

  await prismicNext.redirectToPreviewURL({
    req,
    res,
    client,
    linkResolver,
  });
}
