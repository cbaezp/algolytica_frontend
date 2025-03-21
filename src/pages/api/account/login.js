import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const body = JSON.stringify({
      username: username,
      password: password,
    });
    try {
      const apiRes = await fetch(`${API_URL}/api/token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        //serialize cookie and place it to the cookie header
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", //http only; change to true for production to require https
            maxAge: 15 * 60, // 15 minutes in seconds
            sameSite: "strict",
            path: "/api/",
          }),
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", //http only; change to true for production to require https
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
            sameSite: "strict",
            path: "/api/",
          }),
        ]);
        return res.status(200).json({ success: "Logged in successfully" });
      } else {
        return res.status(apiRes.status).json({
          error: "Authentication failed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when authenticating",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
