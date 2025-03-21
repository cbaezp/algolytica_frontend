import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh ?? false;

    if (refresh === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    const body = JSON.stringify({
      refresh,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 15 * 60, // 15 minutes in seconds
            sameSite: "strict",
            path: "/api/",
          }),
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
            sameSite: "strict",
            path: "/api/",
          }),
        ]);
        return res.status(200).json({ success: "Refresh request successful" });
      } else {
        return res.status(apiRes.status).json({
          error: "Failed to send request for refresh request",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Failed to send request for refresh request",
      });
    }
  } else {
    res.header("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
