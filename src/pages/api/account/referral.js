/* eslint-disable import/no-anonymous-default-export */
import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const { code } = req.body;
    const body = JSON.stringify({
      tracking_code: code,
    });
    try {
      const apiRes = await fetch(`${API_URL}/content_api/referral-tracking/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });
      const data = await apiRes.json();
      if (apiRes.status === 201) {
        return res.status(201).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "Unable to post referral code" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to post referral code",
      });
    }
  }
};
