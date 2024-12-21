import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const userId = req.headers.userid;
    if (access == false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const apiRes = await fetch(
        `${API_URL}/content_api/user-preferences/${userId}`,
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
        return res.status(200).json({ data });
      } else {
        return res.status(apiRes.status).json({ error: "unable to get bet" });
      }
    } catch (err) {
      return res.status(500).json({ error: "unable to get bet" });
    }
  }

  if (req.method === "PATCH") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    const body = JSON.stringify({
      bookies: req.body.bookies,
      initial_bankroll: req.body.initial_bankroll,
      kelly_fraction: req.body.kelly_fraction,
      arbitrage_default_bet: req.body.arbitrage_default_bet,
      bet_round_up: req.body.bet_round_up,
      use_dynamic_bankroll: req.body.use_dynamic_bankroll,
      language: req.body.language,
      odds_format: req.body.odds_format,
      min_ev_win_probability: req.body.min_ev_win_probability,
    });
    const userId = req.headers.userid;
    try {
      const apiRes = await fetch(
        `${API_URL}/content_api/user-preferences/${userId}/`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: body,
        }
      );
      const data = await apiRes.json();
      if (apiRes.status === 200) {
        return res.status(200).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "unable to update settings" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "unable to update settings",
      });
    }
  }
};
