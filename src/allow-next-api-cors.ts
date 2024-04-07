import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";

const allowedHeaders = [
  "access-control-allow-credentials",
  "access-control-allow-origin",
  "authorization",
  "content-type",
];

export const allowNextApiCors =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*"); // research having this set to *
    res.setHeader("Access-Control-Allow-Methods", ["GET", "OPTIONS", "POST"]);
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    await handler(req, res);
  };
