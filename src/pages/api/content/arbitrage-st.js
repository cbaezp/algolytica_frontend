import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access == false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/content_api/standard-arbitrage/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "unable to get arbitrage" });
      }
    } catch (err) {
      return res.status(500).json({ error: "unable to get arbitrage" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
