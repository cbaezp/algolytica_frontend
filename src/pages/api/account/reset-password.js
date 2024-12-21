import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { user_id, timestamp, signature, password } = req.body;

    const body = JSON.stringify({
      user_id: user_id,
      timestamp: timestamp,
      signature: signature,
      password: password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/account/reset-password/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({ message: "Password reset successful" });
      } else {
        return res.status(400).json({ message: data.message });
      }
    } catch (err) {
      return res.status(500).json({
        error: "something went wrong when trying to reset your password",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
