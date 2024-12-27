import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { signature } = req.body;

    const body = JSON.stringify({
      key: signature,
    });

    try {
      const apiRes = await fetch(`${API_URL}/dj-rest-auth/registration/verify-email/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();
    } catch (err) {
      return res.status(500).json({
        error: "something went wrong when registering for an account",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
