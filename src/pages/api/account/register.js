import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password, password_confirm } = req.body;

    const body = JSON.stringify({
      username: username,
      email: email,
      password1: password,
      password2: password_confirm,
    });
    try {
      const apiRes = await fetch(`${API_URL}/dj-rest-auth/registration/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 201) {
        return res
          .status(201)
          .json({ success: "account successfully created" });
      } else {
        return res.status(apiRes.status).json({ error: data });
      }
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
