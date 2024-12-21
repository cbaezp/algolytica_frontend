import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const fromDate = req.headers.from;
    const toDate = req.headers.to;

    if (access == false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const apiRes = await fetch(
        `${API_URL}/content_api/arbitrage-bets/?date_after=${fromDate}&date_before=${toDate}`,
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
        return res.status(200).json(data);
      } else {
        return res.status(apiRes.status).json({ error: "unable to get bet" });
      }
    } catch (err) {
      return res.status(500).json({ error: "unable to get bet" });
    }
  }

  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const body = JSON.stringify({
      title: req.body.title,
      sport_league: req.body.sport_league,
      game_date: req.body.game_date,
      game_id: req.body.game_id,
      bet_1: req.body.bet_1,
      price_1: req.body.price_1,
      bookie_1: req.body.bookie_1,
      amount_1: req.body.bet_amount_1,
      bet_2: req.body.bet_2,
      price_2: req.body.price_2,
      bookie_2: req.body.bookie_2,
      amount_2: req.body.bet_amount_2,
      bet_3: req.body.bet_3,
      price_3: req.body.price_3,
      bookie_3: req.body.bookie_3,
      amount_3: req.body.bet_amount_3,
      total_bet_stake: req.body.total_bet_stake,
      bet_profit: req.body.bet_profit,
      bet_status: req.body.bet_status,
      bet_saved_mode: req.body.bet_saved_mode,
    });
    try {
      const apiRes = await fetch(`${API_URL}/content_api/arbitrage-bets/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });
      const data = await apiRes.json();
      if (apiRes.status === 201) {
        return res.status(201).json(data);
      } else {
        return res
          .status(apiRes.status)
          .json({ error: "unable to create bet" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to create or create bet",
      });
    }
  }

  if (req.method === "PATCH") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const body = JSON.stringify({
      bet_status: req.body.outcome,
    });
    const betId = req.body.betId;
    try {
      const apiRes = await fetch(
        `${API_URL}/content_api/arbitrage-bets/${betId}/`,
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
      if (data === {}) {
        return res.status(200).json(data);
      } else {
        return res.status(apiRes.status).json({ error: "unable to patch bet" });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Unable to create or access bets",
      });
    }
  }

  if (req.method === "DELETE") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    const betID = req.headers.betid;

    if (access == false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    const apiRes = await fetch(
      `${API_URL}/content_api/arbitrage-bets/${betID}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );

    if (apiRes === {}) {
      return res.status(200).json({ deleted: true });
    } else {
      return res.json(apiRes.body);
    }
  }
};
