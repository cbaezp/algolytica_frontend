import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
    if (req.method === "POST") {
        const { code } = req.body;

        try {
            // Send the GitHub auth code to your Django backend
            const apiRes = await fetch(`${API_URL}/dj-rest-auth/github/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {
                // Set secure cookies for access and refresh tokens
                res.setHeader("Set-Cookie", [
                    cookie.serialize("access", data.access, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 15 * 60, // 15 minutes
                        sameSite: "strict",
                        path: "/api/",
                    }),
                    cookie.serialize("refresh", data.refresh, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 7 * 24 * 60 * 60, // 7 days
                        sameSite: "strict",
                        path: "/api/",
                    }),
                ]);

                return res.status(200).json({
                    success: "Logged in successfully",
                    user: data.user, // Optional: Include user details if needed
                });
            } else {
                return res.status(apiRes.status).json(data);
            }
        } catch (err) {
            return res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};
