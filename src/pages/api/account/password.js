import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const body = JSON.stringify({
      new_password1: `${req.body.new}`,
      new_password2: `${req.body.cofirmation}`,
    });

    try {
      const apiRes = await fetch(`${API_URL}/dj-rest-auth/password/change/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });
      const data = await apiRes.json();
      if (apiRes.status === 200) {
        return res.status(200).json(data);
      } else {
        return res.status(apiRes.status).json({ error: data });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to change password",
      });
    }
  }
};
