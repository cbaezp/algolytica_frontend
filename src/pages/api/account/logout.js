import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0), //match value in JWT django settings
        sameSite: "strict",
        path: "/api/",
      }),
      cookie.serialize("refresh", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/api/",
      }),
    ]);
    return res.status(200).json({
      success: "Successfully loged out",
    });
  } else {
    res.setHeader("Allow", "[POST]");
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
