import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username } = req.body;

    const body = JSON.stringify({
      email: username,
    });

    try {
      const apiRes = await fetch(
        `${API_URL}/dj-rest-auth/password/reset/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({ success: "Reset link sent" });
      } else {
        return res.status(apiRes.status).json({ error: data });
      }
    } catch (err) {
      return res.status(500).json({
        error: "something went wrong when sending the reset link",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
