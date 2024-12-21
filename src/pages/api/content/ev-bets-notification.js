/* eslint-disable import/no-anonymous-default-export */
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
      const apiRes = await fetch(
        `${API_URL}/content_api/positive-ev-bet-notification-status`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "unable to get bet notification status" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: "unable to get bet notification status" });
    }
  }

  if (req.method === "PATCH") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const updateBody = JSON.stringify(req.body);

    try {
      const apiRes = await fetch(
        `${API_URL}/content_api/positive-ev-bet-notification-status/`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: updateBody,
        }
      );
      const data = await apiRes.json();
      if (data == {}) {
        return res.status(200).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "unable to patch bet status" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to create or access bet notification status",
      });
    }
  }
};
